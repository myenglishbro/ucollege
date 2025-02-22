import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadA1 } from "../utils/roadA1";
import { validCredentialsa1 } from '../utils/credentialsA1'; // Importa desde el archivo

import Sidebar from '../../../components/Sidebar';
import Banner from '../../Banner';
import DefaultView from '../components/DefaultView';

const RoadMapB = () => {
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
    const userCredential = validCredentialsa1.find(
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
        <div className="flex justify-center items-center bg-gray-900 min-h-screen p-4 mt-11">
          <div className="w-full max-w-2xl bg-[#13131a] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="w-full md:w-1/2 relative">
              <a href="https://learnibox.vercel.app/Inglesconelprofejuan" className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
                LearniBox
              </a>
              <a
                href="https://myenglishbro-meb.vercel.app/"
                className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors z-10"
              >
                Back to website →
              </a>
              <div className="relative h-full">
                <img
                  src="https://i.ibb.co/dwLzqfBX/Dise-o-sin-t-tulo-10.png"
                  alt="Desert landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900/30"></div>
                <div className="absolute bottom-12 left-12 text-white">
                  <h2 className="text-2xl md:text-4xl font-semibold mb-1">Habla como,</h2>
                  <h2 className="text-2xl md:text-4xl font-semibold">Todo un Nativo </h2>
                </div>
              </div>
            </div>

            {/* Right Section (Login Form) */}
            <div className="w-full md:w-1/2 p-6 md:p-12">
              <div className="max-w-md mx-auto">
                <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">Welcome, Student! 🎓</h1>
                <p className="text-gray-400 mb-8">
                  Enter your credentials below to access your roadmap.
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Username"
                    value={usuario}
                    onChange={handleChangeUsuario}
                    className="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={codigo}
                    onChange={handleChangeCodigo}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-[#1c1c24] text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                  <button
                    type="button"
                    onClick={handleMostrarComponente}
                    className="w-full py-3 bg-purple-600 text-white rounded-lg mt-4"
                  >
                    Access Roadmap
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Forgot your credentials? <a href="https://wa.link/v7v6ga" className="text-white hover:underline">Contact your instructor</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      {mostrarComponente && (
        <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Sidebar
            road={roadA1}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
            realname={realname}
            userImage={userImage}
          />
          <DefaultView
            password={codigo}
            nivel={nivel}
            expirationDate={expirationDate}
            realname={realname}
            userImage={userImage}
          />
          {nivelSeleccionado !== null && (
            <ContainerRoad
              road={[roadA1[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname}
              nivel={nivel}
              expirationDate={expirationDate}
              userImage={userImage}
            />
          )}
        </>
      )}
    </>
  );
};

export default RoadMapB;
