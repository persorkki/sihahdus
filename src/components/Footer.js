import Link from "next/link"
import styles from "../styles/Footer.module.scss"
import Image from "next/image"
import GitHubImage from "public/github-mark-white.svg"
import DigitalOceanImage from "public/DO_Logo_icon_blue.svg"
function Footer() {
    return (
        <>
            <div className={styles.content}>
                <div>
                    <Link href="https://www.digitalocean.com/?refcode=b859d8ac1d3c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
                        hosted on
                        <Image src={DigitalOceanImage} width={17} height={17} alt="digital ocean link" />
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
                        source
                        <Image src={GitHubImage} width={17} height={17} alt="github link" />
                        GitHub
                    </Link>
                </div>

            </div>
        </>
    )
}

export { Footer }
