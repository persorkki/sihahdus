import Link from "next/link"
import styles from "../styles/Footer.module.scss"
import Image from "next/image"
import GitHubImage from "public/github-mark-white.svg"

function Footer() {
    return (
        <>
            <div className={styles.content}>
                <div>
                    <Link href="https://www.digitalocean.com/">
                        Digital Ocean
                    </Link>
                </div>
                {/*
                <div>
                    <Link href="https://nextjs.org/">
                        Next.js
                    </Link>
                </div>
                <div>
                    <Link href="https://reactjs.org/">
                        React
                    </Link>
                </div>
                <div>
                    <Link href="https://www.prisma.io/">
                        Prisma
                    </Link>
                </div>
                */}

                <div>
                    <Link href="https://github.com/persorkki/sihahdus">
                        <Image src={GitHubImage} width={17} height={17} alt="github link" />
                        Github
                    </Link>
                </div>

            </div>
        </>
    )
}

export { Footer }
