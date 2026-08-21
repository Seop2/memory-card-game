import styles from "./page.module.css"
export default function RankPage() {
    return (<main className={styles.page}>
        <section className={styles.title}>
            <h1>Ranking</h1>
            <h2>Normal 난이도 | 이동 횟수 기준 정렬</h2>
        </section>
        <section className={styles.rankHead}>
            <div className={styles.first}>
                <div>1ST</div>
                <div>진섭</div>
                <div>00:33</div>
                <div>80</div>
                <div>9moves</div>
            </div>
            <div className={styles.second}>
                <div>2ND</div>
                <div>석호</div>
                <div>00:45</div>
                <div>80</div>
                <div>13moves</div>
            </div>
            <div className={styles.third}>
                <div>3RD</div>
                <div>상현</div>
                <div>00:58</div>
                <div>80</div>
                <div>15moves</div>
            </div>
        </section>
        <section className={styles.record}>
            <ul>
                <li>
                    <div>04</div>
                    <div>소연</div>
                    <div>18 moves</div>
                </li>
                <li>
                    <div>05</div>
                    <div>태연</div>
                    <div>20 moves</div>
                </li>
                <li>
                    <div>06</div>
                    <div>철수</div>
                    <div>24 moves</div>
                </li>
                <li>
                    <div>07</div>
                    <div>민지</div>
                    <div>25 moves</div>
                </li>
                <li>
                    <div>08</div>
                    <div>지수</div>
                    <div>30 moves</div>
                </li>
            </ul>
        </section>
    </main >)
}   