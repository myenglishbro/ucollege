import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

const Producto = (props) => {
  const { thumbnail, title, description, calificacion, enlaces, precio,demo } = props;

  // Verificar si el precio es cero
  const esGratis = precio === 0;

  // Estilos personalizados para el precio
  const precioStyle = {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem',
    display: 'inline-block',
    borderRadius: '4px',
  };

  return (
    <div className="card" style={{ width: '28rem' }}>
      <img src={thumbnail} alt={title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">Calificación: {calificacion}</p>
        <a href={enlaces} className="btn btn-primary">
          Obtener
        </a>
        <a href={demo} className="btn btn-primary">
          Demo
        </a>
        {esGratis ? (
          <p className="card-text" style={precioStyle}>
            Gratis
          </p>
        ) : (
          <button className="btn btn-danger" style={precioStyle}>Precio: S/
            
            {precio} <FontAwesomeIcon icon={faTags} style={{ marginRight: '0.5rem' }} />
          </button>
        )}
       
      </div>


      
    </div>

    
  );
};

export default Producto;
