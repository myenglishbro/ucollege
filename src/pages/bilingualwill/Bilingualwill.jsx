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
import Collaboration2 from "./components/Collaboration2";
import Politicas from "./components/Politicas";
import Horario from "../Horario";
import ImageSlider from "./components/ImageSlider";
const Bilingualwill = () => {
  return (
 <>
 <Hero></Hero>

<Plans></Plans>
<ImageSlider></ImageSlider>

<Collaboration2></Collaboration2>
<Politicas></Politicas>
  <Benefits></Benefits>
                    {/* <Collaboration></Collaboration> */}
                    {/* <Testimonial></Testimonial> */}
  {/* <Services></Services> */}
  {/* <Pricing></Pricing> */}
  {/* <Roadmap></Roadmap> */}
  <Footer></Footer>
</>
  );
};

export default Bilingualwill;
