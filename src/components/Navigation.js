//import SihahdusIcon from '../../public/sihahdus.svg'
import styles from '../styles/Navigation.module.scss'

import Link from 'next/link'
//import Image from 'next/image'

import ProtectedLink from './Navigation/ProtectedLink'
import LoginButton from './Navigation/LoginButton'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react";

function Navigation() {
    const router = useRouter();
    //const [session, setSession] = useState(true);
    const { data: session } = useSession();
    const checkRoute = (path) => {
        return router.pathname === path ? styles.current : ""
    }
    /*
    const login = () => {
        setSession(!session);
    }
    */

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
                {session && <ProtectedLink session={session} route="/messages" checkRoute={checkRoute}>messages</ProtectedLink>}
                {session && <ProtectedLink session={session} route="/upload" checkRoute={checkRoute}>upload</ProtectedLink>}
            </ul>
            {session ?
                <LoginButton session={session} login={signOut}></LoginButton> :
                <LoginButton session={session} login={signIn}></LoginButton>
            }
        </nav>
    )
}

export { Navigation }
