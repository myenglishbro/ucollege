import React, { useState, useRef } from 'react';
import ContainerRoadDev from './ContainerRoadDev';
import { roaddev } from "../utils/roaddev";
import Sidebar from '../components/Sidebar';
import DefaultViewdos from '../components/DefaultViewdos';

const RoadMapDev = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const containerRefs = useRef([]); 

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
    setIsSidebarVisible(!isSidebarVisible);
  };


  return (
    <>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
              <Sidebar
        road={roaddev}
        seleccionarNivel={seleccionarNivel}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        className={isSidebarVisible ? 'visible' : ''} // Asegura que esta clase se aplique
      />
        {nivelSeleccionado !== null ? (
          <ContainerRoadDev 
            road={[roaddev[nivelSeleccionado]]} 
            containerRefs={containerRefs} 
          />
        ) : (
          <DefaultViewdos />
        )}
      </>
   
  );
};

export default RoadMapDev;
