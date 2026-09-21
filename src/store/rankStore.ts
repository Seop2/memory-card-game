import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CURRENT_VERSION = 1;

export interface RankRecord {
  id?: string | number;
  score: number;
  moves: number;
  createdAt?: string;
  userName?: string;
}

interface RankState {
  ranks: RankRecord[];
}
interface RankActions {
  addRecord: (record: RankRecord) => void;
}

type RankStore = RankState & RankActions;

export const useRankStore = create<RankStore>()(
  persist(
    (set) => ({
      ranks: [],
      addRecord: (record) => {
        set((state) => ({
          ranks: [record, ...state.ranks]
            .sort((a, b) => b.score - a.score || a.moves - b.moves)
            .slice(0, 10),
        }));
      },
    }),
    {
      name: "memory-game-ranks",
      version: CURRENT_VERSION,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
