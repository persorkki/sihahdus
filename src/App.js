import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Album } from "./components/Album";

function App() {

  return (
    <div className="App">
      <div className="perspiraatti-title">Perspiraatti</div>
      <Router>
        <div className="links"> 
          <Link to="/">Home</Link>
          <Link to="/album">Album</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/album" element={<Album />} />
        </Routes>
      </Router>
   </div>
  );
}
export default App;
