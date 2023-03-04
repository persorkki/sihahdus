//import SihahdusIcon from '../../public/sihahdus.svg'
import styles from '../styles/Navigation.module.scss'

import Link from 'next/link'
//import Image from 'next/image'

import ProtectedLink from './Navigation/ProtectedLink'
import LoginButton from './Navigation/LoginButton'

import { useRouter } from 'next/router'
import { useState } from 'react'

function Navigation() {
    const router = useRouter();
    const [session, setSession] = useState(true);
    
    const checkRoute = (path) => {
        return router.pathname === path ? styles.current : ""
    }

    const login = () => {
        setSession(!session);
    }

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
                {session && <ProtectedLink session={session} route="/configure" checkRoute={checkRoute}>configure</ProtectedLink> }
                {session && <ProtectedLink session={session} route="/upload" checkRoute={checkRoute}>upload</ProtectedLink> } 
            </ul>
            {/* 
                Maybe extract this login button into a component 
                would help with state management as we could just pass the session status
                would be more clean. It has to change the background color which links dont do
                so it's different from them. also needs to change title from login to logged in
                <Login session={session}/>

                TODO: add logged in button style
            */}
            <LoginButton session={session} login={login}></LoginButton>

        </nav>
    )
}


export { Navigation }
