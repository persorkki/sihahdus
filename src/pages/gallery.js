import Head from 'next/head';
import Image from 'next/image';
//import { readdir } from 'node:fs/promises';
import home from '../styles/Home.module.scss';
import styles from '../styles/Gallery.module.scss';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/getimages')
  const imageData = await res.json()
  
  return {
    props: { imageData: imageData.allImages },
  };
}

export default function Gallery({ imageData }) {
  /*
  const copyImageToClipboard = (target) => {
    navigator.clipboard.writeText(target);
    console.log(target);
  };
  */
  
  /* localhost is setup in next.config.js as domain */
  const galleryLoader = ({ src, quality }) => `${src}?q=${quality || 50}`;

  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>

      <main className={`${home.content} ${styles.content}`}>
        {/*
        <h1 className={home.title}>Gallery</h1>
              <h2></h2>
            */}
        <p>
          <span>copy</span>
          {' '}
          link by
          {' '}
          <span>clicking</span>
          {' '}
          image
        </p>
        <div className={styles.gallery}>
          {
            imageData.map((e) => (<Image loader={galleryLoader} key={e.id} className={styles.image} src={`/${e.path}`} width={100} height={100} alt={e.name} />))
          }
        </div>

      </main>
    </>
  );
}