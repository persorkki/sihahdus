import axios from "axios";
import React from "react";
import { useState } from "react";

export function Album() {
  const [searchValue, setSearchValue] = useState("");
  const [albumCovers, setAlbumCovers] = useState([]);
  const [region, setRegion] = useState("");


  const handleRegion = (event) => {
    setRegion(event.target.value);
  }
  const handleSubmit = (event) => {
    if (searchValue.length < 1) {
      return
    }

    event.preventDefault();
    axios.get(`https://itunes.apple.com/search?term=${searchValue}&entity=album&country=${region}&limit=200`)
      .then(res => {
        setAlbumCovers(res.data.results.map(album => {
          return {
            collectionName: album.collectionName,
            collectionId: album.artistId+album.collectionId,
            artworkUrl100: album.artworkUrl100,
            //replace size
            artworkUrl10000: album.artworkUrl100.replace("100x100bb.jpg", "10000x10000bb.png")
          }
        }))
      })
  };

  return (
    <>
      <div className="album">
        <input autofocus onInput={e => setSearchValue(e.target.value)}  className="gems-search-input" placeholder="artist/album name here"></input>
        <select onChange={handleRegion}>
          <option selected value="us">United States</option>
          <option value="fi">Finland</option>
          <option value="jp">Japan</option>
          <option value="uk">United Kingdom</option>
	      </select>
        <button className="album-search-btn" onClick={handleSubmit}>aa</button>

      </div>
      <div className="image-area">
        {albumCovers.map((album, i) => {
        return (
          <a key={i} className="thumb-button" href={album.artworkUrl10000} title={album.collectionName}>
            <Cover cover={album.artworkUrl100} />
          </a>
        ); }
      )}
      </div>
    </>
  );
}

function Cover({ cover }) {
    return (
      <div className="album-cover">
        <img src={cover} alt="album cover" />
      </div>
    );
  }

