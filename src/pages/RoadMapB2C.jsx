import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadB2C } from "../utils/roadB2C";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';
import Step from '../components/Step';
import Navbar from './myenglishbro/components/NavBar';
import LoginForm from './LoginForm';
import CabezeraB2 from './Standarizado/CabezeraB2';
import LoginFormB2C from './LoginFormB2C';

const RoadMapB2C = () => {
  // Estados para datos de usuario y vista
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [nivel, setNivel] = useState('');
  const [codigo, setCodigo] = useState('');
  const [realname, setRealname] = useState('');
  const [userImage, setUserImage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const containerRefs = useRef([]);

  // Cargar elementos vistos desde localStorage
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
    // Se actualizan los estados en base a la información recibida
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
        <>
          <LoginFormB2C onLoginSuccess={handleLoginSuccess} />
        </>
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
        </>
      )}
    </>
  );
};

export default RoadMapB2C;
