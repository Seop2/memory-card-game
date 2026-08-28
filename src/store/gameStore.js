import { ANIMALS } from "@/data/animal";
import { create } from "zustand"
import { generatePairedAnimalDeck } from "@/lib/generatePariedValues";
const INITIAL_TIME = 60;
const MISMATCH_DELAY = 1000;



export const useGameStore = create((set, get) => ({

    // ── state ──
    cards: [],
    flippedCardIdx: [],
    matchedIdx: [],
    score: 0,
    time: INITIAL_TIME,
    clickable: true,
    isGameOver: false,

    // ── actions ──
    startGame: () => {
        set({
            cards: generatePairedAnimalDeck(ANIMALS),
            flippedCardIdx: [],
            matchedIdx: [],
            score: 0,
            time: INITIAL_TIME,
            clickable: true,
            isGameOver: false,
        })
    },

    flipCard: (index) => {
        const { cards, flippedCardIdx, matchedIdx, clickable, isGameOver } = get();
        const isAlreadyFlipped = flippedCardIdx.includes(index) || matchedIdx.includes(index);

        if (!clickable || isAlreadyFlipped || isGameOver) return;

        const newFlipped = [...flippedCardIdx, index];

        set({ flippedCardIdx: newFlipped });
        if (newFlipped.length !== 2) return;
        set({ clickable: false })
        const [firstIdx, secondIdx] = newFlipped;
        const isMatch = cards[firstIdx].id === cards[secondIdx].id;
        if (isMatch) {
            set((state) => ({
                matchedIdx: [...state.matchedIdx, firstIdx, secondIdx],
                score: state.score + 10,
                flippedCardIdx: [],
                clickable: true,
            }))
        } else {
            setTimeout(() => {
                set({ flippedCardIdx: [], clickable: true })
            }, MISMATCH_DELAY);
        }

    },

    tick: () => {
        const { time } = get();
        if (time <= 0) return;
        const nextTime = time - 1;
        set({ time: nextTime });
        if (nextTime <= 0) set({ isGameOver: true });
    },

    restartGame: () => {
        get().startGame();
    }
}))