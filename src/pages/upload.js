import Head from 'next/head'
import styles from '../styles/Home.module.scss'
//import { useState } from 'react'
import { useRef } from 'react'

export default function Upload() {
  //const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const fileBlaRef = useRef(null);
  /*
  function getTags(input) {

    const tagStrings = input.split(" ")
    const tags = [];

    for (let i = 0; i < tagStrings.length; i++) {
      tags.push({ description: tagStrings[i]})
    }
    return tags
  }
  */

  async function uploadFile(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("uploadFile", fileInputRef.current.files[0])
    // additional fields
    formData.append("bla", fileBlaRef.current.value)
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
    if (response.status != 200) {
      console.log(`something went wrong: "${response.status} ${response.statusText}"`);
      return;
    }
    else {
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
      
      <main className={styles.content}>
        <h1 className={styles.title}>upload</h1>
        <h2></h2>
        <form onSubmit={(uploadFile)}>
          <label htmlFor="files">file</label>
          { /* onChange={onUploadFileChanged} */ }
          <input type="file" ref={fileInputRef} name="files" id="files" />
          <br />
          <label htmlFor="abc">name</label>
          <input type="text" ref={fileBlaRef} name="abc"></input>
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
