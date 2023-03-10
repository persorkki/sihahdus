// next imports
import Head from 'next/head';
import Image from 'next/image';
// styles
import home from '../styles/Home.module.scss';
import styles from '../styles/Gallery.module.scss';
// react
import { useEffect } from 'react';
import { useState } from 'react';
// others
import { PrismaClient } from "@prisma/client";

//staticprops?
export async function getServerSideProps() {
  const prisma = new PrismaClient()
  /*
  const response = await fetch('http://localhost:3000/api/getimages')
  const imageData = await response.json()
  */
  const imageData = await prisma.image.findMany({
    include: {
      tags: true,
    },
  })
  prisma.$disconnect(); 
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

  const [copyText, setCopyText] = useState("clicking")

  useEffect(()=> {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 700)
        setCopyText("touching");
      else
        setCopyText("clicking");
    })
 }, [])
  
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>

      <main className={`${home.content} ${styles.content}`}>
        {/*<Banner>Gallery</Banner>*/}
        <p>
          copy
          link by
          <span> {copyText} </span>
          image
        </p>
        <div className={styles.gallery}>
          {imageData.map((e) => (
            <div key={e.id} className={styles.galleryImage}>
              <Image loader={galleryLoader} key={e.id} className={styles.image} src={`/${e.path}`} width={100} height={100} alt={e.name} />
              {/*
              <div key={e.id} className={styles.tags}>
              {
                e.tags.map((x) => (
                  
                    <div key={x.id} className={styles.tag}>{x.description}</div>
                  
                ))
                }
              </div>
              */}
            </div>
            ))
          }
        </div>

      </main>
    </>
  );
}
{/*
function Banner({ children }) {
  return (
    <>
      <h1>
        {children.slice(0, children.length/2)}
        <span>{children.slice(children.length/2)}</span>
      </h1>
    </>
  )  
  } 
*/}