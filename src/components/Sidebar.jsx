import React from 'react';

const Sidebar = ({ road, seleccionarNivel, isSidebarVisible, toggleSidebar }) => {
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        {road.map((elemento, index) => (
          <button
            key={index}
            onClick={() => {
              seleccionarNivel(index);
              toggleSidebar(); // Close sidebar after selecting an option
            }}
            className="sidebar-button"
          >
            {elemento.title}
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
