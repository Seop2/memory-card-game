"use client"
import styles from "./game.module.css"
import Card from "./card"
import { generatePairedValues } from "@/lib/generatePariedValues"
import { useEffect, useState } from "react"
/**
 * 게임 핵심 규칙
 *  1. 두 장만 뒤집기 가능
 *  2. 값 비교하기 
 *  3. 불일치 자동으로 다시 덮기
 *  4. 매치 성공 시 점수 획득
 *  5. 시간 제한
 * @returns 
 */
export default function Game() {
    const [cards, setCards] = useState([])
    const [flippedCardIdx, setFlippedCardIdx] = useState([])
    const [matchedIdx, setMatchedIdx] = useState([])

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(60);
    const [clickable, setClickable] = useState(true)


    //마운트시 랜덤 카드 데이터 생성
    useEffect(() => {
        setCards(generatePairedValues(10))
    }, [])



    //카드 뒤집기 이벤트
    const handleCardClick = (index) => {
        if (!clickable || isFlipped(index) || matchedIdx.includes(index)) return;
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
        if (time <= 0) return;
        const timer = setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000);
        return () => clearInterval(timer);
    }, [time])


    const isFlipped = (index) => flippedCardIdx.includes(index) || matchedIdx.includes(index);

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
        </div>
    )
}