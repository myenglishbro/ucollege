import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'
import {data} from "../utils/data.js"
import Hero from './Hero'

const ModalVerbs = () => {
    const heroData = data[16]; // selecciona el primer objeto de datos, por ejemplo

  return (
    <>
    <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
  <div className='container-fluid mt-3'>
<div className='row gap-3 mx-3'>
  <div className='col-lg-7'>
    
    <h2 className='titulos-post'>Con nuestros hacks de gramática inglesa saldrás de esta clase con cualquier duda despejada</h2>
    <p>
    How many motivated students are there in class today?? Please raise your hand!! ¿Quién quiere dominar los verbos modales en inglés? Hoy, desde ucollege headquarters venimos a defender a los incomprendidos (y, a menudo, odiados) modals verbs. 
    </p>  
   <p>Ya sabes: can, could, would, should… Estos maravillosos verbos modales en inglés que NO, NO sirven de adorno, sino para salpimentar lo que dices de un montón de matices que necesitas, trust me!!!</p>
  <p>Vamos a ver cuáles son las principales características de los modal verbs, una lista completita de todos los que debes conocer y también encontrarás ejercicios en PDF recién sacados del horno solo para ti. Así que sit down and buckle up, ¡vamos a por los modal verbs!</p>
    <article>
    <h2 className='titulos-post'>¿Qué son los verbos modales en inglés?</h2>
     <p>Los modal verbs son verbos auxiliares que nos permiten expresar habilidad, prohibición, obligación; pedir permiso o dar sugerencias y consejos; e incluso especular. Not bad, ¿eh? Es que «they’re simply awesome!»</p>
    <p>Como cualquier verbo auxiliar, estos verbos modales no tienen realmente un significado por sí mismos, sino que su significado depende del contexto de la oración y de los verbos a los que acompañan. And yes, we know what you’re thinking now: y entonces…</p>
      <p>¿Cómo se utilizan los modal verbs?</p>
      <p>Great question, dear student. Saber usar los verbos modales en inglés es muy fácil si sigues estas 3 golden rules:</p>
      <ul className='listas'>
      <li>Golden Rule No. 1
      <p>Los modal verbs son invariables. No se conjugan, por lo que no debes añadirle la “-s” de la tercera persona.</p>
      <ol>
        <li>Correct: She can speak Chinese Mandarin</li>
        <li>Incorrect: She cans speak Chinese Mandarin3Además, recuerda que, a excepción de “Can”, los verbos modales en inglés no varían su forma cuando hablas del pasado o del futuro, así que no tienes que preocuparte de si son regulares o irregulares. Repeat after me: I-N-V-A-R-I-A-B-L-E-S. </li>
      </ol>
      </li>
      <li>Golden Rule No. 2 
      <p>Cuando usamos un modal verb para formular una pregunta, lo hacemos invirtiendo el sujeto y el verbo modal:</p>
      <ol>
        <li>Correct: Should I see a doctor?</li>
        <li>Incorrect: I should see a doctor?</li>
      </ol>
      </li>
      <li>Golden Rule No. 3 
      <p>Los modal verbs suelen ir seguidos de un infinitivo. Pero con este infinitivo nunca usaremos “to”. Esta forma del infinitivo se conoce como “bare infinitive”.</p>
      <ol>
        <li>Correct: I might do some online shopping later.</li>
        <li>Incorrect: I might to do some online shopping later.</li>
      </ol>
      </li>
     
      </ul>
      <p>👀 Ojito con esto, dear student, porque es un error muy frecuente. </p>
      <p>Y ahora que ya te sabes la teoría, vamos a ver cada modal verb en detalle:</p>
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'>Can </h2>
    <p>Se usa para… </p>
     <p>Expresar habilidad: Isabel can speak both English and Spanish. </p>
      <p>Pedir o dar permiso: Can I borrow your pen? Yes, of course you can!</p>
      
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'>Could, May & Might</h2>
     <p>Estos son los primos refinados de “Can”. Usamos “Could”, “May” y “Might” para pedir permiso de una manera más indirecta y más polite. </p>
      <ul className='listas'>
      <li>Could I speak to the manager, please?</li>
      <li>May I go to the bathroom?</li>
      <li>Might I have a word with you in private?</li>
      
      </ul>
      <p>¡Ah!, y recuerda que “Could” es la forma pasada de “Can”, por lo que también lo usaremos para expresar habilidad en el pasado:</p>
      <p>When I was younger, I could put my foot behind my head. I was super flexible!</p>
      
   
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'>Will & Would. </h2>
     <p> Todo motivated student ha tenido algún momento de confusión con “Will” y “Would”. Sin embargo, las diferencias entre los dos son muy sencillas: </p>
    <p>Usamos “Will” normalmente para hablar del futuro o de las intenciones que tenemos de hacer o que pase algo:</p>
    <p>Phillip and Isabel will be spending Christmas with their family.</p>
    <p>En cambio, “Would” se usa para preguntar o indicar deseos y preferencias de manera educada.</p> 
      <ul className='listas'>
      <li>Would you like some more coffee?</li>
      <li>I would rather not go for a walk in the rain, thank you very much.</li>
      </ul>
     <p>Además, recuerda que “Would” se usa para formar el condicional en inglés, por lo que también lo usamos para referirnos a situaciones hipotéticas:</p>
    <p>If I were rich, I would buy an island all for myself.</p> 
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'>Must & Have to</h2>
     <p>Tanto “Must” como “Have to” expresan obligación. La diferencia entre ellos es que con “Must” hablamos de una obligación impuesta por uno mismo, mientras que “Have to” se utiliza para hablar de obligaciones impuestas por otras personas o factores externos.</p>
      <ul className='listas'>
      <li>I must quit smoking 👉🏽  Estás empezando a notar ya los efectos sobre tus pobres pulmones…</li>
      <li>I have to quit smoking 👉🏽 Tu pareja te ha pedido firmemente que dejes de oler a cenicero…</li> 
      </ul>
      
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'> Shall, Should & Ought to</h2>
     <p> “Shall” y “Should” es otro de esos dúos que a veces confunde a los English students, así que disipemos dudas:</p>
     <p>Cuando usamos “Shall” en una pregunta, hacemos una sugerencia. Cuando lo usamos en una frase no interrogativa, hablamos de la intención de hacer algo en el futuro (similar a “Will” pero MUCHO más formal). </p>
  
      <ul className='listas'>
      <li>Shall I open a bottle of champagne?</li>
      <li>We shall leave early in the morning. (Esto apúntatelo para cuando tomes el té en Buckingham Palace 👑)</li>
      </ul>
     <p>“Should”, en cambio, se utiliza para expresar deber u obligación, normalmente cuando pedimos o damos consejo. Es algo así como “debería” en español. Fíjate</p>
     <ul className='listas'>
      <li>Should I ask my boss for a raise?</li>
      <li>You should visit your grandma, you haven’t seen her at all this week</li>
      </ul>
      <p>“Ought to” tiende a ser el más desconocido y, sin embargo, es TAN bonito y elegante. “Ought to” es un sinónimo de “Should”, pero es mucho más formal y menos frecuente, sobre todo en frases interrogativas. </p>
     <ul className='listas'>
      <li>You ought to travel together, it’s not safe to go alone.</li>
      <li>I ought to have studied more for my exams.</li>
      </ul>
    </article>
 <hr></hr>
 <article>
    <h2 className='titulos-post'> Modals of deduction</h2>
    <h3>“Must”, “May”, “Might” & “Can’t”</h3>
     <p> Los verbos modales de deducción en inglés nos permiten hacer conjeturas y especular sobre lo que creemos que puede estar ocurriendo o haber ocurrido. </p>
        <p>Si queremos especular sobre algo que ocurre en el presente o en el futuro, simplemente añadimos el verbo principal en infinitivo sin “to”, como hemos visto más arriba; y si queremos hacerlo en pasado, cambiamos este infinitivo por “have” + participio.</p>  
     <p>Usamos “Must” cuando estamos seguros de que algo es cierto:</p>
      <ul className='listas'>
      <li>That must be Isabel at the door, she said she’d come over for dinner.?</li>
      <li>These photos are amazing, you must have really enjoyed your holiday in Italy.</li>
      </ul>
     <p>En cambio, cuando utilizamos “May” y “Might”, solo pensamos que es probable:</p>
     <ul className='listas'>
      <li>I have a bad feeling I may have failed my driving test.</li>
      <li>We might move to Australia next year if our visas are approved. </li>
      </ul>
      <p>Con “Can’t” indicamos que creemos que algo es imposible:</p>
     <ul className='listas'>
      <li>I can’t have seen the Queen on the underground!</li>
      <li>You failed your driving test again? You can’t be serious!</li>
      </ul>
    </article>
 <hr></hr>
 <h2>¡Hora de practicar con ejercicios de los verbos modales!</h2>
 <p>If you want to make sure you’re a total expert on modal verbs, then you should practise!</p>
 <p>Let’s get down to it, shall we? 😉 Descarga nuestra funsheet de modals verbs en inglés y recibe en nuestro PDF interactivo ejercicios para practicar.</p>


 <div  className='box'>
<h4>📝 Descarga tu English funsheet</h4>
  <a href='https://drive.google.com/file/d/18jgleTga1F7z1ErMvrkf3Pz3TIjRK0Gn/view?usp=share_link'> <p>Descargar </p></a>
 
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

export default ModalVerbs
