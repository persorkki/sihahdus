import Head from 'next/head';
import Image from 'next/image';
import home from '../styles/Home.module.scss';
import styles from '../styles/Configure.module.scss';
import ErrorView from '@/components/ErrorView';

import { useState } from 'react';
import { useSession } from "next-auth/react"
import { useRef } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function getServerSideProps() {
  const messageData = await prisma.message.findMany()
  return {
    props: { messageData: messageData },
    //TODO: maybe use getStaticProps for this? revalidate on create/destroy?
    //revalidate: 10
  };
}


export default function Configure({ messageData }) {
  const { data: session } = useSession();
  const [onlineStatus, setOnlineStatus] = useState("online");
  
  const [message, setMessage] = useState("");
  const [imageURL, setImageURL] = useState("");
  
  const messageRef = useRef(null);
  const imageURLRef = useRef(null);


  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleOnlineStatusChange = (e) => {
    setOnlineStatus(e.target.value);
  }

  const getMessageObject = () => {
    const messageObject = {
      message: message.current.value,
      remoteFilePath: imageURL.current.value,
      isOnline: onlineStatus === "online"
    }
    return messageObject
  }

  const onCloseForm = async (e) => {
    setIsFormVisible(false);
  }
  const onShowForm = async (e) => {
    setIsFormVisible(true);
  }
  const onPreview = async (e) => {
    e.preventDefault();

    setMessage(messageRef.current.value);
    setImageURL(imageURLRef.current.value);
    setShowPreview(true);

  }
  const onSubmitMessage = async (e) => {
    e.preventDefault();
    const messageObject = getMessageObject();
    console.log(messageObject);
  }

  if (!session) {
    return (
      <>
        <ErrorView></ErrorView>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>

      <main className={home.content}>

        <div className={!isFormVisible ? styles.openbutton : styles.hidden} onClick={onShowForm}>add new message ➕</div>
        <div className={isFormVisible ? styles.container : styles.hidden}>
          <div className={styles.titlebar}>
            <div>create new message</div>
            <div className={styles.closebutton} onClick={onCloseForm}>❌</div>
          </div>
          <form onSubmit={onSubmitMessage} className={styles.loginform}>

            <div>
              <label htmlFor="message">Message text: </label>
              <input id="message" type="text" ref={messageRef} required />
              {/* <input id="message" type="text" onChange={handleMessageChange} required /> */}

            </div>
            <div>
              <label htmlFor="url">Image URL </label>
              <input id="url" type="url" ref={imageURLRef} required />
              { /* <input id="url" type="url" onChange={handleImageURLChange} required /> */}
            </div>
            <div>
              <label htmlFor='online'>online</label>
              <input name="onoff"
                required
                id="online"
                type="radio"
                value="online"
                onChange={handleOnlineStatusChange}
                checked={onlineStatus === "online"} />
              <label htmlFor='offline'>offline</label>
              <input
                name="onoff"
                id="offline"
                type="radio"
                value="offline"
                onChange={handleOnlineStatusChange}
                checked={onlineStatus === "offline"} />
            </div>
            <button className={styles.submitbutton} type="submit">submit</button>
            <button className={styles.previewbutton} type="button" onClick={onPreview}>preview</button>
          </form>
          {showPreview && <Preview text={message} url={imageURL} />}
        </div>
        
        <div>
          {messageData.map(() => { console.log(messageData); })}
        </div>
      </main>
    </>
  )
}

function Preview({ text, url }) {
  return (
    <div className={styles.previewcontainer}>
      <div className={styles.titletext}>Crypt Keeper <div className={styles.bottext}>BOT</div></div>
      <div className={styles.preview} >
      
        <div className={styles.previewtext}>
          {text}
        </div>
        <div className={styles.previewimage}>
          <Image className={styles.testt} src={url} alt={text} width={'100'} height={'100'} ></Image>
        </div>
      </div>
    </div>
  )
}
