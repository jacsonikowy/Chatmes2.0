"use client";
import React from "react";
import { UserPlus2 } from "lucide-react";
import { Icons } from "./Icons";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const FriendRequest = ({ email }: { email: string }) => {
  const user = useUser();

  return (
    <form>
      <div className="flex gap-5 items-center">
        <UserPlus2 />
        <span>{email}</span>
        <div className="flex gap-2">
          <div
            className="cursor-pointer"
            onClick={() => {
              axios.post("/api/friends/accept", { receiverId: user.user?.id });
            }}
          >
            <Icons.accept />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              axios.post("/api/friends/deny", {
                userIdToDelete: user.user?.id,
              });
            }}
          >
            <Icons.cancel />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FriendRequest;
