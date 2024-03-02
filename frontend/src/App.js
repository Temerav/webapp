import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home.js'
import About from './components/About/About.js'
// import Navbar from './components/Navbar/Navbar.js';
import Admin from './components/Admin/Admin.js';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppbar.js';

function App() {

  return (
    <>
    <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/About" element={<About/>} />
      </Routes>
    </>
  );
}

export default App;