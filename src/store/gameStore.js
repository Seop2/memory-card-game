import { ANIMALS } from "@/data/animal";
import { create } from "zustand"
import { generatePairedAnimalDeck } from "@/lib/generatePairedValues";
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

    // Lock the board without ending the game (used to freeze the preview deck)
    lockGame: () => {
        clearTimeout(get().mismatchTimeoutId);
        set({ clickable: false, flippedCardIdx: [], mismatchTimeoutId: null });
    },

    stopGame: () => {
        clearTimeout(get().mismatchTimeoutId);
        set({ clickable: false, flippedCardIdx: [], mismatchTimeoutId: null, isGameOver: true });
    },

    closeGame: () => {
        set({ isGameOver: false });
    },

    flipCard: (index) => {
        const { cards, flippedCardIdx, matchedIdx, clickable, isGameOver, moves, score } = get();
        const isAlreadyFlipped = flippedCardIdx.includes(index) || matchedIdx.includes(index);

        if (!clickable || isAlreadyFlipped || isGameOver) return;

        const newFlipped = [...flippedCardIdx, index];

        if (newFlipped.length !== 2) {
            set({ flippedCardIdx: newFlipped });
            return;
        }

        const [firstIdx, secondIdx] = newFlipped;
        const isMatch = cards[firstIdx].id === cards[secondIdx].id;

        if (isMatch) {
            const newMatchedIdx = [...matchedIdx, firstIdx, secondIdx];
            set({
                flippedCardIdx: [],
                matchedIdx: newMatchedIdx,
                score: score + 10,
                moves: moves + 1,
                clickable: true,
                isGameOver: newMatchedIdx.length === cards.length,
            });
        } else {
            const timeoutId = setTimeout(() => {
                set({ flippedCardIdx: [], clickable: true, mismatchTimeoutId: null })
            }, MISMATCH_DELAY);
            set({ flippedCardIdx: newFlipped, clickable: false, moves: moves + 1, mismatchTimeoutId: timeoutId });
        }
    },

    tick: () => {
        const { time } = get();
        if (time <= 0) return;
        const nextTime = time - 1;

        if (nextTime <= 0) {
            clearTimeout(get().mismatchTimeoutId);
            set({ time: nextTime, isGameOver: true, mismatchTimeoutId: null, flippedCardIdx: [], clickable: false });
        } else {
            set({ time: nextTime });
        }
    },
}))