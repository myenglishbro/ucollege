import React from 'react';
import Hito from './Hito';
import styles from "../style";
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = ({ road, containerRefs, password, realname, userImage, nivel }) => {
  console.log("Nivel en ContainerRoad:", nivel);  // Verifica el valor de nivel
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CardDeal2 password={password} realname={realname} userImage={userImage} nivel={nivel} /> 
        <Hito road={road} containerRefs={containerRefs} />
      </div>
    </div>
  );
};


export default ContainerRoad;
