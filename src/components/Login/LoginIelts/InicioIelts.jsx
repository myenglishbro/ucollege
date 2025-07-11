import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import landingDataIelts from "../../../utils/datalanding/dataLandingIelts.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";
import RoadMapIelts from '../../../pages/RoadMapIelts';

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataIelts.bgImage ;
const robotImage = landingDataIelts.robotImage ;

export default function InicioC() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataIelts} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión Ielts"
        />
      )}
      {fase === 'roadmap' && <RoadMapIelts userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
