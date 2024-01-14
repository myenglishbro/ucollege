import React from 'react';
import "../css/estilos.css"
const Producto = (props) => {
  const {
    thumbnail,
    title,
    subtitle,
    description,
    calificacion,
    precio,
    enlaces,
    thumbnailfce,
    thumbnailcae,
    thumbnailcpe
  } = props;

  return (
    <div className="card">
    <div className="poster">
      <img src={thumbnail} alt={title} />
    </div>
    <div className="details">
      <div className="imgcontent">
       

        <br />
        <span>{title}</span>
      </div>
      <div className="rating">
          
            <span className="precio">{calificacion}</span>
          </div>
      <div className="tags">
        <span className="fantasy">{subtitle}</span>
        <a href={enlaces}><span className="mystery">Descargar</span></a>
      </div>
      <div className="info">
        <p>{description}</p>
      </div>
      <div className="cast">
            <h4>Para niveles:</h4>
            <ul>
              <li>
                <img
                  src={thumbnailfce}
                  alt=''
                />
              </li>
              <li>
              <img
                  src={thumbnailcae}
                  alt=''
                />
              </li>
             
            </ul>
          </div>
    </div>
  </div>
  );
};

export default Producto;
