import Head from 'next/head'
import home from '../styles/Home.module.scss'
import styles from '../styles/Upload.module.scss'

import { useEffect, useState } from 'react'

const status = {
  DEFAULT: {
    text: "idle",
    style: styles.statusIdle
  },
  UPLOADING: {
    text: "uploading...",
    style: styles.statusUploading
  },
  SUCCESS: {
    text: "file uploaded!",
    style: styles.statusSuccess
  },
  FAIL: {
    text: "upload failed",
    style: styles.statusFail
  },
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(status.DEFAULT);
  
  //setUploadStatus

  async function uploadFile(e) {
    e.preventDefault();
    setUploadStatus(status.UPLOADING)
    const formData = new FormData();
    await sleep(1000);
    formData.append("uploadFile", file)
    /* 
    https://stackoverflow.com/a/46640744
    needs to have a boundary, which formidable sets by default
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    */
    const response = await fetch('/api/upload',
      {
        method: "POST",
        /* 
           https://stackoverflow.com/a/46640744
           headers: headers 
        */
        body: formData,
      })
    console.log(response);
    if (!response.ok) {
      switch (response.status)
      {
        case (422):
          console.log("422");
          break;
        case (413):
          console.log("413");
          break;
      }
      console.log(`something went wrong: "${response.status} ${response.statusText}"`);
      setUploadStatus(status.FAIL)
      setTimeout(() => {
        setUploadStatus(status.DEFAULT)
      }, 2000);
      return;
    }
    else {
      setUploadStatus(status.SUCCESS)
      setTimeout(() => {
        setUploadStatus(status.DEFAULT)
      }, 2000);
      console.log(`file successfully uploaded "${response.status} ${response.statusText}"`);
      console.log(response);
    }
    
  }

/*
  async function addFile(e) {
    e.preventDefault();

    const tagStrings = e.target.tags.value.split(" ")
    const tags = [];

    for (let i = 0; i < tagStrings.length; i++) {
      tags.push({ description: tagStrings[i]})
    }
    
    const send = {
      name: e.target.name.value,
      path: e.target.path.value,
      tags: tags
    }
    console.log(send);
    const result = await fetch('/api/upload',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(send)
      })
    if (!result.ok)
    {
      console.log(`something went wrong`, result);
    }
  }
*/
  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>

      <main className={home.content}
        onDragOver={(e) => { e.preventDefault() }}
        onDrop={(e) => { e.preventDefault() }} >
        

        <div className={styles.formcontent}>
        <form onSubmit={(uploadFile)}>
        <div className={styles.statusbox}>
          <p className={uploadStatus.style}>{uploadStatus.text}</p>
        </div>
            <label onDrop={(e) => { setFile(e.dataTransfer.files[0]) }} className={styles.uploadbox} htmlFor="files">{file ? file.name : "drag & drop"}</label>
          {/* 
          label takes over and we use that as our file input, since htmlFor makes it work
          file input should probably not use "hidden" and put it in the CSS instead 
          */}
            <input
              onChange={(e) => { setFile(e.target.files[0]) }} className={styles.fileInput} type="file" name="files" id="files" />
          
          {/*
          <label htmlFor="abc">name</label>
          <input type="text" ref={fileBlaRef} name="abc"></input>
          */}
          
            <input className={styles.submitbutton} type="submit" value="upload" />
          {/*
          <label htmlFor="name">name</label>
          <input type="text" name="name" id="name"></input>
        <br/>
          <label htmlFor="path">path</label>
          <input type="text" name="path" id="path"></input>
          <br />
          <label htmlFor="tags">tags</label>
          <input type="text" name="tags" id="tags"></input>
          <button type="submit">--send--</button>
          */}
          </form>
          
        </div>
      </main>
    </>
  )
}
