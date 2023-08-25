import React from 'react'
import ctaimage from "../img/cta-illustration.jpg"
const CallToAction = () => {
  return (
    <section class="section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-4 text-center d-lg-block d-none">
        <img src={ctaimage} class="img-fluid" alt=""/>
      </div>
      <div class="col-lg-8 text-lg-left text-center">
        <h2 class="mb-3">Aprende inglés por 30 soles al mes</h2>
        <p>Grupo de WhatsApp para practicar todos los días con actividades.
 Acceso a plataforma para ver clases asíncronas y participar en talleres.</p>
        <a href="https://wa.link/z623lo" class="btn btn-primary">¡Unirme ya!</a>
      </div>
    </div>
  </div>
</section>
  )
}

export default CallToAction
