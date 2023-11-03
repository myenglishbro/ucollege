

import styles from "./style";
import "./index.css"


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

import Abbreviations from "./pages/Abbreviations";
import EachEvery from "./pages/EachEvery";
import WhereInWhichWherein from "./pages/WhereInWhichWherein";
import ContainerPortal from "./pages/ContainerPortal";
import Article from "./pages/Article";
import FalseFriends from "./pages/FalseFriends";
import HospitalityAndTour from "./pages/HospitalityAndTour";
import SuffixinEnglish01 from "./pages/SuffixinEnglish01";
import SuffixinEnglish02 from "./pages/SuffixinEnglish02";
import EF from "./pages/EF";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import RoadMapMed from "./pages/RoadMapMed";

function App() {
  return (
    

<div className="bg-primary w-full overflow-hidden">
<div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
        
        <Navbar/>
        </div>
      </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Horario" element={<Horario />}></Route>
          <Route path="/Precios" element={<Precios />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/Clases" element={<Clases />}></Route>
          <Route path="/RoadMap" element={<RoadMap />}></Route>
          <Route path="/RoadMapMed" element={<RoadMapMed />}></Route>

          <Route path="/PoliticasClase" element={<PoliticasClase />}></Route>
          <Route path="/Pagos" element={<Pagos />}></Route>
          <Route path="/MyPortal" element={<ContainerPortal />}></Route>
          <Route path="/Certificacion" element={<EF />}></Route>
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
      

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {/* <Stats />
        <Business />
        <Billing />
        <CardDeal />
        <Testimonials />
        <Clients />
        <CTA /> */}
        <Footer />
      </div>
    </div>
  </div>
      
   
  );
}

export default App;
