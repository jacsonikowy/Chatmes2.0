import React from "react";
import { Switch } from "@/components/ui/switch";

const page = () => {
  return (
    <div className="w-full">
      <div className="text-center py-[26px] border-b-2 border-slate-300">
        <h1 className="text-5xl text-[#00b086] font-semibold">Settings</h1>
      </div>
      <div className="pt-10 pl-8 flex flex-col gap-2">
        <p>todo VVV</p>
        <p className="text-3xl font-semibold">Dark Mode</p>
        <Switch className="bg-[#00b086]" />
      </div>
    </div>
  );
};

export default page;
