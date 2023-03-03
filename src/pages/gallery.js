import Head from 'next/head';
import Image from 'next/image';
import { readdir } from 'node:fs/promises';
import home from '../styles/Home.module.scss';
import styles from '../styles/Gallery.module.scss';

export async function getServerSideProps() {
  // const fs = require('fs')

  const folderPath = 'G:/code/web/sihahdus-necro/public/';
  let imageData = [];
  try {
    const files = await readdir(folderPath);
    imageData = files;
  } catch (err) {
    console.log(err);
  }
  return {
    props: { imageData },
  };
}

export default function Gallery({ imageData }) {
  /*
  const copyImageToClipboard = (target) => {
    navigator.clipboard.writeText(target);
    console.log(target);
  };
  */

  const galleryLoader = ({ src, quality }) => `http://localhost:3000/${src}?q=${quality || 50}`;

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
             imageData.map((e) => (<Image loader={galleryLoader} key={e} className={styles.image} src={`/${e}`} width={100} height={100} alt="gallery image" />))

            }
        </div>

      </main>
    </>
  );
}
