import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/utils/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { message, chatId } = body;

    const user = await currentUser();

    const messageDb = await prisma.message.create({
      data: {
        content: message,
        sender: { connect: { id: user?.id } },
        chat: {
          connectOrCreate: {
            create: { chatId: chatId },
            where: { chatId: chatId },
          },
        },
      },
      select: {
        messageId: true,
        content: true,
        sender: true,
        createdAt: true,
      },
    });

    await pusherServer.trigger("message", "new-message", messageDb);

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
