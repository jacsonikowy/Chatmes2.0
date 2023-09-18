"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { Users2 } from "lucide-react";
import { Settings } from "lucide-react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <>
      <div
        className={`hidden sm:flex flex-col max-w-[220px] z-40 h-screen border-r-2 border-slate-300`}
      >
        <div className="sm:flex gap-3 px-7 py-8 items-center hidden">
          <MessageCircle size={36} strokeWidth={1.5} />
          <span className="font-semibold text-2xl text-[#00b086]">ChatMes</span>
        </div>
        <div className="h-0.5 w-full bg-slate-300"></div>
        <div className="flex flex-col justify-between h-full px-7 py-10">
          <div className="flex flex-col gap-6">
            <div
              className={`flex gap-3 items-center hover:text-[#00b086] ${
                pathname === "/dashboard/messages"
                  ? "text-[#00b086]"
                  : "text-black"
              }`}
            >
              <MessagesSquare />
              <Link href={"/dashboard/messages"}>Messages</Link>
            </div>
            <div
              className={`flex gap-3 items-center hover:text-[#00b086] ${
                pathname === "/dashboard/friends"
                  ? "text-[#00b086]"
                  : "text-black"
              }`}
            >
              <Users2 />
              <Link href={"/dashboard/friends"}>Friends</Link>
            </div>
            <div
              className={`flex gap-3 items-center hover:text-[#00b086] ${
                pathname === "/dashboard/settings"
                  ? "text-[#00b086]"
                  : "text-black"
              }`}
            >
              <Settings />
              <Link href={"/dashboard/settings"}>Settings</Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/" />
            <p>{user?.username}</p>
          </div>
        </div>
      </div>
      {/*mobile  */}
      <div className="absolute block h-screen sm:hidden z-10">
        <div
          className={`block sm:hidden absolute p-4 z-20 cursor-pointer ${
            activeSidebar ? "hidden" : "block"
          }`}
          onClick={() => {
            setActiveSidebar(!activeSidebar);
          }}
        >
          <Menu />
        </div>

        <div
          className={`relative ${
            activeSidebar ? "flex" : "hidden"
          } flex flex-col justify-between h-full z-10 px-7 py-10 border-r-2 border-slate-300 bg-white`}
        >
          <div
            className="absolute top-3 right-3"
            onClick={() => {
              setActiveSidebar(!activeSidebar);
            }}
          >
            <X />
          </div>
          <div className={`flex flex-col gap-6 `}>
            <div className="flex gap-3 items-center hover:text-[#00b086]">
              <MessagesSquare />
              <Link href={"/dashboard/messages"}>Messages</Link>
            </div>
            <div className="flex gap-3 items-center hover:text-[#00b086]">
              <Users2 />
              <Link href={"/dashboard/friends"}>Friends</Link>
            </div>
            <div className="flex gap-3 items-center hover:text-[#00b086]">
              <Settings />
              <Link href={"/dashboard/settings"}>Settings</Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <UserButton afterSignOutUrl="/" />
            <p>{user?.username}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
