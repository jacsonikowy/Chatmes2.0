"use client";
import React, { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href: "/login";
}

const Button: React.FC<IButton> = ({ text, href, ...props }) => {
  const router = useRouter();

  return (
    <button
      className="bg-primary text-white p-5 rounded-md hover:bg-green-800 shadow-[rgba(72, 175, 151, 0.80)] shadow-md"
      onClick={() => {
        router.replace(href);
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
