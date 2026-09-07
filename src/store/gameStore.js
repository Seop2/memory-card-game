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
    clickable: false,
    isGameOver: false,
    moves: 0,
    mismatchTimeoutId: null,

    // ── actions ──
    startGame: () => {
        clearTimeout(get().mismatchTimeoutId);
        set(() => ({
            moves: 0,
            cards: generatePairedAnimalDeck(ANIMALS),
            flippedCardIdx: [],
            matchedIdx: [],
            score: 0,
            time: INITIAL_TIME,
            clickable: true,
            isGameOver: false,
            mismatchTimeoutId: null,
        }))
    },

    stopGame: () => {
        clearTimeout(get().mismatchTimeoutId);
        set({ clickable: false, mismatchTimeoutId: null });
        set({ flippedCardIdx: [], isGameOver: true })
    },

    flipCard: (index) => {
        const { cards, flippedCardIdx, matchedIdx, clickable, isGameOver } = get();
        const isAlreadyFlipped = flippedCardIdx.includes(index) || matchedIdx.includes(index);

        if (!clickable || isAlreadyFlipped || isGameOver) return;

        const newFlipped = [...flippedCardIdx, index];

        set({ flippedCardIdx: newFlipped });
        if (newFlipped.length !== 2) return;
        set({ clickable: false, moves: get().moves + 1 })
        const [firstIdx, secondIdx] = newFlipped;
        const isMatch = cards[firstIdx].id === cards[secondIdx].id;
        if (isMatch) {
            set((state) => {
                const matchedIdx = [...state.matchedIdx, firstIdx, secondIdx];
                return {
                    matchedIdx,
                    score: state.score + 10,
                    flippedCardIdx: [],
                    clickable: true,
                    isGameOver: matchedIdx.length === state.cards.length,
                };
            })
        } else {
            const timeoutId = setTimeout(() => {
                set({ flippedCardIdx: [], clickable: true, mismatchTimeoutId: null })
            }, MISMATCH_DELAY);
            set({ mismatchTimeoutId: timeoutId });
        }

    },

    tick: () => {
        const { time } = get();
        if (time <= 0) return;
        const nextTime = time - 1;
        set({ time: nextTime });
        if (nextTime <= 0) {
            clearTimeout(get().mismatchTimeoutId);
            set({ isGameOver: true, mismatchTimeoutId: null });
            set({ flippedCardIdx: [], clickable: false })
        }
    },
}))