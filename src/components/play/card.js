import style from "./card.module.css"
export default function Card({ value, isFlipped, onClick }) {

    return (
        <div className={style.card} onClick={onClick}>
            <div className={`${style.card_inner} ${isFlipped ? style.flipped : ""}`}>
                <div className={style.card_front}>{value}</div>
                <div className={style.card_back}>?</div>
            </div>
        </div>
    )
}