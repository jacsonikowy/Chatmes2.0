import React from "react";
import Chat from "@/components/Chat";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const page = async () => {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const chatId = pathname.split("/").slice(3).toString();

  const messages = await prisma.message.findMany({
    where: {
      chat: { chatId: chatId },
    },
    select: {
      content: true,
      sender: true,
      messageId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return <Chat data={messages} />;
};

export default page;
