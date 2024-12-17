import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadtech } from "../utils/roadtech"; // Aquí puedes tener un mapa de rutas relacionado con tecnología
import { validCredentials } from '../utils/credentials'; // Importa las credenciales válidas

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
    const userCredential = validCredentials.find(
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
        <div className="py-5 flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="flex justify-center mb-4">
              <img
                src="https://i.ibb.co/55qqtX6/My-english-bro-Logo-10.png"
                alt="Logo"
                className="h-16"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Welcome, Tech Student! 🎓
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
                Access Tech Roadmap
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
            road={roadtech}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadtech[nivelSeleccionado]]}
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

export default RoadMapTech;
