import styles from '../../styles/Navigation.module.scss'
import Link from 'next/link'

export default function LoginButton({ login, session }) {
    
    return (
        <>
            <Link onClick={login} href="#">
                <div className={`${styles.login} ${session ? styles.loggedin : ""}`}>
                    { session ? "logout" : "login" }
                </div>
            </Link>
        </>
    )
}
