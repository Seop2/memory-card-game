import styles from "./header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" className={styles.title}><h1>MEMORY GAME</h1></Link>
            <nav className={styles.nav}>
                <Link href="/">Home</Link>
                <Link href="/play">Play</Link>
                <Link href="/rank">Ranking</Link>
            </nav>
        </header>
    )
}