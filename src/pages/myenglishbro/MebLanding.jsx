import { curve, heroBackground, robot } from "../../asset";
import Button from "./components/Button";
import Section from "./components/Section";
import { BackgroundCircles, BottomLine, Gradient } from "./components/design/Hero";
import { heroIcons } from "./constants";
import { ScrollParallax } from "react-just-parallax";
import { useRef } from "react";
import Generating from "./components/Generating";
import Notification from "./components/Notification";
import CompanyLogos from "./components/CompanyLogos";

import Benefits from "./components/Benefits";

import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
const MebLanding = () => {
  return (
 <>
 <Navbar></Navbar>
 <Hero></Hero>
 <Benefits></Benefits>
  
  
  <Footer></Footer>

</>
  );
};

export default MebLanding;
