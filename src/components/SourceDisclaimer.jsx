import React from 'react'
import ctaimage from "../img/cta-illustration.jpg"
const SourceDisclaimer = () => {
    return (
       
   
      <section class="section">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-4 text-center d-lg-block d-none">
        <img src={ctaimage} class="img-fluid" alt=""/>
      </div>
      <div class="col-lg-8 text-lg-left text-center">
      <strong>¡Importante! Todo el contenido presentado aquí es gratuito y no se vende.</strong> Todos los materiales aquí presentes son obtenidos de diversas fuentes, incluyendo ISECollective, Facebook, descargas de Mega y contribuciones de la comunidad. Este sitio pretende ser un lugar centralizado para almacenar y compartir recursos educativos.
      <p>
            Por favor, asegúrate de respetar los derechos de autor y las políticas de uso de cada recurso. Si tienes alguna duda o problema con algún contenido, contáctanos para que podamos abordarlo adecuadamente.
          </p>
          <p>
            Este proyecto ha sido creado como parte del programa de programación frontend de Coderhouse y está en constante modificación para mejorar la experiencia de aprendizaje.
          </p>
      </div>
    </div>
  </div>
</section>
      );
    }

export default SourceDisclaimer
