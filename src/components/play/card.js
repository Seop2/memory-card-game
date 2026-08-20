"use client"
import { useState } from "react";
import style from "./card.module.css"
export default function Card() {
    const [isFlipped, setFlipped] = useState(false);

    return (
        <div className={style.card} onClick={() => setFlipped(!isFlipped)}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}>앞면</div>
                <div className={style.card_back}>뒷면</div>
            </div>
        </div>
    )
}