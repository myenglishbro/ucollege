import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapB1 from '../../../pages/RoadMapB1';
import landingDataB1 from "../../../utils/datalanding/dataLandingB1.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataB1.bgImage ;
const robotImage = landingDataB1.robotImage ;

export default function InicioB1() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataB1} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B1"
        />
      )}
      {fase === 'roadmap' && <RoadMapB1 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
