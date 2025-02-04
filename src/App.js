

import styles from "./style";
import "./index.css"


import Home from "./pages/Home";
import Clases from "./pages/Clases";

import About from "./pages/About";
import Store from "./pages/Store";
import { Route, Routes } from "react-router-dom";
import Horario from "./pages/Horario";
import RoadMap from "./pages/RoadMap";
import RoadMapEngine from "./pages/RoadMapEngine";
import RoadMapMix from "./pages/RoadMapMix";
import RoadMapTech from "./pages/RoadMapTech";
import RoadMapHealth from "./pages/RoadMapHealth";
import RoadMapBusiness from "./pages/RoadMapBusiness";


import Precios from "./pages/Precios";

import PoliticasClase from "./pages/PoliticasClase";
import Pagos from "./pages/Pagos";


import ContainerPortal from "./pages/ContainerPortal";


import EF from "./pages/EF";
import Navbar from "./components/NavBar/NavBar";
import RoadMapMed from "./pages/RoadMapMed";
import RoadMapDev from "./pages/RoadMapDev";
import RoadMapCelpip from "./pages/RoadMapCelpip";
import RoadMapEnam from "./pages/RoadMapEnam";
import RoadMapFrench from "./pages/RoadMapFrench";
import RoadMapB2 from "./pages/RoadMapB2";
import RoadMapC1 from "./pages/RoadMapC1";
import RoadMapA1 from "./pages/RoadMapA1";
import RoadMapB1 from "./pages/RoadMapB1";
import Team from "./pages/Team";
import MebLanding from "./pages/myenglishbro/MebLanding";
import IPJLanding from "./pages/inglesconelprofejuan/IPJLanding";
import RoadMapJA1 from "./pages/inglesconelprofejuan/Rutas/RoadMapA1";
import Bilingualwill from "./pages/bilingualwill/Bilingualwill";

function App() {
  return (
    

<div >
<div>
    
        
        <Navbar/>
     
      </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Precios" element={<Precios />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/Team" element={<Team />}></Route>

          <Route path="/RoadMapA1" element={<RoadMapA1 />}></Route>

          <Route path="/RoadMap" element={<RoadMap />}></Route>
          <Route path="/RoadMapB1" element={<RoadMapB1 />}></Route>

          <Route path="/RoadMapB2" element={<RoadMapB2 />}></Route>
          <Route path="/RoadMapC1" element={<RoadMapC1 />}></Route>

          <Route path="/RoadMapFrench" element={<RoadMapFrench />}></Route>

          <Route path="/RoadMapBusiness" element={<RoadMapBusiness />}></Route>
          <Route path="/RoadMapEngine" element={<RoadMapEngine />}></Route>
          <Route path="/RoadMapHealth" element={<RoadMapHealth />}></Route>
          <Route path="/RoadMapMix" element={<RoadMapMix />}></Route>
          <Route path="/RoadMapTech" element={<RoadMapTech />}></Route>
          <Route path="/Celpip" element={<RoadMapCelpip />}></Route>
          <Route path="/Enam" element={<RoadMapEnam />}></Route>

        
        
        
        
          <Route path="/Plataforma" element={<RoadMapJA1 />}></Route>

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
          <Route path="/RoadMapMed" element={<RoadMapMed />}></Route>
          <Route path="/Bootcamp" element={<RoadMapDev />}></Route>

          <Route path="/PoliticasClase" element={<PoliticasClase />}></Route>
          <Route path="/Pagos" element={<Pagos />}></Route>
          <Route path="/MyPortal" element={<ContainerPortal />}></Route>
          <Route path="/Certificacion" element={<EF />}></Route>
          <Route path="/Myenglishbro" element={<MebLanding />}></Route>
          <Route path="/Inglesconelprofejuan" element={<IPJLanding/>}></Route>

          <Route path="/Bilingualwill" element={<Bilingualwill/>}></Route>

          
          

        </Routes>
      

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        
      </div>
    </div>
  </div>
      
   
  );
}

export default App;
