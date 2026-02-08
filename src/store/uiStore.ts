import { create } from "zustand";

type UIState = {
  selectedNavbarIndex: number;
  setSelectedNavbarIndex: (i: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedNavbarIndex: 0,
  setSelectedNavbarIndex: (i: number) => set({ selectedNavbarIndex: i }),
}));
