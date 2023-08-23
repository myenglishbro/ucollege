import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importa useLocation de react-router-dom
import MiLogo from '../../img/logo.svg';

const NavBar = ({ navLinks }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // Obtiene la ubicación actual

  // Cierra el menú cuando la ubicación cambie
  const handleCloseMenu = () => {
    if (open) {
      setOpen(false);
    }
  };

  return (
    <nav className="bg-purple-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="navbar-brand">
            <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
          </Link>

          <button
            className="text-white block lg:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className="text-xl">
              <i className="fas fa-bars"></i>
            </span>
          </button>

          <div className={`hidden lg:flex space-x-4 ${open ? "flex" : "hidden"}`}>
            <ul className="flex space-x-4">
              {navLinks.map((item) => (
                <li
                  className={`relative group ${item.dropdown ? "dropdown" : ""}`}
                  key={item.title}
                >
                  {item.dropdown ? (
                    <div className="group">
                      <button
                        className="text-gray group-hover:text-gray-300"
                        onClick={() => setOpen(!open)}
                      >
                        {item.title} <i className="fas fa-chevron-down ml-1"></i>
                      </button>
                      <ul
                        className={`absolute hidden mt-2 space-y-2 bg-gray-800 py-2 px-3 rounded-md group-hover:block`}
                      >
                        {item.dropdownLinks.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              className="text-white hover:text-gray-300"
                              to={subItem.path}
                              onClick={handleCloseMenu} // Cierra el menú al hacer clic en un enlace de submenú
                            >
                              {subItem.icon} {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <li>
                      <Link
                        className="text-white hover:text-gray-300"
                        to={item.path}
                        onClick={handleCloseMenu} // Cierra el menú al hacer clic en un enlace de menú principal
                      >
                        {item.title} {item.icon}
                      </Link>
                    </li>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
