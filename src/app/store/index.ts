import { create } from "zustand";

interface DrawerState {
  open: boolean;
  toggle: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));

interface AddMovieDrawerState {
  open: boolean;
  toggle: () => void;
}

export const useAddMovieDrawerStore = create<AddMovieDrawerState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
