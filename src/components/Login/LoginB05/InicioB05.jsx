import React, { useState } from 'react';
import LandingFuturista from '../../LandingCourse/LandingFuturista';
import LoginUniversal from '../LoginUniversal'; // Universal!
import RoadMapB05 from '../../../pages/ROADMAPS/RoadMapB05';
import landingDataB05 from "../../../utils/datalanding/dataLandingB05.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';
import { validCredentialsB05 } from "../../../utils/credentialsB05";

// Opcional: trae las imágenes desde el JSON o un archivo por nivel
const bgImage = landingDataB05.bgImage 
const robotImage = landingDataB05.robotImage 

export default function InicioB05() {
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
      {fase === 'landing' && <LandingFuturista {...landingDataB05} onAccessClick={handleAccessClick} />}
      {fase === 'login' && (
        <LoginUniversal
          onLoginSuccess={handleLoginSuccess}
          validCredentials={validCredentialsB05}
          backgroundImage={bgImage}
          robotImage={robotImage}
          title="Inicia sesión B05"
        />
      )}
      {fase === 'roadmap' && <RoadMapB05 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
