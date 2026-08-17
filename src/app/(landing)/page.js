import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section>
        <h2>게임방법</h2>
        <ul>
          <li>짝이 맞는 카드를 찾으세요</li>
          <li>제한시간안에 모든 카드를 찾으세요</li>
          <li>카드를 찾을수록 레벨이 올라가요</li>
        </ul>
      </section>
      <section>
        <h2>데모 리플레이</h2>
        <h3>플레이 영상</h3>
      </section>
    </div>
  );
}
