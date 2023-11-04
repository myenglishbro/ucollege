import React, { useState } from 'react';
import ContainerRoad from './ContainerRoad';
import styles from "../style";
const RoadMap = () => {
  const [codigo, setCodigo] = useState(''); // Estado para almacenar el código ingresado
  const [mostrarComponente, setMostrarComponente] = useState(false);

  const handleChangeCodigo = (event) => {
    setCodigo(event.target.value);
  };

  const handleMostrarComponente = () => {
    if (codigo === 'ruta') { // Reemplaza 'tu_codigo_esperado' con el código que desees
      setMostrarComponente(true);
    } else {
      setMostrarComponente(false);
    }
  };

  return (
    <>

<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
          <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Bienvenido Student!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Al Estudiar con nostros recibes un codigo para acceder a nuestro repositorio , Ingresalo Aquí!
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
    <input
        type="text"
        placeholder="Ingresa el código "
        value={codigo}
        onChange={handleChangeCodigo}
        className={`py-3 px-3 mx-5 font-poppins font-medium text-[18px] text-primary  rounded-[10px] outline-none`}
      />
      <button type="button" onClick={handleMostrarComponente} className={`py-3 px-3 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
     Ver Ruta
  </button>
    </div>
  </section>
</div>
</div>


      {mostrarComponente && <ContainerRoad />}


    
    
    </>
  );
};

export default RoadMap;
