// import React from 'react'
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import MiLogo from '../../img/logo.svg';
// const NavBar = ({navLinks}) => {
//   const [open,setOpen]=useState(false);

//   const myStyle = {
//     backgroundColor: "white"
//   };
//   return (
//     <>
//       <nav class="navbar navbar-expand-lg" style={myStyle}>
//         <div class="container-fluid">
//           <Link to="/" className="navbar-brand">
//             <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
//           </Link>
  
//           <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             onClick={() => setOpen(!open)}
//           >
//             <span class="navbar-toggler-icon"></span>
//           </button>
//           <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarSupportedContent">
//             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//               {navLinks.map((item) => {
//                 return (
//                   <li className="nav-item">
//                     <Link
//                       className="nav-link active"
//                       aria-current="page"
//                       to={item.path}
//                       key={item.title}
//                       data-bs-dismiss="collapse"
//                       onClick={() => setOpen(false)} // Agregado para cerrar el menú en dispositivos móviles
//                     >
//                       {item.title} {item.icon}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
           
//           </div>
//         </div>
//       </nav>
//     </>
//   );


// }


// export default NavBar
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MiLogo from '../../img/logo.svg';

const NavBar = ({navLinks}) => {
  const [open, setOpen] = useState(false);

  const myStyle = {
    backgroundColor: "white"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={myStyle}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={MiLogo} alt="logo" style={{ width: "30px" }} />
          </Link>
  
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map((item) => {
                if (item.dropdown) {
                  return (
                    <li className="nav-item dropdown" key={item.title}>
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id={`navbarDropdown${item.title}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {item.title}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`navbarDropdown${item.title}`}>
                      {item.dropdownLinks.map((subItem) => (
                          <li key={subItem.title}>
                              <Link
                                  className="dropdown-item"
                                  to={subItem.path}
                                  data-bs-dismiss="collapse"
                                  onClick={() => setOpen(false)}
                              >
                                  {subItem.icon} {subItem.title}
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
                        className="nav-link active"
                        aria-current="page"
                        to={item.path}
                        data-bs-dismiss="collapse"
                        onClick={() => setOpen(false)}
                      >
                        {item.title} {item.icon}
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
