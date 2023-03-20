// next imports
import Head from 'next/head';
import Image from 'next/image';
// styles
import home from '../styles/Home.module.scss';
import styles from '../styles/Gallery.module.scss';
// react
/*
import { useEffect } from 'react';
import { useState } from 'react';
*/
// others
import prisma from "../lib/prisma"
//staticprops?
export async function getServerSideProps() {
  const imageData = await prisma.file.findMany({
    where: {
      mime: {
        startsWith: "image"
      }
    }
  })
  return {
    props: { imageData: imageData },
    //revalidate: 10
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

  /*
  const [copyText, setCopyText] = useState("clicking")

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 700)
        setCopyText("touching");
      else
        setCopyText("clicking");
    })
  }, [])
  */
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>
      <main className={`${home.content} ${styles.content}`}>
        <div className={styles.gallery}>
          {imageData.map((e) => (
            <div key={e.id} className={styles.galleryImage}>
              <Image loader={galleryLoader} key={e.id} className={styles.image} src={`/${e.filename}`} width={100} height={100} alt={e.filename} />
            </div>
          ))
          }
        </div>

      </main>
    </>
  );
}
