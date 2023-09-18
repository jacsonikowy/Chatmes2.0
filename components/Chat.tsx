"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { usePathname } from "next/navigation";
import ChatMessage from "./ChatMessage";
import { useUser } from "@clerk/nextjs";
import { useFriendStore } from "@/store";
import { useRouter } from "next/navigation";
import { pusher } from "@/utils/pusher";

const handleSendMessage = async (message: string, chatId: string) => {
  axios.post("/api/message/send", { message, chatId });
};

interface IData {
  sender: {
    id: string;
    username: string;
    email: string;
    imageUrl: string;
  };
  content: string;
  messageId: string;
  createdAt: Date;
}

// const Chat = ({ user }: { user: UserResource }) => {
const Chat = ({ data }: { data: IData[] }) => {
  const [message, setMessage] = useState("");
  const [messageData, setMessageData] = useState<IData[]>(data);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const friend = useFriendStore((state) => state);
  const user = useUser();
  const pathname = usePathname();
  const chatId = pathname.split("/").slice(3).toString();
  const router = useRouter();

  useEffect(() => {
    const channel = pusher.subscribe("message");

    channel.bind("new-message", (data: IData) => {
      setMessageData((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe("message");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageData]);

  if (friend.id === "") {
    router.replace("/dashboard/messages");
  }

  return (
    <div className="w-full h-screen md:h-[calc(100vh-100px)] pt-10 md:pt-0">
      <div className="flex py-[12.5px] pl-[25px] gap-6 items-center border-b-2 border-slate-300">
        <Image
          className="rounded-full"
          src={friend.imageUrl}
          width={75}
          height={75}
          alt={friend.username}
        />
        <p>{friend.username}</p>
      </div>
      <div className="flex flex-col h-[80vh] md:h-full w-full">
        <div className="h-full px-6 py-4 flex flex-col gap-4 overflow-y-scroll">
          {messageData.map((message) => {
            return (
              <ChatMessage
                message={message.content}
                variant={
                  message.sender.id === user.user?.id ? "secondary" : "primary"
                }
                user={message.sender}
                key={message.messageId}
              />
            );
          })}
          <div ref={bottomRef}></div>
        </div>
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage(message, chatId);
              textarea.current!.value = "";
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(message, chatId);

            textarea.current!.value = "";
          }}
          className="place-self-end flex items-center justify-center w-full px-6 pb-4 gap-4"
        >
          <textarea
            ref={textarea}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
            className="border-2 border-slate-300 rounded-lg w-full"
            name=""
            id=""
            rows={3}
          ></textarea>
          <button
            className="w-14 h-14 rounded-full text-white bg-[#00b086] cursor-pointer flex items-center px-[14px]"
            onClick={() => {}}
          >
            <Send className="cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
