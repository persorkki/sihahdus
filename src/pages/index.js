import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>
      
      <main className={styles.content}>
        <h1 className={styles.title}>Hey, <span>you!</span></h1>
        <h2>...welcome</h2>
        <p><span className={`${styles.highlight} ${styles.tooltip}`} title="">Sihahdus</span> is a simple file sharing and streaming server for personal use. You are welcome to explore the gallery, but uploading and configuration requires authorization.</p>
        <p>This site is a work in progress and might go down at any time for any reason. </p>
      </main>
    </>
  )
}
