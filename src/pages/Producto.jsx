import React from 'react';

import "../css/product.css"
const Producto = (props) => {
  const { thumbnail, title, description, calificacion,precio,enlaces} = props;

 

  return (
    <section className="card">
            <div className="poster">
             <img src={thumbnail} alt="title"/>
             </div>
             <div className="details">
                 <div class="imgcontent">
                   <img src="https://i.ibb.co/347Fk71/logmyenglishbro.png" ALT="logo"/>
                   <br/>
                   <span>{title}</span>
                 </div>
                 <div className="rating">
                    <i className="fas fa-star" aria-hidden="true"></i>
                    <i className="fas fa-star" aria-hidden="true"></i>
                    <i className="fas fa-star" aria-hidden="true"></i>
                    <i className="fas fa-star" aria-hidden="true"></i>
                    <i className="far fa-star" aria-hidden="true"></i>
                    <span>{calificacion}</span>
                  </div>

                  <div className="tags">
                    <span className="fantasy">S/.{precio}</span>
                    <a href={enlaces}><span className="mystery" >Obtener</span></a>
                  </div>

                  <div className="info">
                    <p>
                      {description}
                    </p>
                  </div>

             </div>


    </section>

    
  );
};

export default Producto;
