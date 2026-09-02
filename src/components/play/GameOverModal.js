"use client"
import { useState } from "react"
import styles from "./GameOverModal.module.css"
export default function GameOverModal({ score, onRestart, onClose, moves, onSave }) {
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSave = () => {
        if (!name.trim()) return;
        onSave(name);
        alert("저장 완료!")
        onClose();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>GAME OVER</h2>
                <p className={styles.score}>Your Score : <span >{score}</span></p>
                <p className={styles.score}>Your Moves : <span >{moves}</span></p>
                <section className={styles.saveName}>
                    <input type="text" placeholder="enter your name" value={name} onChange={handleChange} />
                    <button onClick={handleSave}>save</button>
                </section>
                <div className={styles.actions}>
                    <button className={styles.button} onClick={onRestart}>Restart</button>
                    <button className={styles.button} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}