import styles from "./game-over-modal.module.css"
export default function GameOverModal({ score, onRestart, onClose }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>GAME OVER</h2>
                <p className={styles.score}>Your Score : <span >{score}</span></p>
                <div className={styles.actions}>
                    <button className={styles.button} onClick={onRestart}>Restart</button>
                    <button className={styles.button} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}