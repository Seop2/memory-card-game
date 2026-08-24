import style from "./card.module.css"
export default function Card({ value, isFlipped, onClick }) {

    return (
        <div className={style.card} onClick={onClick} role="button" tabIndex={0} aria-label={isFlipped ? `카드 값: ${value}` : "뒤집히지 않은 카드"}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}>{value}</div>
                <div className={style.card_back}>?</div>
            </div>
        </div>
    )
}