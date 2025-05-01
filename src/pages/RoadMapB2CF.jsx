import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import { roadB2CF } from '../utils/roadB2CF';
import Sidebar from '../components/Sidebar';
import Navbar from './myenglishbro/components/NavBar';
import DefaultViewF from '../components/DefaultViewF';

const RoadMapB2CF = () => {
  // Datos por defecto para DefaultView
  const codigo = 'defaultPassword';
  const nivel = 'B2';
  const realname = 'My English Bro!';
  const userImage = 'https://i.ibb.co/N68DRRCg/Pink-Cute-Simple-Flower-Shop-Circle-Logo-removebg-preview-2.png';
  const expirationDate = '2025-12-31';

  // Estados para navegación
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const containerRefs = useRef([]);

  // Cargar elementos vistos desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('viewedItems')) || [];
    setViewedItems(saved);
  }, []);

  useEffect(() => {
    if (viewedItems.length) {
      localStorage.setItem('viewedItems', JSON.stringify(viewedItems));
    }
  }, [viewedItems]);

  const seleccionarNivel = (index) => {
    setNivelSeleccionado(index);
    scrollToContainer(index);
  };

  const scrollToContainer = (index) => {
    if (containerRefs.current[index]) {
      containerRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  return (
    <>
      <Navbar />

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <Sidebar
        road={roadB2CF}
        seleccionarNivel={seleccionarNivel}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        viewedItems={viewedItems}
        setViewedItems={setViewedItems}
        className={isSidebarVisible ? 'visible' : ''}
      />

      {nivelSeleccionado !== null ? (
        <ContainerRoad
          road={[roadB2CF[nivelSeleccionado]]}
          containerRefs={containerRefs}
        />
      ) : (
        <DefaultViewF
          password={codigo}
          nivel={nivel}
          expirationDate={expirationDate}
          realname={realname}
          userImage={userImage}
        />
      )}
    </>
  );
};

export default RoadMapB2CF;
