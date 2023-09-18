import Image from "next/image";
import React from "react";

const ChatMessage = ({
  user,
  variant,
  message,
}: {
  user: { id: string; email: string; username: string; imageUrl: string };
  variant: "primary" | "secondary";
  message: string;
}) => {
  if (variant === "primary") {
    return (
      <div className="flex gap-4 items-center">
        <Image
          className="rounded-full"
          width={56}
          height={56}
          src={user.imageUrl}
          alt={user.username || "image"}
        />
        <div className="rounded-lg px-3 py-3 shadow-md border border-slate-300">
          <span className="text-black">{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row-reverse items-center gap-4">
      <div className="rounded-lg px-3 py-3 shadow-md border-white bg-[#00b086]">
        <span className="text-white">{message}</span>
      </div>
      <Image
        className="rounded-full"
        width={56}
        height={56}
        src={user.imageUrl}
        alt={user.username || "image"}
      />
    </div>
  );
};

export default ChatMessage;
