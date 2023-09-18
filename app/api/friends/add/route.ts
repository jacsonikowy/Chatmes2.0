import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/utils/pusher";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email } = body;

    const user = await currentUser();

    const actualDbUser = await prisma.user.findFirst({
      where: {
        email: user?.emailAddresses[0].emailAddress,
      },
    });

    const DbUserByEmail = await prisma.user.findFirst({
      where: {
        email: email.email,
      },
    });

    if (!DbUserByEmail) {
      return new Response("User does not exist", { status: 400 });
    }

    // ALREADY SENT REQUEST

    const alreadySentFriendRequest = await prisma.friendRequests.findFirst({
      where: {
        senderId: { contains: user?.id },
      },
    });

    if (alreadySentFriendRequest) {
      return new Response("You already sent friend request", { status: 400 });
    }

    // Adding yourself
    if (user?.id === DbUserByEmail.id) {
      return new Response("You cannot add yourself as friend", { status: 400 });
    }

    // ALREADY FRIENDS
    const alreadyFriends = await prisma.user.findFirst({
      where: {
        friends: { some: { id: { contains: DbUserByEmail?.id } } },
      },
    });

    if (alreadyFriends) {
      return new Response("Already Friends", { status: 400 });
    }

    const friendRequests = await prisma.friendRequests.create({
      data: {
        sender: {
          connect: {
            id: actualDbUser?.id,
            email: actualDbUser!.email,
            username: actualDbUser!.username,
          },
        },
        receiver: {
          connect: {
            id: DbUserByEmail?.id,
            email: DbUserByEmail?.email,
            username: DbUserByEmail?.username,
          },
        },
      },
      select: {
        sender: true,
      },
    });

    pusherServer.trigger("friendRequest", "new-friend-request", friendRequests);

    return new Response(`Successfully added ${email} as user`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server error", { status: 500 });
  }
};
