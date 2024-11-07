import React, { useState } from 'react';
import ContainerRoad from './ContainerRoad';
import Sidebar from './Sidebar';

const ParentComponent = ({ road }) => {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(0); // Estado para el nivel seleccionado

  // Esta función se pasa al Sidebar para actualizar el nivel seleccionado
  const handleNivelSeleccionado = (index) => {
    setNivelSeleccionado(index); // Actualiza el estado al índice del nivel seleccionado
  };

  return (
    <div className="parent-container flex">
      <Sidebar road={road} seleccionarNivel={handleNivelSeleccionado} />
      <ContainerRoad
        road={road}
        nivelSeleccionado={nivelSeleccionado}
      />
    </div>
  );
};

export default ParentComponent;
