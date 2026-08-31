"use client"
import styles from "./game.module.css"
import Card from "./card"
import { useEffect } from "react"
import GameOverModal from "./game-over-modal"
import { useGameStore } from "@/store/gameStore"
/**
 * 게임 핵심 규칙
 *  1. 두 장만 뒤집기 가능
 *  2. 값 비교하기 
 *  3. 불일치 자동으로 다시 덮기
 *  4. 매치 성공 시 점수 획득
 *  5. 시간 제한
 * @returns 
 */

export default function Game({ isStarted, onGameEnd }) {
    const { cards, score, time, isGameOver, startGame, flipCard, tick, flippedCardIdx, matchedIdx, restartGame } = useGameStore()

    //최초 로딩시 카드 미리 보여주기
    useEffect(() => {
        startGame();
        useGameStore.setState({ clickable: false })
    }, [])

    //게임 시작시 스토어 초기화
    useEffect(() => {
        if (isStarted) startGame();
    }, [isStarted, startGame])

    //타이머 로직
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
                <div>남은 시간 : {time} 초</div>
                <div>점수 : {score} 점</div>
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