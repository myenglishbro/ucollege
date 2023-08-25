import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'
import {data} from "../utils/data.js"
import Hero from '../components/Hero/Hero'

const Specially = () => {
  const heroData = data[9]; // selecciona el primer objeto de datos, por ejemplo

  return (
    <>
              <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />

    <div className='container-fluid'>
  <div className='row gap-3 mx-3'>
    <div className='col-lg-7'>
      <img
        src="https://images.pexels.com/photos/207582/pexels-photo-207582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Imagen relacionada con el trabajo"
        style={{ width: "100%", height: "auto" }}
      />
      <h2 className='titulos-post'>La diferencia entre ‘especially’ y ‘specially’</h2>
      <p>
      Hello there student! ¿Sabes cuál es la diferencia entre ‘especially’ y ‘specially’? ¿O quizás eres de aquellos estudiantes que ha llegado hasta el año 2023 sin saber de la existencia de ‘especially’? 🙈
      </p>
      <p>
      En ese caso, quédate ahí pegado al asiento y solucionaremos esto en menos que canta un gallo. No vuelvas a liarte con estos dos adverbios en inglés. 
      </p>     
    <hr></hr>

      <article>
      <span className='titulos-post'>¿Cuándo usamos ‘especially’?</span>
    
      <p>👉 Usamos ‘especially’ cuando equivale a sobre todo, ’above all’.</p>
      <ul>
        <li>I love fruit, especially bananas.</li>
        <li>We’ve got many plants at home, especially cacti.</li>
        <li>That bar is always packed, especially at weekends.</li>
        </ul>
        <p>👉 También usamos ‘especially’ delante de adjetivos, con el significado de ’particularmente’.</p>
      <ul>
        <li>I feel especially grumpy in the mornings.</li>
        <li>The underground was especially busy this morning. Strike </li>
        <li>It’s not especially hot for this time of the year.</li>
        </ul>
        <span className='titulos-post'>¿Cuándo usamos ‘Specially’?</span>

        <p>Cuando nos referimos al propósito específico o la función de algo.</p>
        <ul>
        <li>These scissors are specially designed for left-handed people.</li>
        <li>This poodle is specially trained to sniff drugs.</li>
        </ul>
        <div className='examples'>
        <p>¿Cuándo se pueden usar ambas?</p>
        <p>Mira este ejemplo:</p>
        
         <p>👉🥛 I bought this milk especially / specially for you. </p>
        <p>Este caso nos referimos a un propósito en particular. He comprado esta leche para ti, quizás porque te gusta más o porque eres intolerante a la lactosa, vegetariano, etc. Ambas son aceptadas, pero es más común usar ‘especially’</p>  
      
         <p> En resumen, recuerda que ‘especially’ es mucho más común y puedes usarlo siempre y cuando no hables del propósito específico o la función de algo, en ese caso usas ‘specially’.</p>
         <p> Tomar examen</p>
        </div>
      </article>
   <hr></hr>

   <article>
  <iframe title="Quizlet" loading="lazy" src="https://quizlet.com/404238738/flashcards/embed?i=10rxrk&amp;x=1jj1" height="500" width="100%" style={{ border: "0" }} data-gtm-yt-inspected-4="true"></iframe>
   <p>This video has been specially made with love at Ucollege headquarters by Carlos Apolaya Sanchez. 💕</p>
   <p>¡Puedes compartirlo, ‘especially’ si te ha ayudado!</p>
    </article>
     
      


    </div>
    <div className='col-lg-2 '>
   
       <img
        src="https://i.ibb.co/bX2x42b/Rosa-Vertical-Retro-Banner-retr-ctil-para-Black-Friday-1.png"
        alt="Imagen relacionada con el trabajo"
        style={{ width: "100%", height: "auto" }}
      />
       <img
        src="https://i.ibb.co/tz5HvdR/Rosa-Vertical-Retro-Banner-retr-ctil-para-Black-Friday.png"
        alt="Imagen relacionada con el trabajo"
        style={{ width: "100%", height: "auto" }}
      />
      
       
     
      
      

     </div>
    <Descargables></Descargables>
  </div>
</div>
<Footer></Footer>
</>
  )
}

export default Specially
