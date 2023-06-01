import React from 'react';
import '../css/hero.css';
import HeroPic from '../img/hero.avif';
import Decoreline from '../img/Decore_line.png';
import Decore from '../img/Decore.png';

const Hero = () => {
  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center" style={{ backgroundImage: `url(${Decore})`, backgroundPosition: "right", backgroundRepeat: "no-repeat", zIndex: "1", top: "0", right: "0" }}>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div>
            <h1 className="font-weight-bold">Habla idiomas con confianza</h1>
            <img src={Decoreline} alt="Decore line" style={{ position: "relative", zIndex: "2" }} />
            <p>Aprendizaje de idiomas a tu ritmo, con profesores de confianza.</p>
          </div>
        </div>
        <div className="col-md-6">
          <img src={HeroPic} alt="Hero" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
