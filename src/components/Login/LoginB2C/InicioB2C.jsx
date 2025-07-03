import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapB2C from '../../../pages/RoadMapB2C';
import landingDataB2C from "../../../utils/datalanding/dataLandingB2C.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataB2C.bgImage 
const robotImage = landingDataB2C.robotImage 

export default function InicioB2C() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataB2C} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B2"
        />
      )}
      {fase === 'roadmap' && <RoadMapB2C userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
