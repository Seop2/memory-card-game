import styles from "./game-over-modal.module.css"
export default function GameOverModal({ score, onRestart, onClose }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>게임 오버</h2>
                <p className={styles.score}>최종 점수 : {score}</p>
                <div className={styles.actions}>
                    <button className={styles.button} onClick={onRestart}>다시 시작</button>
                    <button className={styles.button} onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    )
}