
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>메모리 카드 게임</h1>
        <p className={styles.description}>
          두뇌를 위한 궁극의 매칭 게임!
        </p>
        <nav className={styles.nav}>
          <Link href="/play" className={styles.navLink}>
            게임 시작
          </Link>
          <Link href="/rank" className={styles.navLink}>
            랭킹 보기
          </Link>
        </nav>
      </header>
    </div>
  );
}
