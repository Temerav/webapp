import { Route, Routes } from 'react-router-dom';

import Home from './components/home/Home.js'
import About from './components/about/About.js'
import Navbar from './components/navbar/Navbar.js';
import Admin from './components/admin/Admin.js';

function App() {

  return (
    <>
      <Navbar/>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/about' element={<About/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
