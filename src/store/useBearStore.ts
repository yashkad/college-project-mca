import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create<State, [["zustand/immer", never]]>(
  immer((set, get) => ({
    data: {
      selectedTheme: null,
      modalContent: null,
      modalShown: false,
    },
    actions: {
      setSelectedTheme: (theme: any) => {
        set((state) => {
          state.data.selectedTheme = theme;
        });
      },
      setModal: ({ content }: any) => {
        set((state) => {
          state.data.modalContent = content;
          state.data.modalShown = true;
        });
      },
      setCloseModal: () => {
        set((state) => {
          state.data.modalShown = false;
        });
      },
    },
  }))
);
