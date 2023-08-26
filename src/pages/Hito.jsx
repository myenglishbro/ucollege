import React from 'react';
import { Helmet } from 'react-helmet';
import cohete from "../img/cohete.png"
const Hito = (props) => {
  return (
    <>
      <section class="section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-4 text-center d-lg-block d-none">
        <img src={cohete} class="img-fluid" alt=""/>
      </div>
      <div class="col-lg-8 text-lg-left text-center">
        <h2 class="mb-3">Road to Fluency</h2>
        <p>Bienvenido a nuestra emocionante ruta de aprendizaje del idioma inglés, diseñada para guiarte desde los fundamentos hasta la fluidez en este idioma global. </p>
 <div className="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>

        <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Helmet>
      </div>
    </div>
  </div>
</section>
    <div className="main">      

      <h3 className="heading">{props.title}</h3>
      <div className="container">
        <div id="accordionExample" className="accordion">
          {props.road.map((elemento, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  {elemento.dateAdded}
                </button>
              </h2>
              <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <p>{elemento.description}</p>
                  <div>
                    {elemento.enlaces.map((enlace, i) => (
                      <a key={i} href={enlace.url} target="_blank" rel="noopener noreferrer">
                        <p>{enlace.titulo}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Hito;
