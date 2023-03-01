import Link from "next/link"

export default function ProtectedLink({ session, route, checkLoggedIn, checkRoute, children }) {
    return (
        <>
            <Link className={`${checkLoggedIn(session)} ${checkRoute(route)}`} href={route}>
                <li>
                    {children}
                </li>
            </Link>
        </> 
    )
}