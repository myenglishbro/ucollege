import React from 'react';
import styles from "../style";
import CardDeal2 from './CardDeal2';
import CardDeal3 from './CardDeal3';

const DefaultViewdos = ({ password, realname, userImage }) => { // Agregar userImage aquí
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      
          <CardDeal3 />
       

        <div className="bg-primary flex justify-center items-center p-6 rounded-lg shadow-md mt-5">
          <h2 className="text-white text-lg font-semibold">
            Selecciona un nivel del sidebasssr &#128522;
          </h2>
        </div>
        
      
      </div>
    </div>
  );
};

export default DefaultViewdos;
