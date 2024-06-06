// RoadMap.js
import React, { useState, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import { road } from "../utils/road";
import Sidebar from '../components/Sidebar';

const RoadMap = () => {
  const [codigo, setCodigo] = useState(''); // Estado para almacenar el código ingresado
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Estado para controlar la visibilidad del sidebar
  const containerRefs = useRef([]); // Referencias a los contenedores

  const handleChangeCodigo = (event) => {
    setCodigo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMostrarComponente();
    }
  };

  const handleMostrarComponente = () => {
    const validPasswords = ['tutor123', 'andresjaramillo','davidbenites','suscriptor']; // Add more passwords here
    if (validPasswords.includes(codigo)) {
      setMostrarComponente(true);
    } else {
      setMostrarComponente(false);
    }
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
      {!mostrarComponente && (
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
              <div className="flex-1 flex flex-col">
                <h2 className={styles.heading2}>Bienvenido Student!</h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                  Al Estudiar con nosotros recibes un código para acceder a nuestro repositorio, ¡Ingrésalo Aquí!
                </p>
              </div>
              <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                <input
                  type="password"
                  placeholder="Ingresa el código"
                  value={codigo}
                  onChange={handleChangeCodigo}
                  onKeyPress={handleKeyPress}
                  className={`py-3 px-3 mx-5 font-poppins font-medium text-[18px] text-primary rounded-[10px] outline-none`}
                />
                <button
                  type="button"
                  onClick={handleMostrarComponente}
                  className={`py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
                >
                  Ver Ruta
                </button>
              </div>
            </section>
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
            scrollToContainer={scrollToContainer} 
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          <ContainerRoad road={road} containerRefs={containerRefs} password={codigo} />
        </>
      )}
    </>
  );
};

export default RoadMap;
