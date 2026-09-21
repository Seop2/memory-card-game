import { useGameStore } from "@/store/gameStore";

export default function Timer() {
    const time = useGameStore((state) => state.time);
    return <div>Time Left: {time}s</div>
}