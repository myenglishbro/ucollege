import React from 'react';

const Sidebar = ({ road, scrollToContainer, isSidebarVisible, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
      {road.map((elemento, index) => (
        <button 
          key={index} 
          onClick={() => {
            scrollToContainer(index);
            toggleSidebar(); // Cerrar el sidebar al hacer clic en un enlace
          }} 
          className="sidebar-button"
        >
          {elemento.title}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
