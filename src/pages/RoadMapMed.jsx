import React, { useState, useRef } from 'react';
import styles from "../style";
import { roadmed } from "../utils/roadmed";
import Sidebar from '../components/Sidebar';
import ContainerRoadMed from './ContainerRoadMed';
import DefaultView from '../components/DefaultView';

const RoadMapMed = () => {
  const [codigo, setCodigo] = useState('');
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const containerRefs = useRef([]);

  const handleChangeCodigo = (event) => {
    setCodigo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMostrarComponente();
    }
  };

  const handleMostrarComponente = () => {
    const validPasswords = ['gabrielahilario','sherylchacahuasay', 'udemystudent', 'valehuaman', 'patriciaguerron', 'jackelinechaponan','jhoelhuaman'];
    if (validPasswords.includes(codigo)) {
      setMostrarComponente(true);
    } else {
      setMostrarComponente(false);
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
                  className={`py-3 px-3 mx-5 font-poppins font-medium text-[18px]  text-n-2 rounded-[10px] outline-none`}
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
            road={roadmed} 
            seleccionarNivel={seleccionarNivel} 
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoadMed 
              roadmed={[roadmed[nivelSeleccionado]]} 
              containerRefs={containerRefs} 
              password={codigo} 
            />
          ) : (
            <DefaultView password={codigo} />
          )}
        </>
      )}
    </>
  );
};

export default RoadMapMed;
