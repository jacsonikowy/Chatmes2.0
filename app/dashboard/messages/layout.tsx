import MessagesUser from "@/components/MessagesUser";
import React from "react";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import axios from "axios";
import { headers } from "next/headers";
import { MessageSquare } from "lucide-react";
import MobileChatMessages from "@/components/MobileChatMessages";

const page = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const chatId = pathname.split("/").slice(3).toString();

  const friends = await prisma.user.findMany({
    where: {
      friends: {
        some: { id: { equals: user?.id } },
      },
    },
  });

  console.log("firends");
  console.log(friends);

  return (
    <div className="w-full h-full flex">
      {/* DESKTOP */}
      <div className="hidden sm:block border-r-2 border-slate-300 h-screen max-w-[341px]">
        <div className="flex px-7 py-8 border-b-2 border-slate-300">
          <span className="text-3xl font-semibold text-[#00b086]">
            Messages
          </span>
        </div>
        <div className="">
          {friends.map((friend) => {
            if (friend.id === user?.id) {
              return;
            }
            return (
              <MessagesUser
                id={friend.id}
                username={friend.username}
                latestMessage="latest"
                image={friend.imageUrl}
                key={friend.id}
              />
            );
          })}
        </div>
      </div>
      {/* mobile */}
      <MobileChatMessages friends={friends} />

      {children}
    </div>
  );
};

export default page;
