import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapC1 from '../../../pages/RoadMapC1';
import landingDataC1 from "../../../utils/datalanding/dataLandingC1.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentialsc1 } from "../../../utils/credentialsc1";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataC1.bgImage 
const robotImage = landingDataC1.robotImage 

export default function InicioC1() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataC1} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentialsc1}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B2"
        />
      )}
      {fase === 'roadmap' && <RoadMapC1 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
