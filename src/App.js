

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
import RoadMapHealth from "./pages/RoadMapHealth";
import RoadMapBusiness from "./pages/RoadMapBusiness";


import Precios from "./pages/Precios";

import PoliticasClase from "./pages/PoliticasClase";
import Pagos from "./pages/Pagos";


import ContainerPortal from "./pages/ContainerPortal";


import EF from "./pages/EF";
import RoadMapMed from "./pages/RoadMapMed";
import RoadMapDev from "./pages/RoadMapDev";
import RoadMapEnam from "./pages/RoadMapEnam";
import RoadMapFrench from "./pages/RoadMapFrench";
import RoadMapC1 from "./pages/RoadMapC1";
import Team from "./pages/Team";
import MebLanding from "./pages/myenglishbro/MebLanding";
import IPJLanding from "./pages/inglesconelprofejuan/IPJLanding";
import RoadMapJA1 from "./pages/inglesconelprofejuan/Rutas/RoadMapA1";
import Bilingualwill from "./pages/bilingualwill/Bilingualwill";
import RoadMapB from "./pages/bilingualwill/Rutas/RoadMapB";
import CambridgeExam from "./pages/CambridgeExam";
import Certificate from "./pages/Certificate";
import RoadMapC2 from "./pages/RoadMapC2";
import RoadMapUoe from "./pages/RoadMapUoe";
import RoadMapEg from "./pages/RoadMapEg";
import RoadMapB2CF from "./pages/RoadMapB2CF";
import TextFileUploader from "./components/WriteQuiz";
import GrammarSpaceDefender from "./components/MultipleChoiceTrainer";
import GrammarMazeRunner from "./components/GrammarCodeQuest";
import GrammarCodeQuest from "./components/GrammarCodeQuest";
import GrammarGlassBridge from "./components/FightingGrammar";
import FightingGrammar from "./components/FightingGrammar";
import EncryptTextUploader from "./components/EncryptTextUploader";
import KeywordTransformerTrainer from "./components/KeywordTransformerTrainer";
import CambridgeEncryptor from "./components/CambridgeEncryptor";
import TrainingCenter from "./components/TrainingCenter";
import TxtEncryptor from "./components/TxtEncryptor";
import MultipleChoiceTrainer from "./components/MultipleChoiceTrainer";
import GappedTextQuizUploader from "./components/GappedTextQuizUploader";
import ReadingEn from "./components/ReadingEn";
import WriteQuiz from "./components/WriteQuiz";
import TypeQuiz from "./components/SixtyType.jsx";
import WordReorderGame from "./components/WordReorderGame";
import AudioListeningQuiz from "./components/AudioListeningQuiz";
import ConversationPracticeBot from "./components/ConversationPracticeBot.jsx";
import CreativeSlides from "./components/CreativeSlides.jsx";
import AttendanceTracker from "./components/AttendanceTracker.jsx";
import ReporteMensual from "./components/ReporteMensual.jsx";
import EducationalAppsShowcase from "./components/EducationalAppsShowcase.jsx";
import SixtyType from "./components/SixtyType.jsx";
import RoadMapKeyMastery from "./pages/RoadMapKeyMastery.jsx";
import InicioA1 from "./components/Login/LoginA1/InicioA1.jsx";
import InicioB2 from "./components/Login/LoginB2/InicioB2.jsx";
import InicioiT from "./components/Login/LoginIt/InicioIt.jsx";
import IniciobB1 from "./components/Login/LoginB1/InicioB1.jsx";
import InicioB2C from "./components/Login/LoginB2C/InicioB2C.jsx";
import InicioC from "./components/Login/LoginCelpip/InicioCelpip.jsx";
import CELPIPSpeaking from "./components/Speaking/CELPIPSpeaking.jsx";
import CELPIPSpeaking2 from "./components/Speaking/CELPIPSpeaking2.jsx";
import CELPIPSpeaking3 from "./components/Speaking/CELPIPSpeaking3.jsx";
import CELPIPSpeaking4 from "./components/Speaking/CELPIPSpeaking4.jsx";
import Quizbank01Enhanced from "./components/Aplicativos/Quizer/Quizbank01.jsx";
import Quizbank01 from "./components/Aplicativos/Quizer/Quizbank01.jsx";
import InicioIelts from "./components/Login/LoginIelts/InicioIelts.jsx";
import UseOfEnglishSimulator from "./components/SimulatorB2/UseOfEnglishSimulator.jsx";
import KeywordTransformation from "./components/Aplicativos/kwt/KeywordTransformation.jsx";
import InicioC1 from "./components/Login/LoginC1/InicioC1.jsx";
import MultiLevelQuiz3 from "./components/Aplicativos/multiplechoicecloze/Multilevelquiz3.jsx";
import MultiLevelQuiz4 from "./components/Aplicativos/devs/Multilevelquiz4.jsx";
import Desafio01 from "./components/Aplicativos/presentsimpleduo/Desafio01.jsx";
import Desafio02 from "./components/Aplicativos/pastsimpleperfect/Desafio02.jsx";
import UseOfEnglishInline from "./components/Aplicativos/uoe1/UseOfEnglishInline.jsx";
import UseOfEnglishInline2 from "./components/Aplicativos/uoe2/UseOfEnglishInline2.jsx";

function App() {
  return (
    

<div >

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Precios" element={<Precios />}></Route>
          <Route path="/Store" element={<Store />}></Route>
          <Route path="/Team" element={<Team />}></Route>

          <Route path="/A1" element={<InicioA1 />}></Route>
          <Route path="/B1" element={<IniciobB1 />}></Route>
          <Route path="/ielts" element={<InicioIelts />}></Route>

          <Route path="/B2" element={<InicioB2 />}></Route>
         <Route path="/B2C" element={<InicioB2C />}></Route>
                  <Route path="/C1" element={<InicioC1 />}></Route>

          <Route path="/valere" element={<InicioiT />}></Route>
          <Route path="/108pv" element={<Quizbank01 />}></Route>
          <Route path="/simulator" element={<UseOfEnglishSimulator />}></Route>
          <Route path="/presentsimpleprogressive" element={<Desafio01 />}></Route>
          <Route path="/pastsimpleperfect" element={<Desafio02 />}></Route>
          <Route path="/uoe1" element={<UseOfEnglishInline />}></Route>
          <Route path="/uoe2" element={<UseOfEnglishInline2 />}></Route>

          <Route path="/multiplechoice" element={<MultiLevelQuiz3 />}></Route>
          <Route path="/devs" element={<MultiLevelQuiz4 />}></Route>

          <Route path="/Celpip" element={<InicioC />}></Route>
          <Route path="/task01" element={<CELPIPSpeaking />}></Route>
          <Route path="/task02" element={<CELPIPSpeaking2 />}></Route>
          <Route path="/task03" element={<CELPIPSpeaking3 />}></Route>
          <Route path="/task04" element={<CELPIPSpeaking4 />}></Route>

          <Route path="/RoadMap" element={<RoadMap />}></Route>
          <Route path="/CambridgeExam" element={<CambridgeExam />}></Route>
          <Route path="/KeywordMastery" element={<RoadMapKeyMastery />}></Route>

          <Route path="/RoadMapB2CFREE" element={<RoadMapB2CF />}></Route>

          <Route path="/RoadMapC1" element={<RoadMapC1 />}></Route>
          <Route path="/RoadMapC2" element={<RoadMapC2 />}></Route>
          <Route path="/RoadMapUoe" element={<RoadMapUoe />}></Route>
          <Route path="/RoadMapEg" element={<RoadMapEg />}></Route>

          <Route path="/RoadMapFrench" element={<RoadMapFrench />}></Route>

          <Route path="/RoadMapBusiness" element={<RoadMapBusiness />}></Route>
          <Route path="/RoadMapEngine" element={<RoadMapEngine />}></Route>
          <Route path="/RoadMapHealth" element={<RoadMapHealth />}></Route>
          <Route path="/RoadMapMix" element={<RoadMapMix />}></Route>
          <Route path="/Enam" element={<RoadMapEnam />}></Route>
          <Route path="/Certificate" element={<Certificate />}></Route>
          <Route path="/xd" element={<EducationalAppsShowcase  />}></Route>

          <Route path="/sixtytype" element={<SixtyType  />}></Route>
          <Route path="/mct" element={<MultipleChoiceTrainer  />}></Route>
          <Route path="/wo" element={<WordReorderGame  />}></Route>
          <Route path="/audio" element={<AudioListeningQuiz  />}></Route>
          <Route path="/conversa" element={<ConversationPracticeBot  />}></Route>
          <Route path="/slides" element={<CreativeSlides  />}></Route>
          <Route path="/attendance" element={<AttendanceTracker  />}></Route>
          <Route path="/report-attendance" element={<ReporteMensual  />}></Route>

                  <Route path="/maze" element={<GrammarCodeQuest  />}></Route>

                          <Route path="/fight" element={<FightingGrammar  />}></Route>
                  <Route path="/kwt" element={<KeywordTransformerTrainer  />}></Route>
                  <Route path="/tc" element={<TrainingCenter  />}></Route>
                  <Route path="/gt" element={<GappedTextQuizUploader  />}></Route>
                  <Route path="/keysimulation" element={<KeywordTransformation  />}></Route>

                  <Route path="/encripreguntarespuesta" element={<EncryptTextUploader  />}></Route>
                  <Route path="/encrikeyword" element={<CambridgeEncryptor  />}></Route>
                  <Route path="/encri3" element={<TxtEncryptor  />}></Route>
                  <Route path="/readingencriptador" element={<ReadingEn  />}></Route>

          <Route path="/Plataforma" element={<RoadMapJA1 />}></Route>
          <Route path="/PlataformaB" element={<RoadMapB />}></Route>

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
          <Route path="/RoadMapMed" element={<RoadMapMed />}></Route>
          <Route path="/Bootcamp" element={<RoadMapDev />}></Route>

          <Route path="/PoliticasClase" element={<PoliticasClase />}></Route>
          <Route path="/Pagos" element={<Pagos />}></Route>
          <Route path="/MyPortal" element={<ContainerPortal />}></Route>
          <Route path="/Certificacion" element={<EF />}></Route>
          <Route path="/Myenglishbro" element={<MebLanding />}></Route>
          <Route path="/Inglesconelprofejuan" element={<IPJLanding/>}></Route>

          <Route path="/Bilingualwill2" element={<Bilingualwill/>}></Route>

          
          

        </Routes>
      

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        
      </div>
    </div>
  </div>
      
   
  );
}

export default App;
