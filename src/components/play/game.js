import styles from "./game.module.css"
import Card from "./card"
export default function Game() {
    const cardList = Array.from({ length: 20 }, (_, index) => index);

    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {
                    cardList.map((id) => (
                        <Card key={id} />
                    ))
                }
            </div>
        </div>
    )
}