"use client"
import style from "./card.module.css"
import { useState } from "react";
export default function Card() {
    const [isFlipped, setIsFlipped] = useState(false);

    const onhandleCardEvent = () => {
        setIsFlipped((prev) => !prev);
    }



    return (
        <div className={style.card} onClick={onhandleCardEvent}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}>앞면</div>
                <div className={style.card_back}>뒷면</div>
            </div>
        </div>
    )
}