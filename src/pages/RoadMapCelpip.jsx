import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';
import Banner from './Banner';
import { roadcelpip } from "../utils/roadcelpip";
import { validCredentials } from '../utils/credentials'; // Importa desde un archivo centralizado

const RoadMapCelpip = () => {
  const [usuario, setUsuario] = useState('');
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
      { !mostrarComponente && (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen p-6 mt-11">
        <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-300">
          
          {/* Left Section */}
          <div className="w-full md:w-1/2 relative">
            <a href="#" className="absolute top-6 left-6 text-White-600 text-2xl font-bold z-10">
              CELPIP 
            </a>
            <a
              href="https://myenglishbro-meb.vercel.app/"
              className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm hover:bg-red-700 transition-colors z-10"
            >
              Back to website →
            </a>
            <div className="relative h-full">
              <img
                src="https://i.ibb.co/C3c0r25P/file-Vpw-W8msid-NWv-Rrnzp642wk.png"
                alt="CELPIP Exam Setting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-red-700/50"></div>
              <div className="absolute bottom-12 left-8 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Path to Success</h2>
                <h2 className="text-xl md:text-2xl font-medium">Excel in your CELPIP journey!</h2>
              </div>
            </div>
          </div>
          
          {/* Right Section (Login Form) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-50">
            <div className="max-w-md mx-auto">
              <h1 className="text-red-600 text-3xl md:text-4xl font-bold mb-4">Welcome, Candidate!🍁</h1>
              <p className="text-gray-700 mb-6">Enter your credentials below to access your CELPIP preparation roadmap.</p>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={usuario}
                  onChange={handleChangeUsuario}
                  className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={codigo}
                  onChange={handleChangeCodigo}
                  onKeyPress={handleKeyPress}
                  className="w-full bg-white border border-gray-300 text-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                <button
                  type="button"
                  onClick={handleMostrarComponente}
                  className="w-full py-3 bg-red-600 text-white rounded-lg mt-4 hover:bg-red-700 transition-colors"
                >
                  Access Roadmap
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Forgot your credentials? <a href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82" className="text-red-600 hover:underline">Contact your instructor</a>.
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
            road={roadcelpip}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadcelpip[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname}
              expirationDate={expirationDate}
              userImage={userImage}
            />
          ) : (
            <DefaultView
              password={codigo}
              realname={realname}
              expirationDate={expirationDate}
              userImage={userImage}
            />
          )}
        </>
      )}
    </>
  );
};

export default RoadMapCelpip;
