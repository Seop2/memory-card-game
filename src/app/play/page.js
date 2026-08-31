"use client"
import { Suspense, useState } from "react"
import styles from "./page.module.css"
import Game from "@/components/play/game"

export default function PlayPage() {
    const [playing, setPlaying] = useState(false);

    const gameStart = () => {
        setPlaying(prev => !prev);
    }

    return <div className={styles.page}>
        <button className={styles.button} onClick={gameStart}>{playing ? "STOP" : "START"}</button>
        <Suspense fallback={<div>Loading.....</div>}>
            <Game isStarted={playing} onGameEnd={() => setPlaying(false)} />
        </Suspense>
    </div>
}