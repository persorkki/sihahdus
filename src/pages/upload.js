import Head from 'next/head'
import styles from '../styles/Home.module.scss'
//import { useState } from 'react'

export default function Upload() {
  //const [sendObject, setSendObject] = useState({ name: "", path: "" })
  
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
        <form onSubmit={addFile}>
          <label htmlFor="name">name</label>
          <input type="text" name="name" id="name"></input>
        <br/>
          <label htmlFor="path">path</label>
          <input type="text" name="path" id="path"></input>
          <br />
          <label htmlFor="tags">tags</label>
          <input type="text" name="tags" id="tags"></input>
          <button type="submit">--send--</button>
        </form>
      </main>
    </>
  )
}
