import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { FcHome } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";


import Home from "./pages/Home";
import Clases from "./pages/Clases";

import About from "./pages/About";
import Store from "./pages/Store";
import { Route, Routes } from "react-router-dom";
import Horario from "./pages/Horario";
import RoadMap from "./pages/RoadMap";
import PhrasesAtWork from "./pages/PhrasesAtWork";
import PhrasesNative from "./pages/PhrasesNative";
import ErroresB2 from "./pages/ErroresB2";
import Precios from "./pages/Precios";
import Interviewquestions from "./pages/Interviewquestions";
import Preliminary from "./pages/Preliminary";
import Errores10 from "./pages/Errores10";

const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <FcHome />,
  },
  {
    title: "About",
    path: "/About",
    icon: <FcLike />,
  },
  {
    title: "Horario",
    path: "/Horario",
    icon: <FcPlanner />,
  },
  {
    title: "Precios",
    path: "/Precios",
    icon: <FcCurrencyExchange />,
  },
  {
    title: "Store",
    path: "/Store",
    icon: <FcShop />,
  },
  {
    title: "Clases",
    path: "/Clases",
    icon: <FcRules />,
  },
  {
    title: "RoadMap",
    path: "/RoadMap",
    icon: <FcRules />,

  }
];
function App() {
  return (
    <>
      <NavBar navLinks={navLinks}></NavBar>
      <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Horario" element={<Horario />}></Route>
          <Route path="/Precios" element={<Precios />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/Clases" element={<Clases />}></Route>
          <Route path="/RoadMap" element={<RoadMap />}></Route>
          <Route path="/PhrasesAtWork" element={<PhrasesAtWork />}></Route>
          <Route path="/PhrasesNative" element={<PhrasesNative />}></Route>
          <Route path="/ErroresB2" element={<ErroresB2 />}></Route>
          <Route path="/Interviewquestions" element={<Interviewquestions />}></Route>
          <Route path="/Preliminary" element={<Preliminary />}></Route>
          <Route path="/Errores10" element={<Errores10 />}></Route>





        </Routes>
      </div>
    </>
  );
}

export default App;
