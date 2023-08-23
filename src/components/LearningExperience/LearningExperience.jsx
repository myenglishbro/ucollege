import React from 'react';


const LearningExperience = () => {
  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <h2>Así es como funciona</h2>
        <p>¿Tienes curiosidad por descubrir tu experiencia de aprendizaje?</p>
      </div>
      <div className="row justify-content-center">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column align-items-center mb-4">
            <h5>PRIMER PASO</h5>
            <p>
              Adapta tu búsqueda y elige a tu profe. Encuentra el que mejor responda a tus necesidades de aprendizaje de idiomas.
            </p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img src="https://i.ibb.co/XWMWhGV/sadasdasdsa.jpg" alt="Teachers" className="mb-3 w-100" />
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column align-items-center mb-4">
            <h5>SEGUNDO PASO</h5>
            <p>
              Una vez que hayas encontrado un profesor, selecciona la hora que más te convenga y añádela a tu calendario. Conoce al profesor y comenta tus objetivos de forma totalmente gratuita.
            </p>
          </div>
          <div className="d-flex flex-column align-items-center mb-4">
            <img src="https://i.ibb.co/0cJwsGr/3f746c860beb8239cd681579d87403e6-book-free-trial.png" alt="Teachers" className="mb-3 w-100" />
          </div>
        </div>
        <div className="d-flex flex-row">
          <div className="d-flex flex-column align-items-center mb-4">
            <h5>TERCER PASO</h5>
            <p>
              Programa fácilmente tus clases, aprende y accede a materiales adicionales en un solo lugar.
            </p>
          </div>
          <div className="d-flex flex-column align-items-center mb-4">
            <img src="https://i.ibb.co/0cJwsGr/3f746c860beb8239cd681579d87403e6-book-free-trial.png" alt="Teachers" className="mb-3 w-100" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningExperience;
