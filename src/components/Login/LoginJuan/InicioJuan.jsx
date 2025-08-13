import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import { validCredentialsa1 } from "../../../utils/credentialsA1Juan";
import RoadMapJuan from '../../../pages/RoadMapJuan';
import landingDataJuan from "../../../utils/datalanding/dataLandingjuan.json";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataJuan.bgImage ;
const robotImage =landingDataJuan.robotImage ;

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
     
      {fase === 'landing' && <LandingFuturista {...landingDataJuan} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentialsa1}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión Juan"
        />
      )}
      {fase === 'roadmap' && <RoadMapJuan userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
