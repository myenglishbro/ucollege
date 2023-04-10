import React from 'react';
const Producto = (props) => {
  const elementos = props.products.map((elemento, index) => (
    <div className="card" style={{ width: "28rem" }} key={index}>
        <img src={elemento.thumbnail} alt={elemento.title}class="card-img-top" />
        <div class="card-body">
            <h5 class="card-title">{elemento.title}</h5>
            <p class="card-text">{elemento.description}</p>
            <p class="card-text">Calificación: {elemento.calificacion}</p>
            <a href={elemento.enlaces} class="btn btn-primary">Adquirir Curso</a>
        </div>
        </div>
  ));

  return <div className="productos d-flex flex-wrap mx-5 gap-2 justify-content-center  mt-5">{elementos}</div>;
};

export default Producto;
