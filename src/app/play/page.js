import { Suspense } from "react"
import styles from "./page.module.css"
import Game from "@/components/play/game"
export default function PlayPage() {
    return <div className={styles.page}>
        <Suspense fallback={<div>로딩중.....</div>}>
            <Game />
        </Suspense>
    </div>
}