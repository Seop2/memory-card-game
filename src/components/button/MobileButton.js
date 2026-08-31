import Image from "next/image";
import styles from "./MobileButton.module.css"

export default function MobileButton() {
    return (
        <button className={styles.btn}>
            <Image src="/menu.png" alt="mobile" width={30} height={30} />
        </button>
    )
}