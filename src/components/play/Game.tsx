"use client";
import styles from "./Game.module.css";
import Card from "./Card";
import { useEffect, useRef } from "react";
import GameOverModal from "./GameOverModal";
import { useGameStore } from "@/store/gameStore";
import Timer from "./Timer";
import Score from "./Score";
import { RankRecord, useRankStore } from "@/store/rankStore";
/**
 * Core game rules
 *  1. Only two cards can be flipped at a time
 *  2. Compare the values
 *  3. Mismatched cards flip back automatically
 *  4. Score is earned on a successful match
 *  5. Time limit
 * @returns
 */

interface GameProps {
  isStarted: boolean;
  onGameEnd?: () => void;
  onRestart?: () => void;
}

export default function Game({ isStarted, onGameEnd, onRestart }: GameProps) {
  const cards = useGameStore((state) => state.cards);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const startGame = useGameStore((state) => state.startGame);
  const stopGame = useGameStore((state) => state.stopGame);
  const lockGame = useGameStore((state) => state.lockGame);
  const closeGame = useGameStore((state) => state.closeGame);
  const tick = useGameStore((state) => state.tick);
  const flippedCardIdx = useGameStore((state) => state.flippedCardIdx);
  const matchedIdx = useGameStore((state) => state.matchedIdx);
  const moves = useGameStore((state) => state.moves);
  const addRecord = useRankStore((state) => state.addRecord);
  const finalScore = useGameStore((state) => state.score);
  const hasStartedRef = useRef(false);

  //Preview cards on initial load (locked, not a game-over state)
  useEffect(() => {
    startGame();
    lockGame();
  }, []);

  //Reset store when the game starts, end the game when the user manually stops it
  //(skip if the game already ended on its own, e.g. a win or timeout)
  useEffect(() => {
    if (isStarted) {
      hasStartedRef.current = true;
      startGame();
    } else {
      if (hasStartedRef.current) stopGame();
      hasStartedRef.current = false;
    }
  }, [isStarted, startGame, stopGame]);

  //Timer logic
  useEffect(() => {
    if (isGameOver || !isStarted) return;

    const timer = setInterval(() => tick(), 1000);

    return () => clearInterval(timer);
  }, [isGameOver, isStarted, tick]);

  useEffect(() => {
    if (isGameOver) onGameEnd?.();
  }, [isGameOver, onGameEnd]);

  const handleCloseModal = () => {
    closeGame();
  };

  const handleRestart = () => {
    onRestart?.();
  };

  const isMatched = (index) => matchedIdx.includes(index);
  const isFlipped = (index) =>
    flippedCardIdx.includes(index) || matchedIdx.includes(index);

  const handleSave = (userName: string) => {
    const record: RankRecord = {
      userName,
      score: finalScore,
      moves: moves,
      createdAt: new Date().toISOString(),
    };
    addRecord(record);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gameHeader}>
        <Timer />
        <Score />
      </div>
      <div className={styles.cards}>
        {cards.map((item, index) => (
          <Card
            key={index}
            item={item}
            index={index}
            isFlipped={isFlipped(index)}
            isMatched={isMatched(index)}
          />
        ))}
      </div>
      {isGameOver && (
        <GameOverModal
          score={finalScore}
          onRestart={handleRestart}
          onClose={handleCloseModal}
          moves={moves}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
