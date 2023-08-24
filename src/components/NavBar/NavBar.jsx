import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiLogo from '../../img/logo.svg';

const NavBar = ({ navLinks }) => {
  const [open, setOpen] = useState(false);

  const toggleOffcanvas = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(false);
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
          className={`offcanvas offcanvas-end ${open ? 'show' : ''}`}
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
              {navLinks.map((item) => {
                if (item.dropdown) {
                  return (
                    <li className="nav-item dropdown" key={item.title}>
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id={`navbarDropdown${item.title}`}
                        aria-expanded="false"
                        onClick={toggleOffcanvas}
                      >
                        {item.title}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`navbarDropdown${item.title}`}>
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
