// InicioB2CFR.jsx
import React, { useState } from 'react';
import LandingFuturista2 from '../../LandingCourse/LandingFuturista2';
import RoadMapB2CF from '../../../pages/ROADMAPS/RoadMapB2CF';
import landingDataB2CF from "../../../utils/datalanding/dataLandingB2CF.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';

export default function InicioB2CFR() {
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
        <LandingFuturista2 {...landingDataB2CF} onAccessClick={handleAccessClick} />
      )}
      {fase === 'roadmap' && (
        <RoadMapB2CF userCredential={GUEST} userPassword="" />
      )}
    </>
  );
}
