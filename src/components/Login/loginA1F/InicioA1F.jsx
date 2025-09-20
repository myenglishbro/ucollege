// InicioB2CFR.jsx
import React, { useState } from 'react';
import LandingFuturista2 from '../../LandingCourse/LandingFuturista2';
import RoadMapA1F from '../../../pages/ROADMAPS/RoadMapA1F';
import landingDataA1F from "../../../utils/datalanding/dataLandingA1F.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';

export default function InicioA1F() {
  const [fase, setFase] = useState('landing');

  const handleAccessClick = () => setFase('roadmap');

  // ‘guest’ por si RoadMapB2CF/RoadMapGeneric2 usa .nivel
  const GUEST = {
    expirationDate: "05/12/35",
  nivel: "C2",
  usuario: "capolaya",
  password: "mybro",
  realname: "MyEnglishBro!",
  img: "https://i.ibb.co/c3ZvTqW/My-english-bro-Logo-09.png"
  };

  return (
    <>
      <Navbar />
      {fase === 'landing' && (
        <LandingFuturista2 {...landingDataA1F} onAccessClick={handleAccessClick} />
      )}
      {fase === 'roadmap' && (
        <RoadMapA1F userCredential={GUEST} userPassword="" />
      )}
    </>
  );
}
