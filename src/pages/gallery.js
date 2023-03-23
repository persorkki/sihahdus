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
  const handleVideoClick = (e) => {
    window.open(e.target.dataset.url);
  }
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
            <div key={e.id} className={styles.galleryImage} onClick={handleVideoClick}>
              {
                e.filename.endsWith(".gif") ? (
                  <video
                    autoPlay
                    loop muted
                    playsInline
                    data-url={e.filename}
                    key={e.id}
                    >
                    <source
                      type="video/webm"
                      /* TODO: the webm path should be in the db
                      this whole page needs a rework */
                      src={`/${e.filename.split(".")[0] + ".webm"}`} />
                  </video>
                ) : (
                    <Image key={e.id}
                      className={styles.image}
                      src={`/${e.filename}`}
                      width={100} height={100}
                      alt={e.filename}
                      data-url={e.filename}/>
                )
              }

            </div>
          ))
          }
        </div>

      </main>
    </>
  );
}
