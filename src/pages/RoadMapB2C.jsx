import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadB2C } from "../utils/roadB2C";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';
import Navbar from './myenglishbro/components/NavBar';
import LoginFormB2C from './LoginFormB2C';

const RoadMapB2C = () => {
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [nivel, setNivel] = useState('');
  const [codigo, setCodigo] = useState('');
  const [realname, setRealname] = useState('');
  const [userImage, setUserImage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showToolboxPopup, setShowToolboxPopup] = useState(false);
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
        <LoginFormB2C onLoginSuccess={handleLoginSuccess} />
      ) : (
        <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>

          <Sidebar
            road={roadB2C}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            viewedItems={viewedItems}
            setViewedItems={setViewedItems}
            className={isSidebarVisible ? 'visible' : ''}
          />

          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadB2C[nivelSeleccionado]]}
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

          {/* ➕ Botón flotante */}
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowToolboxPopup(true)}
              className="w-14 h-14 rounded-full bg-indigo-700 text-white text-3xl flex items-center justify-center shadow-lg hover:bg-indigo-800 transition duration-300"
              title="Abrir recurso"
            >
              +
            </button>
          </div>

          {/* 🧰 Modal con iframe */}
          {showToolboxPopup && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <div className="bg-white w-[90%] max-w-4xl h-[80%] rounded-xl shadow-xl relative overflow-hidden">
                <button
                  onClick={() => setShowToolboxPopup(false)}
                  className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl z-10"
                >
                  ✖
                </button>
                <iframe
                  src="https://learnibox.vercel.app/xd"
                  title="Learnibox XD"
                  className="w-full h-full border-none"
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RoadMapB2C;
