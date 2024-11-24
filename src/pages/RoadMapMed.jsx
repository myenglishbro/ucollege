import React, { useState, useRef } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
import { roadmed } from "../utils/roadmed";
import Sidebar from '../components/Sidebar';
import DefaultView from '../components/DefaultView';

const RoadMapMed = () => {
  const [usuario, setUsuario] = useState(''); 
  const [codigo, setCodigo] = useState(''); 
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [realname, setRealname] = useState(''); 
  const [userImage, setUserImage] = useState(''); // Add state for user image
  const containerRefs = useRef([]); 

  const validCredentials = [
    { usuario: 'xramos', password: 'EH10e8x2N10v10', realname: 'Xiomara Ramos', img:'https://i.ibb.co/nPg2Cfj/417775680-430998512681191-839708.png'},
    { usuario: 'udemy', password: 'repositorio', realname: 'Estudiante Autodidacta', img: '' }, // No image
    { usuario: 'andresdesigner', password: 'designer123', realname: 'Andres Jaramillo', img: 'https://i.ibb.co/gTNwpJQ/67d46012622105-63d2bfcf57030.png'  }, // No image
    { usuario: 'AniManrique', password: 'Ani1910', realname: 'Anita Manrique Chávez', img: 'https://i.ibb.co/jW5mpyy/463090300-530012092972416-4432276465281113242-n.jpg' }, // No image
    { usuario: 'hweny', password: 'cata08', realname: 'Weny Catalina  Huaraca Magro', img: 'https://i.ibb.co/G3ydZL4/456531710-399933369790326-220531.png' }, // No image
    { usuario: 'claudioelpro', password: '2219ielts', realname: 'Claudio Justiniano', img: 'https://i.ibb.co/hgHZTND/ALV-Uj-XH77p-Iy-HF4-A6v-ULRw-Kb-ZESWy2-B.png' }, // No image
    { usuario: 'titooshiro', password: 'titooshiro2024', realname: 'Alberto Oshiro', img: 'https://i.ibb.co/2y3PPmL/247917193-940684856635710-168362.png' }, // No image
    { usuario: 'michellev', password: 'michellvz2024', realname: 'Michelle velasquez', img: 'https://i.ibb.co/2y3PPmL/247917193-940684856635710-168362.png' }, // No image


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
          <div className="py-10 mt-5">
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
              <div className="w-full p-15 lg:w-1/2 mt-0">
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
            road={roadmed} 
            seleccionarNivel={seleccionarNivel} 
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          {nivelSeleccionado !== null ? (
            <ContainerRoad 
              road={[roadmed[nivelSeleccionado]]} 
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

export default RoadMapMed;
