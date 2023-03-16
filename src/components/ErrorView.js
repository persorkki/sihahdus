import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import arino from "../../public/sihahdus.svg";
export default function ErrorView() {
    return (
        <>
            <Head>
                <title>Sihahdus</title>
                <meta name="personal website" content="bla" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/sihahdus.ico" />
            </Head>

            <main className={styles.content}>
                <h1 className={styles.title}>Access <span>denied</span></h1>
                <h2><span>Login</span> to view this page</h2>

                <Image src={arino} className={styles.arino} alt="arino smug smile" />
            </main>
        </>
    )
}