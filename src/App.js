import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { FcHome } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { FcRules } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import { FcTimeline } from "react-icons/fc";
import { FcDebt } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";

import { FcApproval } from "react-icons/fc";





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
import Mistakes5 from "./pages/Mistakes5";
import ConfusingWords from "./pages/ConfusingWords";
import Specially from "./pages/Specially";
import ErroresComunes from "./pages/ErroresComunes";
import AvanzadoEnIngles from "./pages/AvanzadoEnIngles";
import StayCalmCashier from "./pages/StayCalmCashier";
import DealingComplaints from "./pages/DealingComplaints";
import CommonIdioms from "./pages/CommonIdioms";
import ShallShould from "./pages/ShallShould";
import ModalVerbs from "./pages/ModalVerbs";
import PoliticasClase from "./pages/PoliticasClase";
import Pagos from "./pages/Pagos";
import Speaking from "./pages/Speaking";
import Abbreviations from "./pages/Abbreviations";
import EachEvery from "./pages/EachEvery";
import WhereInWhichWherein from "./pages/WhereInWhichWherein";
import ContainerPortal from "./pages/ContainerPortal";
import Article from "./pages/Article";
import FalseFriends from "./pages/FalseFriends";
import HospitalityAndTour from "./pages/HospitalityAndTour";
import SuffixinEnglish01 from "./pages/SuffixinEnglish01";
import SuffixinEnglish02 from "./pages/SuffixinEnglish02";
const navLinks = [
  {
    title: "Home",
    path: "/",
    icon: <FcHome />,
  },
  {
    title: "About",
    path: "/About",
    icon: <FcLike />
   
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
    icon: <FcRules />
   
  },
  {
    title: "RoadMap",
    path: "/RoadMap",
    icon: <FcTimeline />,

  },
 
 {
    title: "Career Path",
    path: "/Speaking",
    icon: <FcBusinessman />,
    dropdown: true,
    dropdownLinks: [
      {
        title: "Hospitality",
        path: "/HospitalityAndTour"
      },
      {
        title: "Dentestry",
        path: "/RoadMap"
      },
      {
        title: "Medicine",
        path: "/Clases/Aleman"
      }
    ]
  }
  
  ,
  {
    title: "Student Zone",
    icon: <FcApproval />,
    dropdown: true,
    dropdownLinks: [
      {
        title: "My Portal",
        path: "/MyPortal"
      },
      {
        title: "Horario",
        path: "/Horario",
        icon: <FcPlanner />

      },
      {
        title: "Politicas de Clases",
        path: "/PoliticasClase",
        icon: <FcReading />
    
      },
      {
        title: "Pagos",
        path: "/Pagos",
        icon: <FcDebt />
    
      }
     ,
      {
        title: "Carlos Apolaya",
        path: "https://meb3.vercel.app/"
      }
    ]
    

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
          <Route path="/PoliticasClase" element={<PoliticasClase />}></Route>
          <Route path="/Pagos" element={<Pagos />}></Route>
          <Route path="/Speaking" element={<Speaking />}></Route>
          <Route path="/MyPortal" element={<ContainerPortal />}></Route>


          <Route path="/PhrasesAtWork" element={<PhrasesAtWork />}></Route>
          <Route path="/PhrasesNative" element={<PhrasesNative />}></Route>
          <Route path="/ErroresB2" element={<ErroresB2 />}></Route>
          <Route path="/Interviewquestions" element={<Interviewquestions />}></Route>
          <Route path="/Preliminary" element={<Preliminary />}></Route>
          <Route path="/Errores10" element={<Errores10 />}></Route>
          <Route path="/Mistakes5" element={<Mistakes5 />}></Route>
          <Route path="/ConfusingWords" element={<ConfusingWords />}></Route>
          <Route path="/Specially" element={<Specially />}></Route>
          <Route path="/ErroresComunes" element={<ErroresComunes />}></Route>
          <Route path="/AvanzadoEnIngles" element={<AvanzadoEnIngles />}></Route>

          <Route path="/StayCalmCashier" element={<StayCalmCashier />}></Route>
          <Route path="/DealingComplaints" element={<DealingComplaints />}></Route>
          <Route path="/CommonIdioms" element={<CommonIdioms />}></Route>
          <Route path="/ShallShould" element={<ShallShould />}></Route>
          <Route path="/ModalVerbs" element={<ModalVerbs />}></Route>
          <Route path="/Abbreviations" element={<Abbreviations />}></Route>
          <Route path="/EachEvery" element={<EachEvery />}></Route>
          <Route path="/WhereInWhichWherein" element={<WhereInWhichWherein />}></Route>
          <Route path="/Article" element={<Article />}></Route>

          <Route path="/FalseFriends" element={<FalseFriends />}></Route>

          <Route path="/HospitalityandTour" element={<HospitalityAndTour />}></Route>
          <Route path="/SuffixinEnglish01" element={<SuffixinEnglish01 />}></Route>
          <Route path="/SuffixinEnglish02" element={<SuffixinEnglish02 />}></Route>












        </Routes>
      </div>
    </>
  );
}

export default App;
