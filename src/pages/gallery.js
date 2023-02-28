import Head from 'next/head'
import Image from 'next/image'
import home from '../styles/Home.module.scss'
import styles from '../styles/Gallery.module.scss'

import gallery_template_image from "../../public/fist.gif"
import gallery_template_image2 from "../../public/billy.gif"
import gallery_template_image3 from "../../public/kino.gif"
import gallery_template_image4 from "../../public/fleda.gif"
import gallery_template_image5 from "../../public/paddington.gif"
import gallery_template_image6 from "../../public/5.gif"
import gallery_template_image7 from "../../public/laalalaa.gif"
import gallery_template_image8 from "../../public/car.jpg"
import gallery_template_image9 from "../../public/blackknight.png"

export default function Gallery() {
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
            <p><span>copy</span> link by <span>clicking</span> image</p>
              <div className={styles.gallery}>
                  { /* 
                    maybe sort images by aspect ratio to make it look good?
                    or just force them into one size and cover fit
                  */ }
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image3} alt="2" />
                  <Image className={styles.image} src={gallery_template_image4} alt="2" />
                  <Image className={styles.image} src={gallery_template_image5} alt="1" />
                  <Image className={styles.image} src={gallery_template_image6} alt="2" />
                  <Image className={styles.image} src={gallery_template_image7} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="1" />
                  <Image className={styles.image} src={gallery_template_image4} alt="2" />
                  <Image className={styles.image} src={gallery_template_image4} alt="2" />
                  <Image className={styles.image} src={gallery_template_image5} alt="2" />
                  <Image className={styles.image} src={gallery_template_image6} alt="1" />
                  <Image className={styles.image} src={gallery_template_image8} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image3} alt="2" />
                  <Image className={styles.image} src={gallery_template_image7} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image7} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image9} alt="2" />
                  <Image className={styles.image} src={gallery_template_image4} alt="2" />
                  <Image className={styles.image} src={gallery_template_image8} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image8} alt="2" />
                  <Image className={styles.image} src={gallery_template_image9} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image} alt="1" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
                  <Image className={styles.image} src={gallery_template_image2} alt="2" />
              </div>

      </main>
    </>
  )
}
