import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { receiverId } = body;

    const friendRequestId = await prisma.friendRequests.findFirst({
      select: {
        id: true,
        senderId: true,
      },
      where: {
        receiverId: receiverId,
      },
    });

    await prisma.friendRequests.delete({
      where: {
        id: friendRequestId?.id,
        senderId: friendRequestId?.senderId,
      },
    });

    await prisma.user.update({
      where: {
        id: friendRequestId?.senderId,
      },
      data: {
        friends: {
          connect: {
            id: receiverId,
          },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: receiverId,
      },
      data: {
        friends: {
          connect: {
            id: friendRequestId?.senderId,
          },
        },
      },
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
