import React from 'react';
import '../css/hero.css';

const Hero = () => {
  return (
    <div className="container-fluid">
    <div className="row align-items-center justify-content-center" style={{ backgroundColor: "rgb(111, 79, 235)" }}>
      <div className="col-md-6 d-flex align-items-center justify-content-center text-center">
        <div>
        <strong> <p className=" text-white pt-5" style={{ fontSize: "34px" }}>Habla idiomas con confianza</p></strong>
          <img src="https://i.ibb.co/g9YhcxT/You-Speak-Purple-480x297.png" alt="LOGO" />
          <strong><p className="text-white" style={{ fontSize: "46px" ,fontfamily: "Poppins"}}>¡30 días que cambiarán tu inglés para siempre!</p></strong>
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
