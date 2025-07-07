import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapIt from '../../../pages/RoadMapIt';
import landingDataIt from "../../../utils/datalanding/dataLandingIt.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentials } from "../../../utils/credentials";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataIt.bgImage ;
const robotImage = landingDataIt.robotImage ;

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
      {fase === 'landing' && <LandingFuturista {...landingDataIt} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentials}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión It"
        />
      )}
      {fase === 'roadmap' && <RoadMapIt userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
