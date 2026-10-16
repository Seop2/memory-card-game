import Image from "next/image"
import style from "./Card.module.css"
import { CardItem, useGameStore } from "@/store/gameStore"
import { memo } from "react";

interface CardProps {
    item: CardItem;
    isFlipped: boolean;
    isMatched: boolean;
    index: number;
}

function Card({ item, isFlipped, isMatched, index }: CardProps) {
    const flipCard = useGameStore((state) => state.flipCard);
    return (
        <button className={style.card} onClick={() => flipCard(index)} disabled={isMatched} aria-label={isFlipped ? `Card value: ${item.name}` : "Face-down card"}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""} ${isMatched ? style.matched : ""}`}>
                <div className={style.card_front}><Image fill={true} src={item.image} alt={item.name} loading="eager" unoptimized></Image></div>
                <div className={style.card_back}>?</div>
            </div>
        </button>
    )
}

export default memo(Card);