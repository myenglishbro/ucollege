// RoadMapA1.jsx
import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadB1 } from "../utils/roadB1";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';
import Navbar from './myenglishbro/components/NavBar';

// userCredential, userPassword ahora vienen como props
const RoadMapB1 = ({ userCredential, userPassword }) => {
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

  // Si no hay usuario, no mostrar nada (o podrías redirigir)
  if (!userCredential) return <div className="text-center text-red-500 py-12">No autorizado</div>;

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
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar
        road={roadB1}
        seleccionarNivel={seleccionarNivel}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        viewedItems={viewedItems}
        setViewedItems={setViewedItems}
        className={isSidebarVisible ? 'visible' : ''}
      />

      {nivelSeleccionado !== null ? (
        <ContainerRoad
          road={[roadB1[nivelSeleccionado]]}
          containerRefs={containerRefs}
          password={userPassword}
          realname={userCredential.realname}
          nivel={userCredential.nivel}
          expirationDate={userCredential.expirationDate}
          userImage={userCredential.img}
        />
      ) : (
        <DefaultView
          password={userPassword}
          nivel={userCredential.nivel}
          expirationDate={userCredential.expirationDate}
          realname={userCredential.realname}
          userImage={userCredential.img}
        />
      )}

     
      
    </>
  );
};

export default RoadMapB1;
