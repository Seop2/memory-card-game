"use client";
import { dateFmt } from "@/lib/dateFormat";
import styles from "./page.module.css";
import { useRankStore } from "@/store/rankStore";

/**
 * 1ST / Jinseop / 00:33 / 80 / 9 moves
→ rank, { name, score, moves, date }
 * @returns 
 */

const rankLabel = ["1ST", "2ND", "3RD"];
const rankClass = [styles.first, styles.second, styles.third];

export default function RankPage() {
  const ranks = useRankStore((state) => state.ranks);
  const rankHeadData = ranks.slice(0, 3);
  const rankRestData = ranks.slice(3);
  return (
    <main className={styles.page}>
      <section className={styles.title}>
        <h1>Ranking</h1>
        <h2>Sorted by Score & Moves</h2>
      </section>
      {ranks.length === 0 ? (
        <p className={styles.empty}>
          아직 저장된 기록이 없습니다. 게임을 플레이하고 기록을 남겨보세요!
        </p>
      ) : (
        <>
          <section className={styles.rankHead}>
            {rankHeadData.map((rank, index) => (
              <div key={index} className={rankClass[index]}>
                <div>{rankLabel[index]}</div>
                <div>{rank.userName}</div>
                <div>{dateFmt.format(new Date(rank.createdAt))}</div>
                <div>{rank.score}</div>
                <div>{rank.moves} moves</div>
              </div>
            ))}
          </section>
          <section className={styles.record}>
            <ul>
              {rankRestData.map((rank, index) => (
                <li key={index}>
                  <div>{index + 4}</div>
                  <div>{rank.userName}</div>
                  <div>{rank.moves} moves</div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
