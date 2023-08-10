import React from 'react';
import { Helmet } from 'react-helmet';

import "../css/product.css"
const Producto = (props) => {
  const { thumbnail, title, description, calificacion,precio,enlaces} = props;
  const priceText = precio === 0 ? "Gratis" : `S/.${precio}`;

 

  return (
    <section className="card">
            <div className="poster">
             <img src={thumbnail} alt="title"/>
             </div>
             <div className="details">
                 <div class="imgcontent">
                   {/* <img src="https://i.ibb.co/347Fk71/logmyenglishbro.png" ALT="logo"/> */}
                   <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Helmet>
      <div class="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>
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
                  <span className="fantasy">{priceText}</span>
                    <a href={enlaces}><span className="mystery" >Descargar</span></a>
                 

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
