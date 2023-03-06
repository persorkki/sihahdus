import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import { useState } from 'react'

export default function Upload() {
  const [file, setFile] = useState(null);

  function getTags(input) {

    const tagStrings = input.split(" ")
    const tags = [];

    for (let i = 0; i < tagStrings.length; i++) {
      tags.push({ description: tagStrings[i]})
    }
    return tags
  }

  const onUploadFileChanged = (e) => {
    setFile(e.target.files[0])
    //console.log(e.target.files);
    //console.log(file);
  }

  async function addFile2(e, form) {
    e.preventDefault();
    console.log(form);
    //const tags = getTags(e.target.tags.value)
    const formData = new FormData();
    formData.append("uploadFile", file)
    
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    /*
    const headers = {
      'Content-Type': 'multipart/form-data',
    }
    */
    const result = await fetch('/api/upload',
    {
      method: "POST",
      /* 
         https://stackoverflow.com/a/46640744
         headers: headers */
      body: formData,
      })
    
    console.log(result);
  }

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

  return (
    <>
      <Head>
        <title>Sihahdus</title>
        <meta name="personal website" content="bla" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/sihahdus.ico" />
      </Head>
      
      <main className={styles.content}>
        <h1 className={styles.title}>upload</h1>
        <h2></h2>
        <form onSubmit={(addFile2)}>
          <label htmlFor="files">file</label>
          <input onChange={onUploadFileChanged} type="file" name="files" id="files" / >
          <br />
          <input type="submit" value="upload" />
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
      </main>
    </>
  )
}
