"use client";
import Button from "@/components/Button";
import { Rocket } from "lucide-react";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useAuth();
  const router = useRouter();

  if (userId) {
    router.replace("/dashboard/messages");
  }

  return (
    <main className="xl:px-44 md:px-24 px-6 py-[80px] md:py-[180px] flex justify-between">
      <div className="max-w-[195px] md:max-w-[584px]">
        <h1 className="text-5xl md:text-9xl text-[#00B086] font-semibold">
          Chatmes
        </h1>
        <p className="text-[#65B4A1] font-medium text-xl md:text-5xl mt-4 md:mt-14">
          Best messaging app on the World Wide Web
        </p>
        <div className="mt-32">
          <Button
            className="bg-[#00B086] hover:bg-green-800 transition ease-in text-white px-5 py-3 rounded-xl"
            text="Chat Now"
            href="/login"
          />
        </div>
      </div>
      <div className="text-9xl hidden md:block">
        <Rocket size={420} strokeWidth={8} absoluteStrokeWidth />
      </div>
    </main>
  );
}
