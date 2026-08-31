import { useGameStore } from "@/store/gameStore";

export default function Score() {
    const score = useGameStore((state) => state.score);
    return <div>Score: {score}</div>
}