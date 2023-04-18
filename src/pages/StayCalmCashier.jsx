import React from 'react'
import Hero from './Hero'
import {data} from "../utils/data.js"
import Descargables from './Descargables'
import Footer from './Footer'
const StayCalmCashier = () => {
  const heroData = data[11]; // selecciona el primer objeto de datos, por ejemplo

  return (
    <>
      <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
    {/* <div className='container-fluid mt-3'>
  <div className='row gap-3 mx-3'>
    <div className='col-lg-7'>
      
      <h2 className='titulos-post'>Las palabras más confusas en inglés Que todos fallamos al habalr</h2>
      <p>
      Hello student! Estas palabras pueden volver loco de remate a cualquier estudiante de inglés en su sano juicio. Y por si esto no fuera poco, esta clase va a ser tipo examen. Tenemos curiosidad por saber si sabes utilizar correctamente estas palabras tan confusas en inglés.
      </p>
      <p>
      Después de esta introducción algunos ya habréis salido corriendo despavoridos y sin rumbo como Forrest Gump. Si sigues conmigo, solo decirte que vayas con pies de plomo, porque este examen ya ha sacado los colores a cientos de estudiantes con nivel de inglés avanzado. 🍅 
      </p>
      <article>
  <iframe title="Quizlet" loading="lazy" src="https://quizlet.com/356427640/flashcards/embed" height="500" width="100%" style={{ border: "0" }} data-gtm-yt-inspected-4="true"></iframe>
  <h2>Whoop whoop! You made it!</h2>
 <p>No te vayas a la cama con ninguna duda, aquí tienes las explicaciones</p>
    </article>
    <hr></hr>

      <article>
   
        <p>👉 Historic: momento significativo en la historia.  </p>
        <p>«Today is a historic day for our country.»</p>
        <p>👉 Historical: relacionado con la historia. </p>
        <p>«Archaeologist have found some historical bones.»</p>
        
      </article>
   <hr></hr>
   <article>
   
        <p>👉 Classic: típico o característico de su género. </p>
        <p>«Hamlet is a classic example of a tragedy.»</p>
        <p>👉 Classical: perteneciente al período clásico, relativo a la antigüedad griega y romana.</p>
        <p>«I listen to classical music when I have a bath.»</p>
        
      </article>
   <hr></hr>
   <article>
   
        <p>👉 Economic: relacionado con la economía.  </p>
        <p>«This year there has been very little economic growth.»</p>
        <p>👉 Economical: económico, que consume poco. </p>
        <p>«It would be more economical to buy a new boiler than to get it repaired.»</p>
        
      </article>
   <hr></hr>
   <article>
   
   <p>👉 Compliment: halagar/cumplido, halago.  </p>
    <p>– «You look younger each year darling.»</p>
    <p>– «Thanks for the compliment!»</p>
    <p>👉 Complement: complementar / complemento.</p>
    <p>«That handbag complements your outfit perfectly.»</p>
    <p>En el caso del sustantivo, normalmente se usa con la comida, por ejemplo: “This wine is the perfect complement for this fish dish.”.</p>
    <p>Si quieres hablar de un complemento de ropa, utilizarías ‘accessory’ 👒 .</p>
        
      </article>
   <hr></hr>
   <article>
   
   <p>👉 Plate: plato de cerámica.</p>
    <p>«Don’t put so much food on my plate, please. I’m on a diet.»</p>
    <p>👉 Dish: se refiere a ambos, plato de cerámica y de comida.</p>
    <p>«This wine is the perfect complement for this dish.»</p>
    
  </article>
   <hr></hr>
   <article>
   
   <p>👉 Lie: tumbarse. También significa mentir.</p>
    <p>«Lie down on the bed if you feel dizzy.»</p>
    <p>👉 Lay: poner, colocar.</p>
    <p>«Lay your head on my shoulder if you’re tired.»</p>
    <img
          src="https://www.amigosingleses.com/wp-content/uploads/2019/01/Screenshot-2019-01-09-at-11.57.33.png"
          alt="Imagen relacionada con el trabajo"
          style={{ width: "40%", height: "auto" }}
        />
  </article>
   <hr></hr>
   <article>
   
   <p>👉 Steal: apoderarse de algo que pertenece a otra persona de forma secreta. El énfasis se pone en el objeto robado.</p>
    <p>«Where did you get that phone from? Did you steal it?»</p>
    <p>👉 Rob: .</p>
    <p>«My dad was robbed last night outside the pub.»</p>
    
  </article>
   <hr></hr>
   <article>
   
        <p>👉 Historic: momento significativo en la historia.  </p>
        <p>«Today is a historic day for our country.»</p>
        <p>👉 Historical: relacionado con la historia. </p>
        <p>«Archaeologist have found some historical bones.»</p>
        
      </article>
   <hr></hr>


 
   

 
 
     
      


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
<Footer></Footer> */}
  </>
  )
}

export default StayCalmCashier
