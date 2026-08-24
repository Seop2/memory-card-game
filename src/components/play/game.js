"use client"
import styles from "./game.module.css"
import Card from "./card"
import { generatePairedValues } from "@/lib/generatePariedValues"
import { useEffect, useState } from "react"
import GameOverModal from "./game-over-modal"
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
    const [cards, setCards] = useState([])
    const [flippedCardIdx, setFlippedCardIdx] = useState([])
    const [matchedIdx, setMatchedIdx] = useState([])

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [clickable, setClickable] = useState(true)


    const [isGameOver, setGameOver] = useState(false);

    //마운트시 랜덤 카드 데이터 생성
    useEffect(() => {
        setCards(generatePairedValues(10))
    }, [])



    //카드 뒤집기 이벤트
    const handleCardClick = (index) => {
        if (!isStarted || !clickable || isFlipped(index) || matchedIdx.includes(index) || isGameOver) return;
        const newFlipped = [...flippedCardIdx, index];
        setFlippedCardIdx(newFlipped);

        //두번째 카드까지 뒤집었을 때 값 비교 및 로직 처리
        if (newFlipped.length === 2) {
            setClickable(false);
            const [firstIdx, secondIdx] = newFlipped;
            const isMatch = cards[firstIdx] === cards[secondIdx];

            if (isMatch) {
                setMatchedIdx((prev) => [...prev, firstIdx, secondIdx]);
                setScore((prev) => prev + 10);
                setFlippedCardIdx([]);
                setClickable(true);
            } else {
                setTimeout(() => {
                    setFlippedCardIdx([]);
                    setClickable(true);
                }, 1000)
            }
        }
    }


    //타이머 로직
    useEffect(() => {
        if (time <= 0 || !isStarted) return;

        const timer = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000);
        return () => clearInterval(timer);
    }, [time, isStarted])


    useEffect(() => {
        if (isStarted) {
            setTime(60);
            setScore(0);
            setCards(generatePairedValues(10));
            setMatchedIdx([]);
            setFlippedCardIdx([]);
            setClickable(true);
        }
    }, [isStarted])

    useEffect(() => {
        if (isStarted && time <= 0) {
            setGameOver(true);
            onGameEnd?.();
        }
    }, [time, isStarted, onGameEnd])

    const isFlipped = (index) => flippedCardIdx.includes(index) || matchedIdx.includes(index);

    const handleRestart = () => { resetGame(); setGameOver(false) }
    const handleCloseModal = () => { setGameOver(false) }

    return (
        <div className={styles.container}>
            <div className={styles.gameHeader}>
                <div>남은 시간 : {time} 초</div>
                <div>점수 : {score} 점</div>
            </div>
            <div className={styles.cards}>
                {cards.map((value, index) => (
                    <Card key={index} value={value} onClick={() => handleCardClick(index)} isFlipped={isFlipped(index)} />
                ))}
            </div>
            {isGameOver && (<GameOverModal score={score} onRestart={handleRestart} onClose={handleCloseModal} />)}
        </div>
    )
}