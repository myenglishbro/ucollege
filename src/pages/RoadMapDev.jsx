import React, { useState, useRef } from 'react';
import ContainerRoadDev from './ContainerRoadDev';
import styles from "../style";
import { roaddev } from "../utils/roaddev";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';

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
      />
      <div className="main-content">
        {nivelSeleccionado !== null ? (
          <ContainerRoadDev 
            road={[roaddev[nivelSeleccionado]]} 
            containerRefs={containerRefs} 
          />
        ) : (
          <DefaultView />
        )}
      </div>
    </>
  );
};

export default RoadMapDev;
