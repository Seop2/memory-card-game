"use client"
import { useState } from "react"
import styles from "./page.module.css"
import Game from "@/components/play/Game"
import { useGameStore } from "@/store/gameStore";

export default function PlayPage() {
    const [playing, setPlaying] = useState(false);
    const restartGame = useGameStore((state) => state.restartGame);

    const gameStart = () => {
        setPlaying(prev => !prev);
    }

    const handleRestart = () => {
        restartGame();
        setPlaying(true);
    }

    return <div className={styles.page}>
        <button className={styles.button} onClick={gameStart}>{playing ? "STOP" : "START"}</button>
        <Game isStarted={playing} onGameEnd={() => setPlaying(false)} onRestart={handleRestart} />
    </div>
}