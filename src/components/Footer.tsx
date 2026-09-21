import styles from "./Footer.module.css"
export default function Footer() {
    return <footer className={styles.footer}>
        <a href="https://github.com/Seop2/memory-card-game" target="_blank" rel="noopener noreferrer">
            <h2>Github Repository</h2>
        </a>
        <p>@2026 Memory Card Game All rights reserved</p>
    </footer>
}