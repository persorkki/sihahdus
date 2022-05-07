import './App.css';
import { useState } from 'react';
import { ImageViewer } from './components/ImageViewer'
import { GemSearch } from './components/Gems';

function App() {
  /*
  const images = [
    require("normal.jpg"),
    require("cruel.jpg"),
    require("merciless.jpg"),
    require("uber.jpg"),
  ]
  */
  const images = [
    "normal.jpg",
    "cruel.jpg",
    "merciless.jpg",
    "uber.jpg"
  ]
  const [currentImage, setCurrentImage] = useState(3);

  const handleClick = (index) => {
    setCurrentImage(index);
  }

  return (

    <div className="App">
      <div className="perspiraatti-title">Perspiraatti</div>
      <Links/>
      <GemSearch />
      <ImageViewer handleClick={handleClick} currentImage={`../lab/${images[currentImage]}`} />
   </div>
  );
}
function Links() {
  return (
    <div className="links">
      <a href="https://poedb.tw/us/mod.php">PoeDB Mods</a>
      
      <a href="https://www.pathofexile.com/forum/view-thread/3229187">3.17.0 Patchnotes</a>
      
      <a href="https://gggtracker.com/">GGG Tracker</a>
      
    </div>
  );
}
export default App;
