import { create } from "zustand";

type UserType = {
  name: string | null;
  email: string;
  avatarUrl: string;
  cityName: string | null;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAvatarUrl: (url: string) => void;
  setCityName: (cityName: string) => void;
};

export const useUser = create<UserType>((set) => ({
  name: null,
  email: "",
  avatarUrl: "",
  cityName: null,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
  setCityName: (cityName) => set({ cityName }),
}));
