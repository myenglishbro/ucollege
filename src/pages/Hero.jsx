import React from 'react';
import '../css/hero.css';

const Hero = () => {
  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center hero-container">
        <div className="col-md-6 d-flex align-items-center justify-content-center text-center">
          <div className="hero">
            <strong><p className="hero-text">Habla idiomas con confianza</p></strong>
            <img src="https://i.ibb.co/g9YhcxT/You-Speak-Purple-480x297.png" className="hero-logo" alt="LOGO" />
            <strong><p className="hero-description">¡30 días que cambiarán tu inglés para siempre!</p></strong>
          </div>
        </div>
        <div className="col-md-6">
          <img src="https://i.ibb.co/PWg3m70/You-Speak-Banner-Unlock-Red.jpg" alt="Hero" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
