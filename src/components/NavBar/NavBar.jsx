import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = ({navLinks}) => {
  return (
    <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

         {
            navLinks.map((item)=>{
                return (
                <li className="nav-item">
               
                <Link className="nav-link active" aria-current="page" to={item.path} key={item.title}>
                 {item.title}  {item.icon}
                    </Link>                
                    </li>);
            })
         }
       
        
       
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar
