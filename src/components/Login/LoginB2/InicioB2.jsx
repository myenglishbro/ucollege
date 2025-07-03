import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapB2 from '../../../pages/RoadMapB2';
import landingDataB2 from "../../../utils/datalanding/dataLandingB2.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataB2.bgImage 
const robotImage = landingDataB2.robotImage 

export default function InicioB2() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataB2} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B2"
        />
      )}
      {fase === 'roadmap' && <RoadMapB2 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
