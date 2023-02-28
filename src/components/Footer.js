import Link from "next/link"
import styles from "../styles/Footer.module.scss"
function Footer() {
    return (
        <>
            <div className={styles.content}>
                <div>
                    <Link href="https://icons8.com/icon/43705/lock">
                        Lock
                    </Link>
                        icon by
                    <Link href="https://icons8.com">
                        Icons8
                    </Link>
                </div>
                <div>
                    <Link href="https://icons8.com/icon/47990/padlock">
                        Padlock
                    </Link>
                        icon by
                    <Link href="https://icons8.com">
                        Icons8
                    </Link>
                </div>
                <div>
                    <Link href="https://www.digitalocean.com/">
                        Digital Ocean
                    </Link>
                </div>
            </div>
        </>
    )
}

export { Footer }
