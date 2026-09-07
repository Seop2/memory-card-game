"use client"
import styles from "./Game.module.css"
import Card from "./Card"
import { useEffect, useRef } from "react"
import GameOverModal from "./GameOverModal"
import { useGameStore } from "@/store/gameStore"
import Timer from "./Timer"
import Score from "./Score"
import { useRankStore } from "@/store/rankStore"
/**
 * Core game rules
 *  1. Only two cards can be flipped at a time
 *  2. Compare the values
 *  3. Mismatched cards flip back automatically
 *  4. Score is earned on a successful match
 *  5. Time limit
 * @returns
 */

export default function Game({ isStarted, onGameEnd, onRestart }) {
    const cards = useGameStore((state) => (state.cards))
    const isGameOver = useGameStore((state) => (state.isGameOver))
    const startGame = useGameStore((state) => (state.startGame))
    const stopGame = useGameStore((state) => (state.stopGame))
    const lockGame = useGameStore((state) => (state.lockGame))
    const tick = useGameStore((state) => (state.tick))
    const flippedCardIdx = useGameStore((state) => (state.flippedCardIdx))
    const matchedIdx = useGameStore((state) => (state.matchedIdx))
    const moves = useGameStore((state) => (state.moves));
    const addRecord = useRankStore((state) => (state.addRecord));

    const hasStartedRef = useRef(false);

    //Preview cards on initial load (locked, not a game-over state)
    useEffect(() => {
        startGame();
        lockGame();
    }, [])

    //Reset store when the game starts, end the game when a running game is stopped
    useEffect(() => {
        if (isStarted) {
            hasStartedRef.current = true;
            startGame();
        } else if (hasStartedRef.current) {
            stopGame();
        }
    }, [isStarted, startGame, stopGame])

    //Timer logic
    useEffect(() => {
        if (isGameOver || !isStarted) return;

        const timer = setInterval(() => tick(), 1000);

        return () => clearInterval(timer);

    }, [isGameOver, isStarted, tick])



    useEffect(() => {
        if (isGameOver) onGameEnd?.()
    }, [isGameOver, onGameEnd])


    const handleCloseModal = () => {
        useGameStore.setState({ isGameOver: false });
    }

    const handleRestart = () => {
        startGame();
        onRestart?.();
    }

    const isMatched = (index) => (matchedIdx.includes(index))
    const isFlipped = (index) => (flippedCardIdx.includes(index) || matchedIdx.includes(index));
    const finalScore = useGameStore((state) => (state.score));

    const handleSave = (name) => {
        addRecord({
            name,
            score: finalScore,
            moves: moves,
            date: new Date()
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.gameHeader}>
                <Timer />
                <Score />
            </div>
            <div className={styles.cards}>
                {cards.map((item, index) => (
                    <Card key={index} item={item} index={index} isFlipped={isFlipped(index)} isMatched={isMatched(index)} />
                ))}
            </div>
            {isGameOver && (<GameOverModal score={finalScore} onRestart={handleRestart} onClose={handleCloseModal} moves={moves} onSave={handleSave} />)}
        </div>
    )
}