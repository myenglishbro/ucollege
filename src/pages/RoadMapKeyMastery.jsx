import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadMk } from "../utils/roadMk";
import Navbar from './myenglishbro/components/NavBar';
import LoginLibro from './LoginLibro';
import SidebarBook from '../components/SidebarBook';

const RoadMapKeyMastery = () => {
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [nivel, setNivel] = useState('');
  const [codigo, setCodigo] = useState('');
  const [realname, setRealname] = useState('');
  const [userImage, setUserImage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
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

  const handleLoginSuccess = (userCredential, userPassword) => {
    setMostrarComponente(true);
    setRealname(userCredential.realname);
    setUserImage(userCredential.img);
    setExpirationDate(userCredential.expirationDate);
    setNivel(userCredential.nivel);
    setCodigo(userPassword);
    setShowWelcomePopup(true); // mostrar el popup de bienvenida tras login
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
      <Navbar />
      {!mostrarComponente ? (
        <LoginLibro onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          {/* <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button> */}

          <SidebarBook
            road={roadMk}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
          />

          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadMk[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname}
              nivel={nivel}
              expirationDate={expirationDate}
              userImage={userImage}
            />
          ) : null}

          {showWelcomePopup && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setShowWelcomePopup(false)}
            >
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-8 shadow-lg text-center max-w-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-white text-2xl font-bold mb-4">
                  👋 Welcome to the Key Word Transformation Mastery Roadmap
                </h2>
                <p className="text-gray-300 mb-4">
                  Explore your virtual resources, unlock epic content, and level up your grammar transformation skills.
                </p>
                <p className="text-sm text-gray-400 mb-6">
                  Select a module from the sidebar to begin your journey.
                </p>
                <button
                  onClick={() => setShowWelcomePopup(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
                >
                  Start Learning
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RoadMapKeyMastery;
