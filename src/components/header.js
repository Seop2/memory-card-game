import styles from "./header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/"><h1>MEMORY GAME</h1></Link>
            <nav className={styles.nav}>
                <Link href="/">메인</Link>
                <Link href="/play">게임시작</Link>
                <Link href="/rank">랭킹보기</Link>
            </nav>
        </header>
    )
}