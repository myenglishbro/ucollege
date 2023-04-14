import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'

const Preliminary = () => {
  return (
    <>
      <div className='container-fluid'>
    <div className='row gap-3 mx-3'>
      <div className='col-lg-7'>
        <img
          src="https://images.pexels.com/photos/6347912/pexels-photo-6347912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Imagen relacionada con el trabajo"
          style={{ width: "100%", height: "auto" }}
        />
        <h2 className='titulos-post'>B1 Preliminary</h2>
        <p>
        ⚡️ El examen B1 Preliminary de Cambridge es algo distinto a partir de 2020. Aprobar este examen certifica que tienes un nivel de inglés intermedio y por tanto puedes comunicarte por escrito y oralmente así como entender textos del ámbito cotidiano.
        </p>
        <p>
        ⚡️ Es muy importante que conozcas bien las partes que lo componen, el tiempo que tienes para realizarlas y te prepares muy bien para bordarlo.
        </p>
        <h2>✏️PARTES B1 CAMBRIDGE 2020</h2>
        <article>
        <span className='titulos-post'>READING B1 – 45 minutos ( 25% de la nota total)</span>
        <p>El ejercicio de READING se compone de seis partes. Las primeras cuatro son textos de distinta extensión y las últimas dos partes son ejercicios más centrados en vocabulario y gramática.</p>       
        <p className='titulos-post'>1. Short Messages – Mensajes Cortos</p>
        <p>Aquí encontrarás  5 mensajes muy cortos y una pregunta de a,b o c por cada mensaje para comprobar que los has entendido. Se trata de mensajes de texto, notas, anuncios cortos, carteles …</p>
        <p className='titulos-post'>2. Matching – Emparejar</p>
        <p>Este ejercicio requiere mucha práctica. Por un lado te describirán a cinco personas y por otro te darán ocho textos cortos. Tu misión es emparejar a cada persona con el texto que más se adapte a ella. Por ejemplo, nos pueden describir los gustos culinarios de cinco personas y por otro lado nos describirán ocho restaurantes. Tu misión es asignar un restaurante a cada persona. Como ves, nos sobrarán tres opciones que no corresponderán a ningún hablante.</p>
        <p className='titulos-post'>3. Multiple Choice – Opción Múltiple</p>
       <p>Se trata de un texto más largo y cinco preguntas sobre él de opción múltiple A, B, C, D. Aquí deberemos entender no solo el sentido general del texto, sino también la intención del lector y prestar atención a los detalles. Las preguntas están en orden así que lee la primera y busca la respuesta en el primer párrafo. Avanza poco a poco y presta mucha atención. Te aconsejo subrayar la información relevante para que te resulte más fácil repasar.</p>
       <p className='titulos-post'>4. Gapped Text – Texto con huecos</p>
        <p>Por un lado verás un texto con cinco huecos y por otro frases sueltas. Tu objetivo en insertar las frases en el texto de manera ordenada para que la lectura cobre sentido. Te darán ocho frases pero solo necesitarás cinco.</p>
        <p className='titulos-post'>5. Multiple choice + Gapped text</p>
   <p>En este ejercicio evaluarán, además de tu comprensión lectora, tu gramática y vocabulario. Se trata de un texto corto con seis huecos y opciones de A, B, C o D para cada hueco.</p>
        <p className='titulos-post'>6. Gapped Text</p>
   <p>Esta vez el ejercicio consiste en un texto corto con seis huecos que deberás rellenar. Entre las cosas más típicas que suelen aparecer están las preposiciones ( of, on, in, at …) , verbos auxiliares (be, been, must …) , pronombres personales (she, it, we …), pronombres demostrativos (this, those …), pronombres posesivos (my, his, their…) o pronombres objeto (me, us, them…).</p>

        </article>

        <article>
        <span className='titulos-post'>WRITING B1 – 45 minutos (25% de la nota total)</span>
        <p>En esta parte deberás crear dos textos.</p>
        <p className='titulos-post'>1. INFORMAL EMAIL – Email Informal</p>
        <p>   Tendrás que elegir una de estas dos opciones:</p>  
        <ul>
            <li>ARTICLE B1
            <p>Si eliges esta opción deberás escribir alrededor de 100 palabras sobre el tema que te propongan con un registro estándar. En este ejercicio los temas más frecuentes están relacionados con el entretenimiento: películas, libros, obras de teatro, conciertos, restaurantes …</p>
            </li>
            <li>STORY B1
            <p>Al elegir esta opción tendrás que crear una historia usando unas 100 palabras. En la tarea te darán la primera frase con la que deberás empezar tu texto o bien la frase con la que concluirá. Recuerda llevar muy bien aprendidos los conectores para secuenciar así como los tiempos verbales en pasado.</p>
            </li>

        </ul>
        </article>

        <article>
        <span className='titulos-post'>LISTENING B1 – 30 minutos (25% de la nota final)</span>
        <p>Escucharás cada grabación DOS veces.</p>
        <p className='titulos-post'>1. Imágenes</p>
        <p>  En el primer ejercicio encontrarás siete preguntas y tres imágenes por cada una de ellas. Deberás elegir en cada caso la imagen que mejor conteste a la pregunta. BE CAREFUL! Todas las opciones serán mencionadas, pero solo una será correcta.</p>  
        <img
          src="https://www.inglesparaperezosos.com/wp-content/uploads/2020/08/B1-LISTENING-PART-1.png"
          alt="Imagen relacionada con el trabajo"
          style={{ width: "40%", height: "auto" }}
        />
        <p className='titulos-post'>2. Short extracts</p>
        <p>Escucharás seis diálogos cortos y tendrás que responder una pregunta tipo test sobre cada uno de ellos.</p>
        <p className='titulos-post'>3. Gapped text – Texto con huecos</p>
        <p>El ejercicio consiste en un texto con seis huecos que tienes que rellenar con la información exacta que escuches en la grabación. Normalmente se trata de fechas, números, lugares u objetos cotidianos.</p>
        <p className='titulos-post'>4. Entrevista</p>
        <p>Aquí escucharás una entrevista a una persona y tendrás que responder a seis preguntas tipo test sobre las opiniones del entrevistado. Aunque es una grabación algo más larga, la información siempre estará en orden así que subraya bien las palabras clave en tu examen para tener una guía al escuchar.</p>
    
        </article>

        <article>
        <span className='titulos-post'>SPEAKING – 12 minutos (25% de la nota final)</span>
        <p>Harás el examen con otro candidato. En la mayoría de las ciudades puedes elegir con quién realizarlo, pero pregunta en tu centro. De cualquier forma, ellos te asignarán un compañero, normalmente por orden de llegada.</p>
        <p className='titulos-post'>1. Entrevista personal breve</p>
        <p> Al empezar, el examinador te preguntará por tus aficiones, tu ocupación, tu familia, estudios, tu ciudad … Serán preguntas fáciles para romper el hielo y que vayas soltándote.</p>  
        <p className='titulos-post'>2. Describir una fotografía</p>
        <p>Deberás describir una fotografía durante un minuto de forma individual. Es importante que practiques en casa con un cronómetro y que secuencies bien lo que eres capaz de expresar en un minuto.</p>
        <p className='titulos-post'>3. Discusión en pareja</p>
        <p>El examinador describirá una situación y os dará distintos puntos a comentar. Tendréis 3-4 minutos para hablar de los puntos y decidir qué opción es la más conveniente o la mejor idea.
            El ejercicio será algo similar a esto:
            Your English teacher is leaving Spain and you and your class want to buy her a present to thank her for all she has done for you this year.
            Speak about these options and choose the best one.</p>
        <img
          src="https://www.inglesparaperezosos.com/wp-content/uploads/2020/08/b1-presents-teacher-1536x864.png"
          alt="Imagen relacionada con el trabajo"
          style={{ width: "40%", height: "auto" }}
        />
        <p className='titulos-post'>4. Preguntas más complejas</p>
        <p>El examinador os hará preguntas sobre el tema que habéis discutido en la parte 3 para que mostréis vuestra opinión. También puede incluir preguntas sobre otros temas para comprobar vuestro nivel de vocabulario.</p>
    
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


export default Preliminary
