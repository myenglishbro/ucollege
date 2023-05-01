import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MiLogo from '../../img/logo.svg';
const NavBar = ({navLinks}) => {
  const [open,setOpen]=useState(false);

  const myStyle = {
    backgroundColor: "white"
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg" style={myStyle}>
        <div class="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
          </Link>
  
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map((item) => {
                return (
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={item.path}
                      key={item.title}
                      data-bs-dismiss="collapse"
                      onClick={() => setOpen(false)} // Agregado para cerrar el menú en dispositivos móviles
                    >
                      {item.title} {item.icon}
                    </Link>
                  </li>
                );
              })}
            </ul>
           
          </div>
        </div>
      </nav>
    </>
  );


}


export default NavBar
