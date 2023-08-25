import React from 'react';
import { FcAssistant } from "react-icons/fc";
import { Link } from 'react-router-dom';
import '../css/Articulo.css';


const Articulo = ({thumbnail, title, subtitle, enlaceblog, description, channel}) => {

  return (
    <div className="card-product" style={{ maxWidth: "18rem" }}>
      <img src={thumbnail} className="card-img-top" alt="Thumbnail" />
      <div className="card-body">
        <h6 className="card-subtitle mb-2">{subtitle}</h6>
        <Link to={enlaceblog}>
          <h5 className="card-title">{title}</h5> 
        </Link>
        <p className="card-text">{description}</p>
        <div className="feature d-flex">
          <div className="icon-sm me-4">
            <FcAssistant />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Articulo;


