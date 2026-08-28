import Image from "next/image"
import style from "./card.module.css"
export default function Card({ item, isFlipped, onClick }) {

    return (
        <div className={style.card} onClick={onClick} role="button" tabIndex={0} aria-label={isFlipped ? `카드 값: ${item.name}` : "뒤집히지 않은 카드"}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}><Image width={150} height={150} src={item.image} alt={item.name} loading="eager" unoptimized></Image></div>
                <div className={style.card_back}>?</div>
            </div>
        </div>
    )
}