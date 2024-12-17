import React, { useState, useRef } from 'react';
import { validCredentials } from '../utils/credentials'; // Importamos las credenciales
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';

const RoadMapTech = () => {
  const [usuario, setUsuario] = useState('');
  const [nivel, setNivel] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [realname, setRealname] = useState('');
  const [userImage, setUserImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const containerRefs = useRef([]);

  // Función para verificar las credenciales
  const handleLogin = (usuario, password) => {
    const validUser = validCredentials.find(user => user.usuario === usuario && user.password === password);
    
    if (validUser) {
      setRealname(validUser.realname);
      setUserImage(validUser.img);
      setMostrarComponente(true); // Se muestra el componente cuando la autenticación es correcta
    } else {
      setErrorMessage('Credenciales inválidas'); // Mensaje de error si las credenciales son incorrectas
    }
  };

  return (
    <div className="container">
      {/* Mostrar mensaje de error si las credenciales son incorrectas */}
      {errorMessage && <div className="error">{errorMessage}</div>}
      
      {/* Formulario de login */}
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        placeholder="Usuario"
      />
      <input
        type="password"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={() => handleLogin(usuario, codigo)}>Iniciar sesión</button>
      
      {/* Mostrar información del usuario si está autenticado */}
      {mostrarComponente && (
        <div>
          <h2>Bienvenido, {realname}</h2>
          <img src={userImage} alt="Usuario" />
          {/* Aquí puedes colocar los componentes que deseas mostrar cuando el usuario esté autenticado */}
        </div>
      )}
      
      {/* El resto de tu componente sigue aquí */}
      <ContainerRoad />
      <Sidebar visible={isSidebarVisible} />
      <DefaultView />
    </div>
  );
};

export default RoadMapTech;
