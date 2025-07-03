import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginFormCelpip from './LoginFormCelpip';
import landingDataCelpip from "../../../utils/datalanding/dataLandingCelpip.json";
import RoadMapCelpip from '../../../pages/RoadMapCelpip';

export default function InicioCelpip() {
  const [fase, setFase] = useState('landing');
  const [userCredential, setUserCredential] = useState(null);
  const [userPassword, setUserPassword] = useState('');

  // Paso 1: Bienvenida → Login
  const handleAccessClick = () => setFase('login');

  // Paso 2: Login exitoso → Roadmap
  const handleLoginSuccess = (credential, password) => {
    setUserCredential(credential);
    setUserPassword(password);
    setFase('roadmap');
  };

  // Renderiza según fase
  if (fase === 'landing') {
    return <LandingFuturista {...landingDataCelpip} onAccessClick={handleAccessClick} />;
  }
  if (fase === 'login') {
    return <LoginFormCelpip onLoginSuccess={handleLoginSuccess} />;
  }
  if (fase === 'roadmap') {
    return (
      <RoadMapCelpip
        userCredential={userCredential}
        userPassword={userPassword}
      />
    );
  }
  return null;
}
