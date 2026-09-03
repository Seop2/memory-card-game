"use client"
import { useState } from "react"
import styles from "./page.module.css"
import Game from "@/components/play/Game"

export default function PlayPage() {
    const [playing, setPlaying] = useState(false);

    const gameStart = () => {
        setPlaying(prev => !prev);
    }

    const handleRestart = () => {
        setPlaying(true);
    }

    return <div className={styles.page}>
        <button className={styles.button} onClick={gameStart}>{playing ? "STOP" : "START"}</button>
        <Game isStarted={playing} onGameEnd={() => setPlaying(false)} onRestart={handleRestart} />
    </div>
}