import React from 'react';

const Producto = (props) => {
  const { thumbnail, title, description, calificacion, enlaces } = props;

  return (
    <div className="card" style={{ width: "28rem" }}>
      <img src={thumbnail} alt={title} class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{description}</p>
        <p class="card-text">Calificación: {calificacion}</p>
        <a href={enlaces} class="btn btn-primary">Adquirir Curso</a>
      </div>
    </div>
  );
};

export default Producto;
