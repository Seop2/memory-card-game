import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CURRENT_VERSION = 1;

export const useRankStore = create(
    persist((set) => ({
        ranks: [],
        addRecord: (record) => {
            set((state) => ({
                ranks: [record, ...state.ranks].sort((a, b) => b.score - a.score).slice(0, 10)
            }))
        }
    }), {
        name: "memory-game-ranks",
        version: CURRENT_VERSION,
        storage: createJSONStorage(() => localStorage)
    })
);