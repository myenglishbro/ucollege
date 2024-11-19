  import React, { useState, useRef } from 'react';
  import ContainerRoad from './ContainerRoad';
  import styles from "../style";
  import { road } from "../utils/road";
  import Sidebar from '../components/Sidebar';
  import DefaultView from '../components/DefaultView';

  const RoadMap = () => {
    const [usuario, setUsuario] = useState(''); 
    const [nivel, setNivel] = useState(''); 

    const [codigo, setCodigo] = useState(''); 
    const [mostrarComponente, setMostrarComponente] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); 
    const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
    const [realname, setRealname] = useState(''); 
    const [userImage, setUserImage] = useState(''); // Add state for user image
    const containerRefs = useRef([]); 

    const validCredentials = [
      { usuario: 'celestesalvatierra', password: 'password1', realname: 'Celeste Salvatierra', img:'https://th.bing.com/th/id/OIP.i5p4mQm3eDTw7EhrOo1jiQHaHa?rs=1&pid=ImgDetMain'},
      { nivel:"CELPIP",usuario: 'udemy', password: 'repositorio', realname: ' Autodidacta', img: '' }, // No image
      { usuario: 'KABEZINI', password: '@47830274S', realname: 'JUAN EDUARDO AYLAS INCISO', img: 'https://i.ibb.co/7bmgdmR/418722130-755683973286212-906722.png' }, // No image
      { usuario: 'JosueRv_24', password: 'jrvchoche', realname: 'Josue Ramirez ツ', img: 'https://i.ibb.co/RNVQ8VZ/OIP-10.jpg' }, // No image
      { usuario: 'andresdesigner', password: 'designer123', realname: 'Andres Jaramillo', img: 'https://i.ibb.co/gTNwpJQ/67d46012622105-63d2bfcf57030.png'  }, // No image
      { usuario: '62023170', password: '10671890', realname: 'Andrea Vargas', img: 'https://i.ibb.co/svCFBwh/d87156c7637fb0b757d3b087f67d92f1.jpg' },
      { usuario: 'leonardoporras', password: 'leopo123', realname: 'Leonardo Perez Porras', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'analimarrufo', password: 'anali84ma', realname: 'Anali Marrufo Huaman', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'marvinmarrufo', password: 'marv84ma', realname: 'Marvin Alexis Marrufo Huamán', img: 'https://i.ibb.co/whkwM9K/436043875-857274965919994-320136.png' }, // No image
      { usuario: 'vanessae', password: 'canadianelt', realname: 'Vanessa Estrada', img: 'https://i.ibb.co/0nJVBvy/416640238-351256941104803-840339.png' }, // No image
      { usuario: 'AniManrique', password: 'Ani1910', realname: 'Anita Manrique Chávez', img: 'https://i.ibb.co/jW5mpyy/463090300-530012092972416-4432276465281113242-n.jpg' }, // No image
      { usuario: 'Ppbergelund', password: 'pppublisher', realname: 'Pedro Bergelund', img: 'https://i.ibb.co/Ks3WrnN/426308282-432260169242381-257610.jpg' }, // No image
      { usuario: 'diegosego', password: 'segovia01', realname: 'Diego Segovia Gómez', img: 'https://i.ibb.co/ssX236w/454630848-467797286163219-647084.png' }, // No image
      { usuario: 'claudioelpro', password: '2219ielts', realname: 'Claudio Justiniano', img: 'https://i.ibb.co/hgHZTND/ALV-Uj-XH77p-Iy-HF4-A6v-ULRw-Kb-ZESWy2-B.png' }, // No image
      { usuario: 'angelbenites', password: 'moncada2024', realname: 'Angel Moisés Benites Moncada', img: 'https://i.ibb.co/3Thj6K0/420613655-1799350083843859-11506.png' }, // No image
      { usuario: 'alison.arapa', password: 'ielts2025', realname: 'alison.arapa', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image
      { usuario: 'jose.tbravo', password: 'ielts2025', realname: 'jose.torres.bravo', img: 'https://i.ibb.co/chn6rvR/Dise-o-sin-t-tulo-3.png' }, // No image

      { nivel:"A2 Básico",usuario: 'titooshiro', password: 'titooshiro2024', realname: 'Alberto Oshiro', img: 'https://i.ibb.co/2y3PPmL/247917193-940684856635710-168362.png' }, // No image

    ];

    const handleChangeUsuario = (event) => {
      setUsuario(event.target.value);
    };

    const handleChangeNivel = (event) => {
      setNivel(event.target.value);
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
      setNivel(userCredential ? userCredential.nivel : ''); // Asegúrate de que se actualice el nivel
      console.log('Nivel:', userCredential ? userCredential.nivel : 'Sin nivel');

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
              road={road}
              seleccionarNivel={seleccionarNivel}
              isSidebarVisible={isSidebarVisible}
              toggleSidebar={toggleSidebar}
              className={isSidebarVisible ? 'visible' : ''} // Aplica la clase visible si isSidebarVisible es true
            />
    
            {nivelSeleccionado !== null ? (
              <ContainerRoad
                road={[road[nivelSeleccionado]]}
                containerRefs={containerRefs}
                password={codigo}
                realname={realname}
                nivel={nivel}
                userImage={userImage} // Pass the userImage here
              />
            ) : (
              <DefaultView
                password={codigo}
                realname={realname}
                userImage={userImage} // Asegúrate de pasar userImage
              />
            )}
          </>
        )}
      </>
    );
  }

  export default RoadMap;
