import { beforeEach, describe, expect, it } from "vitest";
import { useRankStore } from "./rankStore";

beforeEach(() => {
    localStorage.clear();
    useRankStore.setState({ ranks: [] });
});

describe("useRankStore", () => {
    it("addRecord는 새 기록을 목록 맨 앞에 추가한다", () => {
        useRankStore.getState().addRecord({ name: "a", score: 10, moves: 5 });

        expect(useRankStore.getState().ranks).toEqual([
            { name: "a", score: 10, moves: 5 },
        ]);
    });

    it("점수가 높은 순으로 정렬한다", () => {
        useRankStore.getState().addRecord({ name: "low", score: 10, moves: 5 });
        useRankStore.getState().addRecord({ name: "high", score: 30, moves: 5 });
        useRankStore.getState().addRecord({ name: "mid", score: 20, moves: 5 });

        const names = useRankStore.getState().ranks.map((r) => r.name);
        expect(names).toEqual(["high", "mid", "low"]);
    });

    it("점수가 같으면 moves(적은 순)로 정렬한다", () => {
        useRankStore.getState().addRecord({ name: "moreMoves", score: 20, moves: 10 });
        useRankStore.getState().addRecord({ name: "fewerMoves", score: 20, moves: 3 });

        const names = useRankStore.getState().ranks.map((r) => r.name);
        expect(names).toEqual(["fewerMoves", "moreMoves"]);
    });

    it("상위 10개까지만 유지한다", () => {
        for (let i = 0; i < 12; i++) {
            useRankStore.getState().addRecord({ name: `p${i}`, score: i, moves: 1 });
        }

        expect(useRankStore.getState().ranks).toHaveLength(10);
        // score가 가장 높은 11(p11)~2(p2)까지 남고, p0/p1은 밀려난다
        expect(useRankStore.getState().ranks[0].name).toBe("p11");
        expect(useRankStore.getState().ranks.map((r) => r.name)).not.toContain("p0");
    });

    it("localStorage에 memory-game-ranks 키로 저장된다", () => {
        useRankStore.getState().addRecord({ name: "a", score: 10, moves: 5 });

        const saved = JSON.parse(localStorage.getItem("memory-game-ranks"));
        expect(saved.state.ranks).toEqual([{ name: "a", score: 10, moves: 5 }]);
    });
});
