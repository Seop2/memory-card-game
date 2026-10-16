import { ANIMALS } from "@/data/animal";
import { create } from "zustand";
import { generatePairedAnimalDeck } from "@/lib/generatePairedValues";

export interface CardItem {
  id: string | number;
  name: string;
  image: string;
}

/**
 * 게임의 생명주기 단계를 명확히 구분하는 열거형
 *  - idle     : 게임 시작 전 (프리뷰 / 대기)
 *  - playing  : 진행 중
 *  - ended    : 종료됨 (모달 표시)
 */
export type GamePhase = "idle" | "playing" | "ended";

// ── 핵심 상태: 직접 저장해야 하는 값만 남김 ──
interface GameState {
  cards: CardItem[];
  flippedCardIdx: number[];
  matchedIdx: number[];
  score: number;
  time: number;
  phase: GamePhase; // ← isGameOver + clickable을 하나로 통합
  moves: number;
  waiting: boolean; // 불일치 딜레이 대기 중 (클릭 잠금)
}

interface GameActions {
  startGame: () => void;
  lockGame: () => void;
  stopGame: () => void;
  closeGame: () => void;
  flipCard: (index: number) => void;
  tick: () => void;
}

// ── 파생 헬퍼 (컴포넌트에서 사용) ──
export function isClickable(state: GameState): boolean {
  return state.phase === "playing" && !state.waiting;
}

export function isFlipped(state: GameState, index: number): boolean {
  return state.flippedCardIdx.includes(index) || state.matchedIdx.includes(index);
}

export function isMatched(state: GameState, index: number): boolean {
  return state.matchedIdx.includes(index);
}

export function isGameOver(state: GameState): boolean {
  return state.phase === "ended";
}

type GameStore = GameState & GameActions;
const INITIAL_TIME = 60;
const MISMATCH_DELAY = 1000;

// 타이머 ID를 스토어 바깥 모듈 스코프에 관리 (렌더링과 무관한 부수효과)
let mismatchTimeoutId: ReturnType<typeof setTimeout> | null = null;

function clearMismatchTimeout() {
  if (mismatchTimeoutId !== null) {
    clearTimeout(mismatchTimeoutId);
    mismatchTimeoutId = null;
  }
}

const initialState = (): GameState => ({
  cards: [],
  flippedCardIdx: [],
  matchedIdx: [],
  score: 0,
  time: INITIAL_TIME,
  phase: "idle",
  moves: 0,
  waiting: false,
});

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState(),

  // ── actions ──
  startGame: () => {
    clearMismatchTimeout();
    set(() => ({
      ...initialState(),
      phase: "playing",
      cards: generatePairedAnimalDeck(ANIMALS),
    }));
  },

  // Lock the board without ending the game (used to freeze the preview deck)
  lockGame: () => {
    clearMismatchTimeout();
    set({ phase: "idle", flippedCardIdx: [], waiting: false });
  },

  stopGame: () => {
    clearMismatchTimeout();
    set({
      phase: "ended",
      flippedCardIdx: [],
      waiting: false,
    });
  },

  closeGame: () => {
    set({ phase: "idle" });
  },

  flipCard: (index: number) => {
    const state = get();
    if (!isClickable(state)) return;
    if (isFlipped(state, index)) return;

    const newFlipped = [...state.flippedCardIdx, index];

    if (newFlipped.length !== 2) {
      set({ flippedCardIdx: newFlipped });
      return;
    }

    const [firstIdx, secondIdx] = newFlipped;
    const isMatch = state.cards[firstIdx].id === state.cards[secondIdx].id;

    if (isMatch) {
      const newMatchedIdx = [...state.matchedIdx, firstIdx, secondIdx];
      const allMatched = newMatchedIdx.length === state.cards.length;
      set({
        flippedCardIdx: [],
        matchedIdx: newMatchedIdx,
        score: state.score + 10,
        moves: state.moves + 1,
        phase: allMatched ? "ended" : "playing",
      });
    } else {
      set({
        flippedCardIdx: newFlipped,
        waiting: true,
        moves: state.moves + 1,
      });
      mismatchTimeoutId = setTimeout(() => {
        set({ flippedCardIdx: [], waiting: false });
        mismatchTimeoutId = null;
      }, MISMATCH_DELAY);
    }
  },

  tick: () => {
    const { time } = get();
    if (time <= 0) return;
    const nextTime = time - 1;

    if (nextTime <= 0) {
      clearMismatchTimeout();
      set({
        time: nextTime,
        phase: "ended",
        flippedCardIdx: [],
        waiting: false,
      });
    } else {
      set({ time: nextTime });
    }
  },
}));
