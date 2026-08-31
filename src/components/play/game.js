"use client"
import styles from "./game.module.css"
import Card from "./card"
import { useEffect } from "react"
import GameOverModal from "./game-over-modal"
import { useGameStore } from "@/store/gameStore"
/**
 * Core game rules
 *  1. Only two cards can be flipped at a time
 *  2. Compare the values
 *  3. Mismatched cards flip back automatically
 *  4. Score is earned on a successful match
 *  5. Time limit
 * @returns
 */

export default function Game({ isStarted, onGameEnd }) {
    const { cards, score, time, isGameOver, startGame, flipCard, tick, flippedCardIdx, matchedIdx, restartGame } = useGameStore()

    //Preview cards on initial load
    useEffect(() => {
        startGame();
        useGameStore.setState({ clickable: false })
    }, [])

    //Reset store when the game starts
    useEffect(() => {
        if (isStarted) startGame();
    }, [isStarted, startGame])

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

    const isMatched = (index) => (matchedIdx.includes(index))
    return (
        <div className={styles.container}>
            <div className={styles.gameHeader}>
                <div>Time Left: {time}s</div>
                <div>Score: {score}</div>
            </div>
            <div className={styles.cards}>
                {cards.map((item, index) => (
                    <Card key={index} item={item} onClick={() => flipCard(index)} isFlipped={flippedCardIdx.includes(index) || matchedIdx.includes(index)} isMatched={isMatched(index)} />
                ))}
            </div>
            {isGameOver && (<GameOverModal score={score} onRestart={restartGame} onClose={handleCloseModal} />)}
        </div>
    )
}