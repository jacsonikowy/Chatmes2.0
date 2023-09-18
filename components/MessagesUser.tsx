"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { chatHref } from "@/helpers/functions";
import { useFriendStore } from "@/store";

const MessagesUser = ({
  id,
  image,
  username,
  latestMessage,
}: {
  id: string;
  image: string;
  username: string;
  latestMessage: string;
}) => {
  const router = useRouter();
  const user = useUser();

  if (!user.user) {
    <div>Loading...</div>;
  }

  const friend = useFriendStore((state) => state);

  return (
    <div
      className="flex items-center px-5 py-6 gap-2 hover:bg-slate-100 cursor-pointer"
      onClick={() => {
        router.replace(`/dashboard/messages/${chatHref(id, user.user!.id)}`);
        friend.setFriend({ id, imageUrl: image, username: username });
      }}
    >
      <Image
        className="shadow-md rounded-full"
        alt="someguy"
        src={image}
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <span className="font-semibold">{username}</span>
        <p className="text-xs font-semibold text-slate-500">{latestMessage}</p>
      </div>
    </div>
  );
};

export default MessagesUser;
