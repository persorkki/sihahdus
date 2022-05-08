import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './components/Home';
import { Album } from "./components/Album";
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <div className="perspiraatti-title">Sihahdus <img alt="sihahdus icon" src="../sihahdus.jpg"></img></div>
      <Router>
        <div className="navlinks"> 
          <NavLink style={({ isActive }) => (isActive ? { color: "#fcd198e0" } : {color:"#9b6a2be0"})} to="/">Path of Exile</NavLink>
          <NavLink style={({ isActive }) => (isActive ? { color: "#fcd198e0" } : {color:"#9b6a2be0"})} to="/album">Album covers</NavLink>
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
