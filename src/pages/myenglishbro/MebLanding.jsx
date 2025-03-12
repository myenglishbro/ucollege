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
import Collaboration from "./components/Collaboration";

import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Testimonial from "./components/Testimonial";
import Plans from "./components/Plans";
import Slider from "../../components/Slider";
import Navbar from "./components/NavBar";
const MebLanding = () => {
  return (
 <>
 <Navbar></Navbar>
 <Hero></Hero>
 <Slider></Slider>
 <Benefits></Benefits>

{/* <Plans></Plans> */}

  
                    <Collaboration></Collaboration>
                    <Testimonial></Testimonial>
  <Services></Services>
  <Pricing></Pricing>
  <Roadmap></Roadmap>
  
  <Footer></Footer>

</>
  );
};

export default MebLanding;
