import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiLogo from '../../img/logo.svg';

const NavBar = ({ navLinks }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  const handleLinkClick = () => {
    setIsOffcanvasOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleOffcanvas}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <Link to="/" className="navbar-brand">
                <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
              </Link>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              onClick={toggleOffcanvas}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-4">
              {navLinks.map((item, index) => {
                if (item.dropdown) {
                  return (
                    <li className="nav-item dropdown" key={item.title}>
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id={`navbarDropdown${item.title}`}
                        aria-expanded={openDropdown === index ? "true" : "false"}
                        onClick={() => toggleDropdown(index)}
                      >
                        {item.title}
                      </button>
                      <ul className={`dropdown-menu ${openDropdown === index ? "show" : ""}`} aria-labelledby={`navbarDropdown${item.title}`}>
                        {item.dropdownLinks.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              className="dropdown-item"
                              to={subItem.path}
                              onClick={handleLinkClick}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                } else {
                  return (
                    <li className="nav-item" key={item.title}>
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to={item.path}
                        onClick={handleLinkClick}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;