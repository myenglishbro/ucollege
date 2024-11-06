import React, { useState, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import { roadcelpip } from "../utils/roadcelpip";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';

const RoadMapCelpip = () => {
  const [usuario, setUsuario] = useState(''); 
  const [codigo, setCodigo] = useState(''); 
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [realname, setRealname] = useState(''); 
  const [userImage, setUserImage] = useState(''); // Add state for user image
  const containerRefs = useRef([]); 

  const validCredentials = [
    { usuario: 'udemy', password: 'repositorio', realname: 'Estudiante', img: 'https://i.ibb.co/0nJVBvy/416640238-351256941104803-840339.png' }, // No image
    { usuario: 'lilicelpip', password: 'celpip2024', realname: 'Liliana Galvez', img: 'https://i.ibb.co/j56g69g/OIP-2.jpg' }, // No image

    { usuario: 'vanessae', password: 'canadianelt', realname: 'Vanessa Estrada', img: 'https://i.ibb.co/0nJVBvy/416640238-351256941104803-840339.png' }, // No image
    

  ];

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
    setUserImage(userCredential ? userCredential.img : 'https://example.com/default-image.png'); // Default image URL
    
    console.log('User Image:', userCredential ? userCredential.img : 'No Image'); // Log user image
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
        <div className={`bg-primary ${styles.padding} ${styles.flexCenter} ${styles.marginY}`}>
          <div className={`${styles.boxWidth}`}>
            <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
              <div className="flex-1 flex flex-col">
                <h2 className={styles.heading2}>Bienvenido Student!</h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                  Al Estudiar con nosotros recibes un código para acceder a nuestro repositorio, ¡Ingrésalo Aquí!
                </p>
              </div>
              <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10 flex-col sm:flex-row`}>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"> {/* Añade espacio entre los inputs */}

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
  road={roadcelpip} 
  seleccionarNivel={seleccionarNivel} 
  isSidebarVisible={isSidebarVisible} 
  toggleSidebar={toggleSidebar} 
  className={isSidebarVisible ? 'visible' : ''} // Aplica la clase visible si isSidebarVisible es true
/>

          {nivelSeleccionado !== null ? (
            <ContainerRoad 
              road={[roadcelpip[nivelSeleccionado]]} 
              containerRefs={containerRefs} 
              password={codigo} 
              realname={realname} 
              userImage={userImage} // Pass the userImage here
            />
          ) : (
            <DefaultView password={codigo} realname={realname} userImage={userImage} /> // Asegúrate de pasar userImage
          )}
        </>
      )}
    </>
  );
};

export default RoadMapCelpip;
