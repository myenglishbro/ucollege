import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapA2 from '../../../pages/ROADMAPS/RoadMapA2';
import landingDataA2 from "../../../utils/datalanding/dataLandingA2.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataA2.bgImage ;
const robotImage = landingDataA2.robotImage ;

export default function InicioA1() {
  const [fase, setFase] = useState('landing');
  const [userCredential, setUserCredential] = useState(null);
  const [userPassword, setUserPassword] = useState('');

  const handleAccessClick = () => setFase('login');
  const handleLoginSuccess = (credential, password) => {
    setUserCredential(credential);
    setUserPassword(password);
    setFase('roadmap');
  };

  return (
    <>
      <Navbar />
      {fase === 'landing' && <LandingFuturista {...landingDataA2} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión A2"
        />
      )}
      {fase === 'roadmap' && <RoadMapA2 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
