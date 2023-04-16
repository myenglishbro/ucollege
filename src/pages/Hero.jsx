import React from 'react'

const Hero = ({ title, description,thumbnail }) => {
  return (
    <div className="hero vh-50 d-flex align-items-center" style={{backgroundImage: `url(${thumbnail})`}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7 mx-auto text-center">
            <h1 className="display-4 text-white">{title} </h1>
            <p className="text-white my-3">{description}</p>
            <a href="https://wa.link/qwnf6w" className="btn me-2 btn-main">Contactar</a>
            <a href="https://wa.link/qwnf6w" className="btn btn-outline-light">Grupo Wsp</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero


