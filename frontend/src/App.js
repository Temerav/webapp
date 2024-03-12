import { Route, Routes } from 'react-router-dom';

import Home from './components/Home/index.js'
import About from './components/About/index.js'
import Admin from './components/Admin/index.js';
import ResponsiveAppBar from './components/ResponsiveAppBar/index.js';
import Welcome from './components/Welcome/index.js';

function App() {

  return (
    <>
    <ResponsiveAppBar/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path="/About" element={<About/>} />
      </Routes>
    </>
  );
}

export default App;