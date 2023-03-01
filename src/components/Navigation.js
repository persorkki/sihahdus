import lockimage from '../../public/icons8-lock-16.png'
import SihahdusIcon from '../../public/sihahdus.svg'
import styles from '../styles/Navigation.module.scss'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Navigation({ children, href }) {
    
    const [session, setSession] = useState(false);

    const router = useRouter();
    
    const checkRoute = (path) => {
        return router.pathname === path ? styles.current : ""
    }

    const checkLoggedIn = (session) => {
        return !session ? styles.noaccess : styles.access;
    }

    const login = () => {
        setSession(!session);
    }

    //const session = false;

    return (
        <nav className={styles.navbar}>
            <ul>

                <Link className={checkRoute("/")} href="/" passHref>
                    <li>
                        home
                    </li>
                </Link>
                
                <Link className={checkRoute("/gallery")} href="/gallery">
                    <li>
                        gallery
                    </li>
                </Link>
                
                <Link className={`${checkLoggedIn(session)} ${checkRoute("/configure")}`} href="/configure">
                    <li>
                        <Image src={lockimage} alt="image of a lock" />
                        configure
                    </li>
                </Link>
                <Link className={`${checkLoggedIn(session)} ${checkRoute("/upload")}`} href="/upload">
                    <li>
                        <Image src={lockimage} alt="image of a lock" />
                        upload
                    </li>
                </Link>
            </ul>

            {/* 
                Maybe extract this login button into a component 
                would help with state management as we could just pass the session status
                would be more clean. It has to change the background color which links dont do
                so it's different from them. also needs to change title from login to logged in
                <Login session={session}/>

                TODO: add logged in button style
            */}
            <Link onClick={login} href="#">
                <div className={styles.login}>
                    login
                </div>
            </Link>
        </nav>
    )
}

export { Navigation }