import { useState } from 'react';
import { ImageViewer } from './ImageViewer';
import { GemSearch } from './Gems';
import { Links } from './Links';

export function Home() {
  const images = [
    "normal.jpg",
    "cruel.jpg",
    "merciless.jpg",
    "uber.jpg"
  ];
  const [currentImage, setCurrentImage] = useState(3);

  const handleClick = (index) => {
    setCurrentImage(index);
  };
  return (
    <div className="home">
      <Links />
      <GemSearch />
      <ImageViewer handleClick={handleClick} currentImage={`../lab/${images[currentImage]}`} />
    </div>
  );
}

