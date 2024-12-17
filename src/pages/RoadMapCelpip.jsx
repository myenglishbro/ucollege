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
    { expirationDate:"10/01/25",nivel:"B2 ",usuario: 'lilicelpip', password: 'lilica2024', realname: 'Liliana', img: 'https://i.ibb.co/VVTPrT9/459156263-936746281144279-986465.png' }, // No image

    { usuario: 'sara.galvez', password: 'mori2024', realname: 'Sara Galvez', img: 'https://i.ibb.co/DGWqgK8/411753490-270202325848420-673562.png' }, // No image
    

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
        <div className="py-16 mt-10">
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
            {/* Imagen de fondo para la versión grande */}
            <div
              className="hidden lg:block lg:w-1/2 bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
              }}
            ></div>
  
            {/* Contenido del formulario */}
            <div className="w-full p-15 lg:w-1/2 mt-1">
              <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Bienvenido Student!
              </h2>
              <p className="text-xl text-gray-600 text-center mt-4">
                Al Estudiar con nosotros recibes un código para acceder a nuestro repositorio, ¡Ingrésalo Aquí!
              </p>
  
              <div className="mt-20">
                {/* Formulario de ingreso de datos */}
                <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Ingresa el usuario"
                    value={usuario}
                    onChange={handleChangeUsuario}
                    className="py-3 px-3 font-poppins font-medium text-[18px] text-gray-700 rounded-[10px] outline-none bg-gray-200 border border-gray-300 mb-4 sm:mb-0"
                  />
                  <input
                    type="password"
                    placeholder="Ingresa la contraseña"
                    value={codigo}
                    onChange={handleChangeCodigo}
                    onKeyPress={handleKeyPress}
                    className="py-3 px-3 font-poppins font-medium text-[18px] text-gray-700 rounded-[10px] outline-none bg-gray-200 border border-gray-300"
                  />
                </div>
  
                {/* Botón para mostrar la ruta */}
                <button
                  type="button"
                  onClick={handleMostrarComponente}
                  className="mt-4 py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none w-full"
                  >
                  Ver Ruta
                </button>
              </div>
            </div>
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
