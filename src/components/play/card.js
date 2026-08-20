"use client"
import { useState } from "react";
import style from "./card.module.css"
export default function Card({ value }) {
    const [isFlipped, setFlipped] = useState(false);

    return (
        <div className={style.card} onClick={() => setFlipped(!isFlipped)}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}>{value}</div>
                <div className={style.card_back}>?</div>
            </div>
        </div>
    )
}