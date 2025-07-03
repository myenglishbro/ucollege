import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginFormA1 from './LoginFormA1';
import RoadMapA1 from '../../../pages/RoadMapA1';
import landingDataA1 from "../../../utils/datalanding/dataLandingA1.json";
import Navbar from '../../../pages/myenglishbro/components/NavBar';

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
      {fase === 'landing' && <LandingFuturista {...landingDataA1} onAccessClick={handleAccessClick} />}
      {fase === 'login' && <LoginFormA1 onLoginSuccess={handleLoginSuccess} />}
      {fase === 'roadmap' && <RoadMapA1 userCredential={userCredential} userPassword={userPassword} />}
    </>
  );
}
