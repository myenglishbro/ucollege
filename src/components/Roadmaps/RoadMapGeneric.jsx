// src/components/RoadMapGeneric.jsx
import React, { useState, useEffect, useRef } from 'react';
import ContainerRoad from '../../pages/ContainerRoad';
import Sidebar from '../Sidebar';
import DefaultView from '../DefaultView';
import Navbar from '../../pages/myenglishbro/components/NavBar';

const RoadMapGeneric = ({ roadData, userCredential, userPassword }) => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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

  if (!userCredential) return <div className="text-center text-red-500 py-12">No autorizado</div>;

  const seleccionarNivel = (index) => {
    setNivelSeleccionado(index);
    if (containerRefs.current[index]) {
      containerRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  return (
    <>
      <Navbar />
      <Sidebar
        road={roadData}
        seleccionarNivel={seleccionarNivel}
        isSidebarVisible={isSidebarVisible}
        toggleSidebar={toggleSidebar}
        viewedItems={viewedItems}
        setViewedItems={setViewedItems}
        className={isSidebarVisible ? 'visible' : ''}
      />

      {nivelSeleccionado !== null ? (
        <ContainerRoad
          road={[roadData[nivelSeleccionado]]}
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

export default RoadMapGeneric;
