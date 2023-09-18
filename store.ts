import { create } from "zustand";

interface IFriend {
  id: string;
  username: string;
  imageUrl: string;
  setFriend: (friend: {
    id: string;
    username: string;
    imageUrl: string;
  }) => void;
}

export const useFriendStore = create<IFriend>((set) => ({
  id: "",
  username: "",
  imageUrl: "",
  setFriend: (friend: { id: string; username: string; imageUrl: string }) =>
    set({
      id: friend.id,
      username: friend.username,
      imageUrl: friend.imageUrl,
    }),
}));
