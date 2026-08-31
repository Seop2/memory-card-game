import styles from "./page.module.css"
export default function RankPage() {
    return (<main className={styles.page}>
        <section className={styles.title}>
            <h1>Ranking</h1>
            <h2>Normal Difficulty | Sorted by Moves</h2>
        </section>
        <section className={styles.rankHead}>
            <div className={styles.first}>
                <div>1ST</div>
                <div>Jinseop</div>
                <div>00:33</div>
                <div>80</div>
                <div>9 moves</div>
            </div>
            <div className={styles.second}>
                <div>2ND</div>
                <div>Seokho</div>
                <div>00:45</div>
                <div>80</div>
                <div>13 moves</div>
            </div>
            <div className={styles.third}>
                <div>3RD</div>
                <div>Sanghyun</div>
                <div>00:58</div>
                <div>80</div>
                <div>15 moves</div>
            </div>
        </section>
        <section className={styles.record}>
            <ul>
                <li>
                    <div>04</div>
                    <div>Soyeon</div>
                    <div>18 moves</div>
                </li>
                <li>
                    <div>05</div>
                    <div>Taeyeon</div>
                    <div>20 moves</div>
                </li>
                <li>
                    <div>06</div>
                    <div>Cheolsu</div>
                    <div>24 moves</div>
                </li>
                <li>
                    <div>07</div>
                    <div>Minji</div>
                    <div>25 moves</div>
                </li>
                <li>
                    <div>08</div>
                    <div>Jisu</div>
                    <div>30 moves</div>
                </li>
            </ul>
        </section>
    </main >)
}   