import React from 'react';
import Hito from './Hito';
import styles from "../style";
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = ({ road, containerRefs, password, realname, userImage, nivel }) => {
  console.log("Nivel en ContainerRoad:", nivel); // Verifica el valor de nivel

  return (
    <div className="bg-gradient-to-b to-blue-700 min-h-screen flex flex-col items-center py-3">
      <div className="w-full max-w-5xl px-6 md:px-10 lg:px-16">
        {/* Card de Usuario */}
        <CardDeal2 password={password} realname={realname} userImage={userImage} nivel={nivel} />

        {/* Contenedor de Hito */}
        <div className="mt-1 p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl">
          <Hito road={road} containerRefs={containerRefs} />
        </div>
      </div>
    </div>
  );
};

export default ContainerRoad;
