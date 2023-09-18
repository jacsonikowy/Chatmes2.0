import { NextRequest, userAgent } from "next/server";
import { prisma } from "@/lib/prisma";
import { pusher, pusherServer } from "@/utils/pusher";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { userIdToDelete } = body;

    const idOfFriendRequest = await prisma.friendRequests.findFirst({
      where: {
        receiver: { id: userIdToDelete },
      },
    });

    const deleteUsers = await prisma.friendRequests.delete({
      where: {
        id: idOfFriendRequest?.id,
        receiverId: { equals: userIdToDelete },
      },
      select: {
        sender: true,
      },
    });

    pusherServer.trigger("friendRequest", "deny-friend-request", deleteUsers);

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
