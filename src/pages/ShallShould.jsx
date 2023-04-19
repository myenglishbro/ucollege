import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'
import {data} from "../utils/data.js"
import Hero from './Hero'

const ShallShould = () => {
    const heroData = data[15]; // selecciona el primer objeto de datos, por ejemplo

  return (
    <>
      <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
    <div className='container-fluid mt-3'>
  <div className='row gap-3 mx-3'>
    <div className='col-lg-7'>
      
      <h2 className='titulos-post'>Con nuestros hacks de gramática inglesa saldrás de esta clase con cualquier duda despejada</h2>
      <p>
      Let’s solve the mystery, shall we? ¿Estás decidido a dominar los verbos modales shall y should para siempre? Quédate hasta el final porque te desvelaremos el error nº1 que casi todos los estudiantes comenten cuando usan el verbo modal shall en inglés. Are you one of them?      </p>
    

      <article>
      <h2 className='titulos-post'>¿Cómo usamos SHALL y SHOULD en inglés?</h2>
      <p>Más o menos tenemos claro cómo se usa should en inglés, pero shall es el verbo modal que nos trae un poquito de cabeza, ¿verdad?  It drives us a little bit nuts, to say the least! Let’s get down to business!</p>
       <p>Usamos shall para hacer ofrecimientos.</p>
        <p>El verbo modal shall, se usa en forma de pregunta cuando ofrecemos ayuda. Esto ocurre, sobretodo en inglés Británico. </p>
        <p>¡Los buenos ciudadanos educados usan shall a todas horas!</p>
        <ul className='listas'>
        <li>Shall I help you with the bags, madam? – ¿Le echo una mano con las bolsas, señora?</li>
        <li>Shall I hold the door for you? – ¿Le sujeto la puerta?</li>
        <li>Shall I take your coat? – ¿Le tomo el abrigo?</li>
        <li>Shall I call you a taxi? – ¿Le pido un taxi?</li>
        </ul>
        
      </article>
   <hr></hr>
   <article>
      <h2 className='titulos-post'>Usamos shall para hacer sugerencias. </h2>
      <p>En ucollege Headquarters nunca falta el té inglés, así que cada dos por tres se escucha:</p>
       <p>Shall we make some more tea? – ¿Hago más té? Y la respuesta siempre es: Yes, please!</p>
        <p>Your stomach’s rumbling! – ¡Te están sonando las tripas! </p>
        <p>Shall we make a sandwich? – ¿Preparamos un sándwich?</p>
        <p>¡Tenemos invitados para cenar, me había olvidado!</p>
        <ul className='listas'>
        <li>I can’t be bothered to cook. – No me apetece nada cocinar.</li>
        <li>Shall we buy precooked food? – ¿Compramos la cena hecha?</li>
        <li>Shall we make vegetable lasagna? – ¿Hacemos lasaña de verduras?</li>
        <li>¿Compro leche de avena para la salsa? – Shall we buy oat milk for the sauce? </li>
        </ul>
        <p>Challenge! Cambiamos lasaña vegetal por lasaña de carne. Mira esta frase. ¿Cuál es la diferencia cuando usamos should en vez de shall? 🙄</p>
        <ul className='listas'>
        <li>Shall I make a meat lasagna?</li>
        <li>Should I make a meat lasagna? </li>
        </ul>
        <p>En el primer caso crees que es buena idea hacer lasaña de carne. </p>
        <p>En el segundo caso no estás seguro de si es la mejor opción. Estás pidiendo aprobación, quizás hay algún vegetariano en el grupo y no quieres meter la pata. You don’t want to put your foot in it.</p>
        <ul className='listas'>
        <li>Shall I make a meat lasagna? 👉🏼sugerencia</li>
        <li>Should I make a meat lasagna? 👉🏼 pides consejo</li>
        </ul>
        <p>🤓 Usamos should también para dar nuestra opinión.</p>
        <p>You should cook a vegetable lasagna, Jane is a vegan. – Deberías hacer lasaña vegetal, Jane es vegana.</p>
      </article>
   <hr></hr>
   <article>
      <h2 className='titulos-post'>Usamos shall para pedir opinión. </h2>
      <p>¿Algún estudiante indeciso por aquí? Si te pasas el día dudando y pidiendo la opinión de tus amigos, entonces vas a hacer buenas migas con shall.</p>
       <p>A Gabriela le han invitado a un evento muy glamouroso y está buscando un modelito para la ocasión. </p>
        <ul className='listas'>
        <li>Shall I wear these earrings? – ¿Llevo estos pendientes?</li>
        <li>What shall I do with my hair? – ¿Qué hago con mi pelo?</li>
        <li>¿Shall I do it up? – ¿Me hago un recogido?</li>
        <li>What lipstick shall I put on? Red, pink… – ¿Qué pintalabios me pongo? Rojo, rosa…</li>
        <li>Shall I wear these shoes? – ¿Llevo estos zapatos?</li>
        </ul>
        <p>¡La pregunta del millón! 💰 ¿Sería apropiado usar should en las frases anteriores?</p>
        <p>¡Claro que sí! En este caso tendría una connotación diferente. Usarías should si estás dudando sobre si llevar esa prenda, zapatos…sea una buena idea.</p>
        <p>Should I wear theses shoes?</p>
        <p>¿Crees que debería llevar estos zapatos? ¿Es buena idea? Igual no pegan con el vestido, tienen demasiado tacón y te van a hacer daño…</p>
       <p> 🤓 En frases interrogativas en inglés, utilizamos should para pedir consejo o instrucciones.</p>
       
       <p>Shall se usa también para hablar del futuro con el mismo significado que will, ¿verdad? </p>
      </article>
   <hr></hr>
   <article>
      <h2 className='titulos-post'>Usamos shall para hablar del futuro, como sustituto de WILL. </h2>
       <p> ¡Pero no siempre, cuidadito! Mira estas frases y dinos cuál te suena más natural: </p>
        <ul className='listas'>
        <li>1) I will send you a postcard from Edinburgh.</li>
        <li>2) I shall send you a postcard from Edinburgh.</li>
        </ul>
        <p>La primera, ¿no? Elementary my dear Watson. Sin, embargo la segunda frase es perfectamente correcta, pero solo sería apropiada en un entorno muy formal. En un contexto informal te haría sonar bastante anticuado y un poco pedante</p>
        <p>Ahora imagina que trabajas en Buckingham Palace y estás al teléfono con la mismísima Elizabeth II, Her Majesty, en este caso, usarías shall en lugar de will, para añadir formalidad.</p>
       <p> We shall arrange a pheasant for Christmas lunch at Windsor Castle, Your Majesty. 👑</p>
       
       <p>¿Entonces para que te enseñamos este uso de shall si lo más probable es que no te codees con la realeza? Pon las noticias de BBC News y apunta cuantas veces escuchas el verbo modal shall. ¡Los reporteros de la BBC lo usan a todas horas! </p>
      </article>
   <hr></hr>
   <article>
      <h2 className='titulos-post'>Usamos shall para pedir opinión. </h2>
      <p>¿Algún estudiante indeciso por aquí? Si te pasas el día dudando y pidiendo la opinión de tus amigos, entonces vas a hacer buenas migas con shall.</p>
       <p>A Gabriela le han invitado a un evento muy glamouroso y está buscando un modelito para la ocasión. </p>
        <ul className='listas'>
        <li>Shall I wear these earrings? – ¿Llevo estos pendientes?</li>
        <li>What shall I do with my hair? – ¿Qué hago con mi pelo?</li>
        <li>¿Shall I do it up? – ¿Me hago un recogido?</li>
        <li>What lipstick shall I put on? Red, pink… – ¿Qué pintalabios me pongo? Rojo, rosa…</li>
        <li>Shall I wear these shoes? – ¿Llevo estos zapatos?</li>
        </ul>
        <p>¡La pregunta del millón! 💰 ¿Sería apropiado usar should en las frases anteriores?</p>
        <p>¡Claro que sí! En este caso tendría una connotación diferente. Usarías should si estás dudando sobre si llevar esa prenda, zapatos…sea una buena idea.</p>
        <p>Should I wear theses shoes?</p>
        <p>¿Crees que debería llevar estos zapatos? ¿Es buena idea? Igual no pegan con el vestido, tienen demasiado tacón y te van a hacer daño…</p>
       <p> 🤓 En frases interrogativas en inglés, utilizamos should para pedir consejo o instrucciones.</p>
       
       <p>Shall se usa también para hablar del futuro con el mismo significado que will, ¿verdad? </p>
      </article>
   <hr></hr>
   <article>
      <h2 className='titulos-post'> Usamos shall en questions tags con «Let’s»</h2>
       <p> Let’s wrap this lesson up, shall we?</p>
       <p>¡Es broma! Vamos a practicar un poco, ¿te parece?</p>
       <p>Let’s practice, shall we?</p>
        <ul className='listas'>
        <li>1) I will send you a postcard from Edinburgh.</li>
        <li>2) I shall send you a postcard from Edinburgh.</li>
        </ul>
        <p>La primera, ¿no? Elementary my dear Watson. Sin, embargo la segunda frase es perfectamente correcta, pero solo sería apropiada en un entorno muy formal. En un contexto informal te haría sonar bastante anticuado y un poco pedante</p>
        <p>Ahora imagina que trabajas en Buckingham Palace y estás al teléfono con la mismísima Elizabeth II, Her Majesty, en este caso, usarías shall en lugar de will, para añadir formalidad.</p>
       <p> We shall arrange a pheasant for Christmas lunch at Windsor Castle, Your Majesty. 👑</p>
       
       <p>¿Entonces para que te enseñamos este uso de shall si lo más probable es que no te codees con la realeza? Pon las noticias de BBC News y apunta cuantas veces escuchas el verbo modal shall. ¡Los reporteros de la BBC lo usan a todas horas! </p>
      </article>
   <hr></hr>


   <div  className='box'>
<h4>📝 Descarga tu English funsheet</h4>
    <a href='https://drive.google.com/file/d/1vv3YUyRvTetoL-HzKiZisY2uW5Zf1-Fy/view?usp=share_link'> <p>Descargar </p></a>
   
  </div>
   

 
 
     
      


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

export default ShallShould
