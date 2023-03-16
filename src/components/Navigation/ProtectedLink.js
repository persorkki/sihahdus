import Link from "next/link"

export default function ProtectedLink({ route, checkRoute, children }) {
    return (
        <>
            <Link className={`${checkRoute(route)}`} href={route}>
                <li>
                    {children}
                </li>
            </Link>
        </>
    )
}