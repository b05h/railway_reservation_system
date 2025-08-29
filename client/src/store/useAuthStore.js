import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setAuth: (token) => {
        set({ token });
      },
      clearAuth: () => {
        set({ token: null });
      },
    }),
    {
      name: "auth-store",
      getStorage: () => localStorage,
    },
  ),
);
