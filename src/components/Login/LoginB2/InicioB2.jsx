import React, { useState } from 'react';
import LandingFuturista from '../LandingFuturista';
import LoginFormB2 from './LoginFormB2';
import landingDataB2 from "../../../utils/datalanding/dataLandingB2.json";
import RoadMapB2 from '../../../pages/RoadMapB2';

export default function InicioB2() {
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
    return <LandingFuturista {...landingDataB2} onAccessClick={handleAccessClick} />;
  }
  if (fase === 'login') {
    return <LoginFormB2 onLoginSuccess={handleLoginSuccess} />;
  }
  if (fase === 'roadmap') {
    return (
      <RoadMapB2
        userCredential={userCredential}
        userPassword={userPassword}
      />
    );
  }
  return null;
}
