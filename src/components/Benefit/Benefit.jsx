import React from 'react';
import teachers from '../../img/teachers.svg';
import horario from '../../img/horario.svg';
import plataforma from '../../img/plataforma.svg';
import fondo2 from '../../img/fondo2.svg';
import money from '../../img/money.svg';

const Benefit = () => {
  const stepsData = [
    {
      title: 'Mejora tu Inglés',
      description: 'Nuestra comunidad cuenta con más de 2000 profesores expertos, todos ellos con experiencia docente previa.',
      image: teachers,
    },
    {
      title: 'Asequible',
      description: 'Con clases desde 22,04 PEN, SpeakUp! ofrece aprendizaje de idiomas a distancia que se ajusta a cualquier bolsillo.',
      image: money,
    },
    {
      title: 'Horario flexible',
      description: 'Te ofrecemos la posibilidad de aprender en función de tus horarios. Reserva tus clases cuando quieras aprender.',
      image: horario,
    },
    {
      title: 'Plataforma todo en uno',
      description: 'Todo tu aprendizaje en una plataforma completa que te acompañará en cualquier lugar.',
      image: plataforma,
    },
  ];

  return (
    <div
      className="contenedorpadre d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${fondo2})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        padding: '90px',
        backgroundColor: 'transparent',
        borderBottomLeftRadius: '70% 20%',
        borderBottomRightRadius: '70% 20%',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          {stepsData.map((step, index) => (
            <div className="col-md-6 col-lg-3 mb-5 d-flex align-items-stretch" key={index}>
              <div className="bg-white rounded-lg shadow-lg p-4 m-3 d-flex flex-column justify-content-between">
                <div className="text-center">
                  <img src={step.image} alt={step.title} className="mx-auto w-100 h-100 rounded-full" />
                </div>
                <div>
                  <h2 className="mt-4 text-center">{step.title}</h2>
                  <p className="mt-2 text-center">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefit;
