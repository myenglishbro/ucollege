import React from 'react'
import getting from "../img/getting-started.jpg"

const Iner = () => {
  return (
    <section class="section">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 text-center d-lg-block d-none">
          <img src={getting} class="img-fluid" alt=""/>
        </div>
        <div class="col-lg-8 text-lg-left text-center">
        <p>
        Este proyecto nace como una iniciativa personal, impulsada por el deseo de contribuir y brindar apoyo a aquellos que pueden carecer de los recursos necesarios para su educación o simplemente a aquellos que anhelan continuar aprendiendo. Creemos en la igualdad de oportunidades y aspiramos a ser un faro de conocimiento y colaboración para todos.
            </p>
            <p>
            Valoramos la comunidad y respetamos las decisiones de los estudiantes que hayan contribuido con su contenido a este espacio. Si alguna persona no desea que su material recopilado de la comunidad se encuentre presente, estamos dispuestos a retirarlo de inmediato. El respeto a las preferencias de cada individuo es esencial para nosotros.
            </p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Iner
