import React from 'react'
import "../css/styles.css"

import Hero2 from '../components/Hero/Hero2';
import Collaboration from '../components/Collaboration';
import Roadmap from '../components/Roadmap';
import Collaboration2 from '../components/Collaboration2';
import Navbar from '../components/NavBar/NavBar';
const Home = () => {
  return (
    <>

    <Navbar> </Navbar>

        <Hero2></Hero2>

      <Collaboration></Collaboration>
     <Roadmap></Roadmap>

   

        <Collaboration2 />

  
    
   


    
    </>
  )
}

export default Home
