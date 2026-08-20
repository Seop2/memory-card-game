import styles from "./game.module.css"
import Card from "./card"
import { generatePairedValues } from "@/lib/generatePariedValues"
export default function Game() {
    const cardList = generatePairedValues(10);
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                {
                    cardList.map((value, index) => (
                        <Card key={index} value={value} />
                    ))
                }
            </div>
        </div>
    )
}