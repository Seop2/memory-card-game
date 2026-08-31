import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.rule}>
        <h2 className={styles.title}>How to Play</h2>
        <ul className={styles.rules}>
          <li>Find matching pairs of animal cards</li>
          <li>Find all the cards before time runs out</li>
          <li>Your score goes up as you find matches</li>
        </ul>
      </section>
      <section className={styles.demo}>
        <h2>Demo Replay</h2>
        <h3>Gameplay Video</h3>
      </section>
    </div>
  );
}
