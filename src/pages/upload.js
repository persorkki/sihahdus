import Head from 'next/head'
import home from '../styles/Home.module.scss'
import styles from '../styles/Upload.module.scss'

import ErrorView from '@/components/ErrorView';

import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'

const status = {
  DEFAULT: {
    text: "ready to upload",
    style: styles.statusIdle
  },
  COPIED: {
    text: "link copied to clipboard",
    style: styles.statusSuccess
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
  FAIL_UNPROCESSABLE_ENTITY: {
    text: "file format not allowed",
    style: styles.statusFail
  },
  FAIL_PAYLOAD_TOO_LARGE: {
    text: "file is too big",
    style: styles.statusFail
  },
  FAIL_FILE_ALREADY_EXISTS: {
    text: "file already exists on the server",
    style: styles.statusFail
  }
}

//TODO: remove later, used for simulating delay from server
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function Loader() {
  const { data: session } = useSession()
  if (!session) {
    return (
      <>
        <ErrorView></ErrorView>
      </>
    )
  }
  return <Upload />
}

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(status.DEFAULT);
  const [drag, setDrag] = useState(false);
  const [fileBlob, setFileBlob] = useState(null);
  const [filenameText, setFilenameText] = useState("");

  useEffect(() => {
    if (file) {
      setFileBlob(URL.createObjectURL(file))
    }
  }, [file]);

  const copyToClipboard = (text) => {
    setUploadStatus(status.COPIED)
    navigator.clipboard.writeText(text);
  }

  async function uploadFile(e) {
    e.preventDefault();
    setUploadStatus(status.UPLOADING)
    const formData = new FormData();

    //TODO: dev only
    if (process.env.NODE_ENV === 'development') {
      await sleep(1000);
    }
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
    //FIXME: 413 doesnt work
    const data = await response.json();

    if (!response.ok) {
      switch (response.status) {
        // unprocessable entity
        case (422):
          setUploadStatus(status.FAIL_UNPROCESSABLE_ENTITY)
          break;
        // payload too large
        case (413):
          setUploadStatus(status.FAIL_PAYLOAD_TOO_LARGE);
          break;
        // conflict
        case (409):
          setUploadStatus(status.FAIL_FILE_ALREADY_EXISTS);
          setFilenameText(data.existingFile.remoteFilepath);
          break;
      }
      return;
    }
    setUploadStatus(status.SUCCESS)
    setFilenameText(data.fileObject.remoteFilepath);
    return;
  }

  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>
      <main className={home.content}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation() }}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation() }} >

        <div className={styles.formcontent}>
          <form onSubmit={(uploadFile)}>
            <div className={styles.statusbox}>
              <p className={uploadStatus.style}>{uploadStatus.text}</p>
              <div
                onClick={() => { copyToClipboard(filenameText) }}
                className={`${styles.statusfn} ${filenameText ? styles.visible : styles.hidden}`}>
                {filenameText}
              </div>
            </div>
            <div className={styles.uploadboxcontainer}>

              <label
                onDragLeave={() => { setDrag(false) }}
                onDragOver={() => { setDrag(true) }}
                onDrop={(e) => { setFile(e.dataTransfer.files[0]); setDrag(false) }}
                className={`${styles.uploadbox} ${drag && styles.dragover} ${styles.bg}`}
                style={fileBlob && { backgroundImage: `url(${fileBlob})` }}
                htmlFor="files">
                {file ? "" : "drag & drop"}
              </label>

            </div>

            <input
              onChange={(e) => { setFile(e.target.files[0]) }}
              className={styles.fileInput}
              type="file"
              name="files"
              id="files" />

            <input
              className={styles.submitbutton}
              type="submit"
              value="upload" />

          </form>

        </div>
      </main>
    </>
  )
}
