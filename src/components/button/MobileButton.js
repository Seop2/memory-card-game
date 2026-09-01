"use client"
import Image from "next/image";
import styles from "./MobileButton.module.css"
import { useState } from "react";
import Link from "next/link";

export default function MobileButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            {!isOpen && (<button className={styles.btn} onClick={toggleMenu}>
                <Image src="/menu.png" alt="mobile" width={30} height={30} />
            </button>)}
            <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={() => setIsOpen(false)} />
            <nav className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <Link href="/">Home</Link>
                <Link href="/play">Play</Link>
                <Link href="/rank">Ranking</Link>
            </nav>
        </>
    )
}