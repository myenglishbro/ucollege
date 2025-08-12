import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapB2CF from '../../../pages/ROADMAPS/RoadMapB2CF';
import landingDataB2CF from "../../../utils/datalanding/dataLandingB2CF.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentialsfree } from "../../../utils/credentialsfree";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataB2CF.bgImage 
const robotImage = landingDataB2CF.robotImage 

export default function InicioB2CFR() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataB2CF} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentialsfree}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B2 FREE"
        />
      )}
      {fase === 'roadmap' && <RoadMapB2CF userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
