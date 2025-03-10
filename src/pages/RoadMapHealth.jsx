import React, { useState, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import { roadhealth } from "../utils/roadhealth";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';
import { validCredentials } from '../utils/credentials'; // Importa desde el archivo

const RoadMapHealth = () => {
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [realname, setRealname] = useState('');
  const containerRefs = useRef([]);

  const handleChangeUsuario = (event) => {
    setUsuario(event.target.value);
  };

  const handleChangeCodigo = (event) => {
    setCodigo(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMostrarComponente();
    }
  };

  const handleMostrarComponente = () => {
    const userCredential = validCredentials.find(
      (cred) => cred.usuario === usuario && cred.password === codigo
    );

    setMostrarComponente(!!userCredential);
    setRealname(userCredential ? userCredential.realname : '');
    console.log('Real Name:', userCredential ? userCredential.realname : ''); // Debugging
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
            <section
              className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
            >
              <div className="flex-1 flex flex-col">
                <h2 className={styles.heading2}>Bienvenido Student!</h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                  Al estudiar con nosotros recibes un código para acceder a
                  nuestro repositorio, ¡Ingrésalo Aquí!
                </p>
              </div>
              <div
                className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}
              >
                <input
                  type="text"
                  placeholder="Ingresa el usuario"
                  value={usuario}
                  onChange={handleChangeUsuario}
                  className={`py-3 px-3 mx-5 font-poppins font-medium text-[18px] text-n-2 rounded-[10px] outline-none`}
                />
                <input
                  type="password"
                  placeholder="Ingresa la contraseña"
                  value={codigo}
                  onChange={handleChangeCodigo}
                  onKeyPress={handleKeyPress}
                  className={`py-3 px-3 mx-5 font-poppins font-medium text-[18px] text-n-2 rounded-[10px] outline-none`}
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
            road={roadhealth}
            seleccionarNivel={seleccionarNivel}
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad
              road={[roadhealth[nivelSeleccionado]]}
              containerRefs={containerRefs}
              password={codigo}
              realname={realname} // Asegúrate de pasar realname aquí
            />
          ) : (
            <DefaultView password={codigo} realname={realname} />
          )}
        </>
      )}
    </>
  );
};

export default RoadMapHealth;
