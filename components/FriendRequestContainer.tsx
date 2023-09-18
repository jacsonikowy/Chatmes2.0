"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendRequest from "./FriendRequest";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { pusher } from "@/utils/pusher";
import { useUser } from "@clerk/nextjs";

type FormData = z.infer<typeof addFriendValidator>;

interface IFriendRequest {
  sender: {
    id: string;
    username: string;
    email: string;
    imageUrl?: string;
  };
}

const FriendRequestContainer = ({ data }: { data: IFriendRequest[] }) => {
  const [email, setEmail] = useState("");
  const [friendRequestsData, setFriendRequestsData] =
    useState<IFriendRequest[]>(data);
  const user = useUser();

  useEffect(() => {
    const channel = pusher.subscribe("friendRequest");

    channel.bind("new-friend-request", (data: IFriendRequest) => {
      if (data.sender.id === user.user?.id) {
        return;
      }
      setFriendRequestsData((prev) => [...prev, data]);
    });

    channel.bind("deny-friend-request", (data: IFriendRequest) => {
      const newFriendRequestData = friendRequestsData.filter(
        (element) => element.sender.id !== data.sender.id
      );
      setFriendRequestsData(newFriendRequestData);
    });

    return () => {
      pusher.unsubscribe("friendRequest");
    };
  }, [user, friendRequestsData]);

  const handleAction = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });
      console.log(validatedEmail);

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
      }
      if (error instanceof AxiosError) {
        console.log(error);
        setError("email", { message: error.response?.data });
      }
    }
  };

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const onSubmit = (formData: FormData) => {
    handleAction(formData.email);
  };

  return (
    <div className="w-full">
      <div className="text-center py-[26px] border-b-2 border-slate-300">
        <h1 className="text-5xl text-[#00b086] font-semibold">Friends</h1>
      </div>
      <div className="pl-4 md:pl-16 pt-20">
        <h2 className="text-2xl md:text-[32px] mb-3 font-medium">
          Search by email:
        </h2>
        <form
          // action={(formData) => handleAction(formData)}
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-4"
        >
          <input
            className="pl-[14px] md:pl-[22px] py-3 md:py-4 shadow-lg border-2 rounded-lg text-slate-500"
            type="text"
            {...register("email")}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setEmail(e.currentTarget.value);
            }}
            placeholder="you@example.com"
          />
          <button className="text-white hover:bg-green-600 bg-[#00b086] shadow-md rounded-lg text-center px-4 md:px-8 py-3 md:py-4">
            Add
          </button>
        </form>
        <p className="text-red-600 mt-4">{errors.email?.message}</p>
        <h2 className="font-medium text-2xl md:text-[32px] mt-20">
          Friend Requests
        </h2>

        {friendRequestsData &&
          friendRequestsData.map((user) => {
            return (
              <FriendRequest
                email={user?.sender!.email}
                key={user.sender?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FriendRequestContainer;
