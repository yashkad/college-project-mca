import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBearStore = create<State, [["zustand/immer", never]]>(
  immer((set, get) => ({
    data: {
      selectedTheme: null,
    },
    actions: {
      setSelectedTheme: (theme: any) => {
        set((state) => {
          state.data.selectedTheme = theme;
        });
      },
    },
  }))
);

// in case to persist data : I am not able to use (persist and immer) at same time
// so I decided to create a separate store for that purpose.
// not sure how will this work
// export const usePersistStore = create(
//   persist(
//     (set, get) => ({
//       data: {
//         count: 0,
//       },
//     }),
//     {
//       name: "food-storage", // name of the item in the storage (must be unique)
//       storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
//     }
//   )
// );
