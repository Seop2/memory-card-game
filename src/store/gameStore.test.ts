import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGameStore } from "./gameStore";

const initialState = useGameStore.getState();

beforeEach(() => {
    vi.useRealTimers();
    useGameStore.setState(initialState, true);
});

function findMatchPair(cards) {
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            if (cards[i].id === cards[j].id) return [i, j];
        }
    }
    throw new Error("no matching pair found in deck");
}

function findMismatchPair(cards) {
    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
            if (cards[i].id !== cards[j].id) return [i, j];
        }
    }
    throw new Error("no mismatching pair found in deck");
}

describe("useGameStore", () => {
    it("startGame은 20장의 카드를 만들고 상태를 초기화한다", () => {
        useGameStore.getState().startGame();
        const state = useGameStore.getState();

        expect(state.cards).toHaveLength(20);
        expect(state.flippedCardIdx).toEqual([]);
        expect(state.matchedIdx).toEqual([]);
        expect(state.score).toBe(0);
        expect(state.moves).toBe(0);
        expect(state.clickable).toBe(true);
        expect(state.isGameOver).toBe(false);
    });

    it("첫 번째 카드만 뒤집으면 flippedCardIdx에만 추가되고 moves는 그대로다", () => {
        useGameStore.getState().startGame();
        useGameStore.getState().flipCard(0);

        const state = useGameStore.getState();
        expect(state.flippedCardIdx).toEqual([0]);
        expect(state.moves).toBe(0);
    });

    it("두 카드가 일치하면 matchedIdx에 추가되고 score가 오르며 다시 클릭 가능해진다", () => {
        useGameStore.getState().startGame();
        const [firstIdx, secondIdx] = findMatchPair(useGameStore.getState().cards);

        useGameStore.getState().flipCard(firstIdx);
        useGameStore.getState().flipCard(secondIdx);

        const state = useGameStore.getState();
        expect(state.matchedIdx).toEqual(expect.arrayContaining([firstIdx, secondIdx]));
        expect(state.score).toBe(10);
        expect(state.flippedCardIdx).toEqual([]);
        expect(state.clickable).toBe(true);
        expect(state.moves).toBe(1);
    });

    it("모든 카드를 다 맞추면 isGameOver가 true가 된다", () => {
        useGameStore.getState().startGame();
        const { cards } = useGameStore.getState();

        const seen = new Map();
        cards.forEach((card, idx) => {
            if (seen.has(card.id)) {
                useGameStore.getState().flipCard(seen.get(card.id));
                useGameStore.getState().flipCard(idx);
            } else {
                seen.set(card.id, idx);
            }
        });

        expect(useGameStore.getState().isGameOver).toBe(true);
        expect(useGameStore.getState().matchedIdx).toHaveLength(cards.length);
    });

    it("두 카드가 불일치하면 즉시 클릭이 막히고, 1초 뒤 다시 뒤집히며 클릭 가능해진다", () => {
        vi.useFakeTimers();
        useGameStore.getState().startGame();
        const [firstIdx, secondIdx] = findMismatchPair(useGameStore.getState().cards);

        useGameStore.getState().flipCard(firstIdx);
        useGameStore.getState().flipCard(secondIdx);

        expect(useGameStore.getState().clickable).toBe(false);
        expect(useGameStore.getState().flippedCardIdx).toEqual([firstIdx, secondIdx]);

        vi.advanceTimersByTime(1000);

        const state = useGameStore.getState();
        expect(state.flippedCardIdx).toEqual([]);
        expect(state.clickable).toBe(true);
        expect(state.matchedIdx).toEqual([]);
    });

    it("clickable이 false면 flipCard를 호출해도 상태가 바뀌지 않는다", () => {
        useGameStore.getState().startGame();
        useGameStore.setState({ clickable: false });

        useGameStore.getState().flipCard(0);

        expect(useGameStore.getState().flippedCardIdx).toEqual([]);
    });

    it("isGameOver가 true면 flipCard를 호출해도 상태가 바뀌지 않는다", () => {
        useGameStore.getState().startGame();
        useGameStore.setState({ isGameOver: true });

        useGameStore.getState().flipCard(0);

        expect(useGameStore.getState().flippedCardIdx).toEqual([]);
    });

    it("lockGame은 clickable을 false로, flippedCardIdx를 비우지만 isGameOver는 건드리지 않는다", () => {
        useGameStore.getState().startGame();
        useGameStore.setState({ flippedCardIdx: [0, 1] });

        useGameStore.getState().lockGame();

        const state = useGameStore.getState();
        expect(state.clickable).toBe(false);
        expect(state.flippedCardIdx).toEqual([]);
        expect(state.isGameOver).toBe(false);
    });

    it("stopGame은 보드를 잠그고 isGameOver를 true로 만든다", () => {
        useGameStore.getState().startGame();

        useGameStore.getState().stopGame();

        const state = useGameStore.getState();
        expect(state.clickable).toBe(false);
        expect(state.isGameOver).toBe(true);
    });

    it("closeGame은 isGameOver만 false로 되돌린다", () => {
        useGameStore.setState({ isGameOver: true, clickable: false });

        useGameStore.getState().closeGame();

        expect(useGameStore.getState().isGameOver).toBe(false);
        expect(useGameStore.getState().clickable).toBe(false);
    });

    it("tick은 time을 1씩 줄인다", () => {
        useGameStore.setState({ time: 10 });

        useGameStore.getState().tick();

        expect(useGameStore.getState().time).toBe(9);
    });

    it("time이 0이 되면 게임이 종료되고 클릭이 막힌다", () => {
        useGameStore.setState({ time: 1 });

        useGameStore.getState().tick();

        const state = useGameStore.getState();
        expect(state.time).toBe(0);
        expect(state.isGameOver).toBe(true);
        expect(state.clickable).toBe(false);
        expect(state.flippedCardIdx).toEqual([]);
    });

    it("time이 이미 0이면 tick을 호출해도 변화가 없다", () => {
        useGameStore.setState({ time: 0, isGameOver: false });

        useGameStore.getState().tick();

        expect(useGameStore.getState().time).toBe(0);
        expect(useGameStore.getState().isGameOver).toBe(false);
    });
});
