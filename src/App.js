import './App.css';
import NavBar from './components/NavBar/NavBar';
import { FcHome } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcShop } from "react-icons/fc";


import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import { Route, Routes } from 'react-router-dom';

const navLinks=[
  {
      title:"Home" ,
      path:"/",
      icon:<FcHome/>
  },
  {
      title:"About" ,
      path:"/About",
      icon:<FcLike/>

  },
  {
      title:"Store" ,
      path:"/Store",
      icon:<FcShop/>

  }
]
function App() {
  return (
    <>
    <NavBar navLinks={navLinks}></NavBar>
     <div> 
     <Routes>
     <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/Store" element={<Store/>}></Route>
     </Routes>
     
     
    </div> 
   </>
  );
}

export default App;
