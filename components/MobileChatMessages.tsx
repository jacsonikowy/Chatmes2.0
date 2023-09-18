"use client";
import { useUser } from "@clerk/nextjs";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import MessagesUser from "./MessagesUser";

interface IFriends {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
}

const MobileChatMessages = ({ friends }: { friends: IFriends[] }) => {
  const [active, setActive] = useState(false);
  const { user } = useUser();
  return (
    <div className="block md:hidden ">
      <div
        className="absolute z-20 right-4 top-4 cursor-pointer "
        onClick={() => {
          setActive(!active);
          console.log(active);
        }}
      >
        <MessageSquare />
      </div>
      <div
        className={`absolute w-40 pt-10 right-0 ${
          active ? "block" : "hidden"
        } bg-white h-full shadow-2xl`}
      >
        {friends.map((friend) => {
          if (friend.id === user?.id) {
            return;
          }
          return (
            <div
              onClick={() => {
                setActive(!active);
              }}
              key={friend.id}
            >
              <MessagesUser
                id={friend.id}
                username={friend.username}
                latestMessage="latest"
                image={friend.imageUrl}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileChatMessages;
