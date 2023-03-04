import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Configure() {
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>
      
      <main className={styles.content}>
        <h1 className={styles.title}>Configure</h1>
        <h2></h2>
      </main>
    </>
  )
}
