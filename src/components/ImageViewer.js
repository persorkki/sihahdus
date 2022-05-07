export function ImageViewer({ handleClick, currentImage }) {
  return (
    <div>
      <div className="grid">
        <button id="normal" onClick={() => handleClick(0)}>Normal</button>
        <button id="cruel" onClick={() => handleClick(1)}>Cruel</button>
        <button id="merciless" onClick={() => handleClick(2)}>Merciless</button>
        <button id="uber" onClick={() => handleClick(3)}>Uber</button>
        <img className="lab-image" src={currentImage} alt="" />
      </div>
    </div>
  );
}
