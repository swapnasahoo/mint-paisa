import { create } from "zustand";

type AvatarType = {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
};

export const useAvatar = create<AvatarType>((set) => ({
  avatarUrl: "",
  setAvatarUrl: (url: string) => set({ avatarUrl: url }),
}));
