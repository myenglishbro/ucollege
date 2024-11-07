import React from 'react';
import Hito from './Hito';
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = ({ road, containerRefs, password, realname, userImage, nivel }) => {
  console.log("Nivel en ContainerRoad:", nivel); // Verifica el valor de nivel

  const selectedRoad = road[nivel]; // Usamos el valor de nivel para obtener el paso correspondiente

  return (
    <div className="bg-gradient-to-b min-h-screen flex items-center justify-center py-3">
      <div className="w-full max-w-5xl px-6 md:px-10 lg:px-16 space-y-1">
        {/* Card de Usuario */}

        {/* Contenedor de Hito */}
        <Hito selectedLink={selectedRoad && selectedRoad.enlaces[0]} />
        <CardDeal2 password={password} realname={realname} userImage={userImage} nivel={nivel} />

      </div>
    </div>
  );
};

export default ContainerRoad;
