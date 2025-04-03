import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadOccupation } from "../utils/roadOccupation";
import { validCredentialsc1 } from '../utils/credentialsc1';
import DefaultView from '../components/DefaultView';
import Banner from './Banner';
import Sidebar2 from '../components/Sidebar2';

const RoadMapOccupation = () => {
  const [usuario, setUsuario] = useState('');
  const [nivel, setNivel] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [realname, setRealname] = useState('');
  const [userImage, setUserImage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewedItems, setViewedItems] = useState([]);
  const containerRefs = useRef([]);

  // Cargar elementos vistos desde localStorage al montar el componente
  useEffect(() => {
    const savedViewedItems = JSON.parse(localStorage.getItem("viewedItems")) || [];
    setViewedItems(savedViewedItems);
  }, []);

  // Guardar los elementos vistos en localStorage cuando cambie viewedItems
  useEffect(() => {
    if (viewedItems.length > 0) {
      localStorage.setItem("viewedItems", JSON.stringify(viewedItems));
    }
  }, [viewedItems]);

  const handleChangeUsuario = (event) => setUsuario(event.target.value);
  const handleChangeCodigo = (event) => setCodigo(event.target.value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMostrarComponente();
    }
  };

  const handleMostrarComponente = () => {
    const userCredential = validCredentialsc1.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );

    if (userCredential) {
      setMostrarComponente(true);
      setRealname(userCredential.realname);
      setUserImage(userCredential.img);
      setExpirationDate(userCredential.expirationDate);
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
        <div className="flex justify-center items-center  bg-gray-100 p-10">
          {/* Contenedor del formulario y el Banner */}
          <div className="flex flex-wrap justify-center gap-8 items-center max-w-6xl mx-auto ">
            {/* Formulario de Login */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm sm:max-w-md mt-11">
              <div className="flex justify-center mb-4">
                <img
                  src="https://i.ibb.co/55qqtX6/My-english-bro-Logo-10.png"
                  alt="Logo"
                  className="h-16"
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
              <p className="text-xs text-gray-500 text-center mt-2">
                Quieres una prueba gratis por 3 días? Contactanos en WhatsApp 📱 
                <a
                  href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  click aquí
                </a>.
              </p>
            </div>
            
            {/* Banner */}
            <div className="w-full max-w-md">
              <Banner />
            </div>
          </div>
        </div>
      )}

      {mostrarComponente && (
        <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Sidebar2
            road={roadOccupation}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadOccupation[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname}
              nivel={nivel}
              expirationDate={expirationDate}
              userImage={userImage}
            />
          ) : (
            <DefaultView
              password={codigo}
              nivel={nivel}
              expirationDate={expirationDate}
              realname={realname}
              userImage={userImage}
            />
          )}
        </>
      )}
    </>
  );
};

export default RoadMapOccupation;
