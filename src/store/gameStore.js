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
    round: 0,

    // ── actions ──
    startGame: () => {
        set((state) => ({
            round: state.round + 1,
            cards: generatePairedAnimalDeck(ANIMALS),
            flippedCardIdx: [],
            matchedIdx: [],
            score: 0,
            time: INITIAL_TIME,
            clickable: true,
            isGameOver: false,
        }))
    },

    flipCard: (index) => {
        const { cards, flippedCardIdx, matchedIdx, clickable, isGameOver, round } = get();
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
            const currentRound = round;
            setTimeout(() => {
                const state = get();
                if (state.round !== currentRound || state.isGameOver) return;
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