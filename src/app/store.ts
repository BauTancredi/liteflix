import { create } from "zustand";

interface DrawerState {
  open: boolean;
  toggle: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
