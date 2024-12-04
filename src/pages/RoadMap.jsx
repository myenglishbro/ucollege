import React, { useState, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import { road } from "../utils/road";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';

const RoadMap = () => {
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

  const validCredentials = [
    {
      nivel: "A2 Básico",
      usuario: 'titooshiro',
      password: 'titooshiro2024',
      realname: 'Alberto Oshiro',
      img: 'https://i.ibb.co/2y3PPmL/247917193-940684856635710-168362.png',
    },
    { usuario: 'celestesalvatierra', password: 'password1', realname: 'Celeste Salvatierra', img:'https://th.bing.com/th/id/OIP.i5p4mQm3eDTw7EhrOo1jiQHaHa?rs=1&pid=ImgDetMain'},
      { nivel:"CELPIP",usuario: 'udemy', password: 'repositorio', realname: ' Autodidacta', img: '' }, // No image
      { usuario: 'KABEZINI', password: '@47830274S', realname: 'JUAN EDUARDO AYLAS INCISO', img: 'https://i.ibb.co/7bmgdmR/418722130-755683973286212-906722.png' }, // No image
      { usuario: 'JosueRv_24', password: 'jrvchoche', realname: 'Josue Ramirez ツ', img: 'https://i.ibb.co/RNVQ8VZ/OIP-10.jpg' }, // No image
      { usuario: 'andresdesigner', password: 'designer123', realname: 'Andres Jaramillo', img: 'https://i.ibb.co/gTNwpJQ/67d46012622105-63d2bfcf57030.png'  }, // No image
      { usuario: '62023170', password: '10671890', realname: 'Andrea Vargas', img: 'https://i.ibb.co/svCFBwh/d87156c7637fb0b757d3b087f67d92f1.jpg' },
      { usuario: 'leonardoporras', password: 'leopo123', realname: 'Leonardo Perez Porras', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'analimarrufo', password: 'anali84ma', realname: 'Anali Marrufo Huaman', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'marvinmarrufo', password: 'marv84ma', realname: 'Marvin Alexis Marrufo Huamán', img: 'https://i.ibb.co/whkwM9K/436043875-857274965919994-320136.png' }, // No image
      { usuario: 'vanessae', password: 'canadianelt', realname: 'Vanessa Estrada', img: 'https://i.ibb.co/0nJVBvy/416640238-351256941104803-840339.png' }, // No image
      { usuario: 'AniManrique', password: 'Ani1910', realname: 'Anita Manrique Chávez', img: 'https://i.ibb.co/jW5mpyy/463090300-530012092972416-4432276465281113242-n.jpg' }, // No image
      { usuario: 'Ppbergelund', password: 'pppublisher', realname: 'Pedro Bergelund', img: 'https://i.ibb.co/Ks3WrnN/426308282-432260169242381-257610.jpg' }, // No image
      { usuario: 'diegosego', password: 'segovia01', realname: 'Diego Segovia Gómez', img: 'https://i.ibb.co/ssX236w/454630848-467797286163219-647084.png' }, // No image
      { usuario: 'claudioelpro', password: '2219ielts', realname: 'Claudio Justiniano', img: 'https://i.ibb.co/hgHZTND/ALV-Uj-XH77p-Iy-HF4-A6v-ULRw-Kb-ZESWy2-B.png' }, // No image
      { usuario: 'angelbenites', password: 'moncada2024', realname: 'Angel Moisés Benites Moncada', img: 'https://i.ibb.co/3Thj6K0/420613655-1799350083843859-11506.png' }, // No image
      { usuario: 'alison.arapa', password: 'ielts2025', realname: 'alison.arapa', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'jose.tbravo', password: 'ielts2025', realname: 'jose.torres.bravo', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'agnilivi', password: 'agnibal2024', realname: 'Agnibal Livisi', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'cesarh', password: 'hurtado24', realname: 'Cesar Hurtado', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
    
      { usuario: 'josephcerna', password: 'cerna24', realname: 'Joseph Cerna Alfaro', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'ragnarock129', password: 'edison129', realname: 'Edison Johamy Rossel Huaman', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'everttello', password: 'everttello24', realname: 'Evert Tello Melo', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'zaidaz', password: 'zorrilla24', realname: 'Zaida Zorrilla', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'juanp', password: 'aguero24', realname: 'JUAN PABLO AGUERO JAIMES', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'dianah', password: 'dianah24', realname: 'Diana C. Huarcaya', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image

    ];

  const handleChangeUsuario = (event) => setUsuario(event.target.value);
  const handleChangeCodigo = (event) => setCodigo(event.target.value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMostrarComponente();
    }
  };

  const handleMostrarComponente = () => {
    const userCredential = validCredentials.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );

    if (userCredential) {
      setMostrarComponente(true);
      setRealname(userCredential.realname);
      setUserImage(userCredential.img);
      setNivel(userCredential.nivel);
      setErrorMessage('');
    } else {
      setMostrarComponente(false);
      setErrorMessage('La contraseña o usuario es incorrecto.');
    }
  };

  const seleccionarNivel = (index) => {
    setNivelSeleccionado(index);
    scrollToContainer(index);
  };

  const scrollToContainer = (index) => {
    if (containerRefs.current[index]) {
      containerRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <>
      {!mostrarComponente && (
  <div className="py-5 flex justify-center items-center min-h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
      <div className="flex justify-center mb-4">
        <img
          src="https://i.ibb.co/55qqtX6/My-english-bro-Logo-10.png" // URL de tu logo
          alt="Logo"
          className="h-16" // Ajusta el tamaño del logo
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
        Welcome, Student! 🎓
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Enter your credentials below.
      </p>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={usuario}
          onChange={handleChangeUsuario}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={codigo}
          onChange={handleChangeCodigo}
          onKeyPress={handleKeyPress}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 shadow-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errorMessage && (
          <p className="text-red-500 text-xs text-center">
            {errorMessage}
          </p>
        )}
        <button
          type="button"
          onClick={handleMostrarComponente}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Access Roadmap
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        Forgot your credentials? Contact your instructor. ✉️
      </p>
    </div>
  </div>
)}

      {mostrarComponente && (
        <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Sidebar
            road={road}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            className={isSidebarVisible ? 'visible' : ''}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[road[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname}
              nivel={nivel}
              userImage={userImage}
            />
          ) : (
            <DefaultView
              password={codigo}
              realname={realname}
              userImage={userImage}
            />
          )}
        </>
      )}
    </>
  );
};

export default RoadMap;
