"use client"
import styles from "./game.module.css"
import Card from "./card"
import { useEffect } from "react"
import GameOverModal from "./game-over-modal"
import { useGameStore } from "@/store/gameStore"
import Timer from "./Timer"
import Score from "./Score"
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
    const cards = useGameStore((state) => (state.cards))
    const isGameOver = useGameStore((state) => (state.isGameOver))
    const startGame = useGameStore((state) => (state.startGame))
    const tick = useGameStore((state) => (state.tick))
    const flippedCardIdx = useGameStore((state) => (state.flippedCardIdx))
    const matchedIdx = useGameStore((state) => (state.matchedIdx))
    const restartGame = useGameStore((state) => (state.restartGame))


    //Preview cards on initial load
    useEffect(() => {
        startGame();
        useGameStore.setState({ clickable: false })
    }, [])

    //Reset store when the game starts, lock cards when stopped
    useEffect(() => {
        if (isStarted) {
            startGame();
        } else {
            useGameStore.setState({ clickable: false });
        }
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
    const isFlipped = (index) => (flippedCardIdx.includes(index) || matchedIdx.includes(index));
    const finalScore = useGameStore((state) => (state.score));

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
            {isGameOver && (<GameOverModal score={finalScore} onRestart={restartGame} onClose={handleCloseModal} />)}
        </div>
    )
}