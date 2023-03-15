import styles from '../../styles/Navigation.module.scss'
import Link from 'next/link'
import Router from 'next/router'
export default function LoginButton({ login, session }) {
    
    return (
        <>
            <Link onClick={() => Router.push("/auth/signin?#")} href="#">
                <div className={`${styles.login} ${session ? styles.loggedin : ""}`}>
                    { session ? "logout" : "login" }
                </div>
            </Link>
        </>
    )
}
