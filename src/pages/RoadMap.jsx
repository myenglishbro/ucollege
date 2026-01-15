import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { road } from "../utils/road";
import { validCredentials } from '../utils/credentials';

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
  const [expirationDate, setExpirationDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [viewedItems, setViewedItems] = useState([]);
  const containerRefs = useRef([]);

  useEffect(() => {
    const savedViewedItems = JSON.parse(localStorage.getItem("viewedItems")) || [];
    setViewedItems(savedViewedItems);
  }, []);

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
      setNivel(userCredential.nivel);
      setRealname(userCredential.realname);  // Asignamos realname
      setUserImage(userCredential.img);      // Asignamos userImage
      setExpirationDate(userCredential.expirationDate);  // Asignamos expirationDate
      console.log("Datos actualizados:", { realname, userImage, expirationDate });  // Verifica si los datos son correctos
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
              <a href="https://myenglishbro-meb.vercel.app/" className="absolute top-6 left-6 text-white text-2xl font-bold z-10">
                Meb
              </a>
              <a
                href="https://myenglishbro-meb.vercel.app/"
                className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors z-10"
              >
                Back to website →
              </a>
              <div className="relative h-full">
                <img
                  src="https://i.ibb.co/xsvgj3w/193023986-1232091603876509-8530458296279193537-n-copia.jpg"
                  alt="Desert landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900/30"></div>
                <div className="absolute bottom-12 left-12 text-white">
                  <h2 className="text-2xl md:text-4xl font-semibold mb-2">Ruta de Aprendizaje,</h2>
                  <h2 className="text-2xl md:text-4xl font-semibold">A2</h2>
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
                  Forgot your credentials? <a href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82" className="text-white hover:underline">Contact your instructor</a>.
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
            road={road}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
           
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
              road={[road[nivelSeleccionado]]}
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

export default RoadMap;
