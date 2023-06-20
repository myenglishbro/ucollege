import React from 'react';

const Oferta = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div>
            <div className="card-body">
              <h2 className="card-title">Aprende inglés por 30 soles al mes</h2>
              <p className="card-text">
                Grupo de WhatsApp para practicar todos los días con actividades.
              </p>
              <p className="card-text">
                Acceso a plataforma para ver clases asíncronas y participar en talleres.
              </p>
              <a href="https://wa.link/z623lo" className="btn btn-primary">¡Quiero aprovechar la oferta!</a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="embed-responsive embed-responsive-16by9 mt-4">
            <iframe
              className="embed-responsive-item"
              src="https://www.youtube.com/embed/5pCVOQsPsLM"
              allowFullScreen
              title="Video"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oferta;
