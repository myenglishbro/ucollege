import React from 'react'
import Descargables from './Descargables';
import Footer from './Footer';
import {data} from "../utils/data.js"
import Hero from './Hero';

const FalseFriends = () => {
    const heroData = data[21]; // selecciona el primer objeto de datos, por ejemplo

    return (
      <>
                <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
  
      <div className='container-fluid'>
    <div className='row gap-3 mx-3'>
      <div className='col-lg-7'>
      <h2>Los 'Falsos Amigos' del inglés ("False Friends")</h2>
      <p>Los ‘Falsos Amigos’ ‘False Friends’ son palabras que son similares entre dos idiomas pero que tienen un significado diferente y que muchas veces llevan a confusión.</p>
     <p>Entre el inglés y el español tenemos una cantidad enorme de falsos amigos que pueden producir más de un ‘resbalón lingüístico’.</p>
     
     <p>

Aquí presento varios ejemplos ‘en contexto’ para que no metas demasiado la pata cuando hables en inglés.</p>
      <hr></hr>
  
        <article>
        <span className='titulos-post'>False Friends: Ejemplos</span>
      
        <p>👉 Si estás en Londres  y vas a la farmacia a comprar algo para calmar los síntomas de un ‘constipado, ni se te ocurra decirle al farmacéutico ‘I am constipated’. </p>
        <ul>
          <li>‘To be constipated’ en inglés significa estar estreñido.</li>
          
          </ul>
          <p>👉O sea que, si te tomas lo que te den para el resfriado, no sólo no te recuperarás rápidamente, sino que puede que además te produzca una diarrea (UK: diarrhoea—-US: diarrhea).</p>
        <p>Y no cometas el tremendo error de si el bote de pastillas te pone que tomes ‘once’ al día, tomarte 11 pastillas.</p>
        <ul>
          <li>‘Once’ en inglés significa ‘una vez’.</li>
          <li>Cuando te dicen que alguien es ‘a bigoted person’, no te están explicando que esa persona tiene ‘bigote’, sino que se trata de una persona intolerante o con prejuicios.</li>
          <li>Lo mismo pasaría con una persona considerada ‘callous’…. que no es que tenga ‘callos en los pies’, sino que se trata de una persona insensible y cruel.</li>
         <li>Si alguien te informa que en el suelo/piso de su casa tiene puesta ‘carpet’, no es que haya cubierto el piso de carpetas en plan postmoderno o kitsch , sino que ha puesto moqueta.</li>
         <li>Si necesitas consejo legal, ve a visitar a un ‘lawyer’ no a un ‘avocado’, porque podrías encontrarte con un ‘aguacate con corbata’.</li>
         <li> Y estas equivocaciones pasan ‘por casualidad’ ‘by chance’, no por ‘casualty’ que significa una persona herida o fallecida (víctima).</li>
         <li>Si te tiran un ‘compliment’, no te están lanzando un ‘complemento’ (tipo collar o bolso) a la cabeza, te están echando un piropo, y eso siempre es de agradecer.</li>
         
          </ul>
          <span className='titulos-post'>Si te invitan a salir</span>
  
          <p>Que alguien te pida una ‘date’ no significa que necesite algún dato en concreto, quiere una cita romántica, no la desaproveches… que no está el horno para bollos.</p>
          <p>Date también significa ‘fecha‘: Today’s date is October 18–La fecha de hoy es 18 de octubre</p>
          <ul>
          <li>Pero ten cuidado no caigas en una ‘deception’ que no es una ‘decepción’, sino un engaño.</li>
          <li>Si en esa cita, tu pareja te ofrece un zumo de ‘currant’, no te preocupes, suena a ‘currante’ pero se trata de un zumo de grosella que sabe delicioso.</li>
          <li>Podrían invitarte al teatro. Si estás en Londres no te pierdas ‘Les Misérables’, que por cierto, sentirse ‘miserable’ significa sentirse deprimido o triste. Ya estáis en el teatro, y te propone tomarte algo en el ‘foyer’… no te está pidiendo que ‘f****’ allí mismo, el ‘foyer’ es el vestíbulo, la entrada.</li>
         <li>Al salir del espectáculo podríais ir a cenar algo. Después de un buen plato de ‘salad’ (ensalada, no ‘algo salado’), el camarero te puede ofrecer ‘dessert’, no tienes que ‘desertar’ ni huir hacia el ‘desierto’, sólo tienes que pedirte un postre.</li>
         <li>Luego, tu pareja, que es muy rico/a y muy generoso/a, te invitará (nada de pagar a medias-to go Dutch-) y tendrá que pagar con ‘money’ no con ‘dinner’ (que significa cena y es lo que acabas de hacer…).</li>
         <li>Si conversáis y le explicas que te sientes disgustada por algo no le digas que estás ‘disgusted’ (asqueado/a), sólo que estás algo ‘upset’.</li>
         <li>Si te pones colorada y tu cita te pregunta si te sientes ‘embarrassed’ no es que te vea gorda y piense que estás embarazada. ‘To be embarrassed’ significa estar avergonzado.</li>
         <li>Si te dice que el es un tipo ‘entrepreneur’ no es que se esté fijando en tu ‘entrepierna’. Te está explicando que es empresario.</li>
         <li>Si te acompaña al ‘exit’ no es tu compañero de éxitos, te estará acompañando a la salida.</li>
        <li>Seguro que tu pareja es un tipo ‘sensible’ (sensato) y puede que también algo ‘sensitive’ (sensible) así que no te tendrá en cuenta todas las equivocaciones que hayas podido cometer por culpa del idioma (language). ‘Idiom’ significa frase hecha o refrán. Y ahora sólo os queda ‘enjoy’ (disfrutar) la noche. ‘Enjoy’ no es enjoyarse, aunque si se ofrece a regalarte un par de diamantes, tampoco le digas que no.</li>
          </ul>
         
        </article>
     <hr></hr>
     <article>
     <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">English</th>
      <th scope="col">Pronunciation</th>
      <th scope="col">Spanish</th>
      <th scope="col">LO QUE NOS CONFUNDE “xxxx” (español) SE DICE “yyyy” (en inglés)</th>
      <th scope="col">Pronunciation</th>


    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Actually</td>
      <td>ˈæktʃuəli</td>
      <td>En realidad</td>
      <td>Actualmente: nowadays</td>
      <td>ˈnaʊədeɪz

</td>
    </tr>
    <tr>
      <td>Agenda</td>
      <td>əˈdʒendə</td>
      <td>Orden del día</td>
      <td>Agenda: diary</td>
      <td>ˈdaɪəri</td>
    </tr>
    <tr>
      <td>Apology</td>
      <td>əˈpɒlədʒi</td>
      <td>Disculpa</td>
      <td>Apología: defense of</td>
      <td>dɪˈfens ɒv</td>
    </tr>
    <tr>
      <td>Arena</td>
      <td>əˈriːnə</td>
      <td>Estadio</td>
      <td>Arena: sand</td>
      <td>sænd</td>
    </tr>
    <tr>
      <td>Argument</td>
      <td>ˈɑːɡjumənt</td>
      <td>Discusión</td>
      <td>Argumento: plot</td>
      <td>plɒt</td>
    </tr>
    <tr>
      <td>Assist</td>
      <td>əˈsɪst</td>
      <td>Ayudar</td>
      <td>Asistir: attend</td>
      <td>əˈtend</td>
    </tr>
    <tr>
      <td>Avocado</td>
      <td>ˌævəˈkɑːdəʊ</td>
      <td>Aguacate</td>
      <td>Abogado: lawyer/attorney</td>
      <td>ˈlɔːjər əˈtɜːni</td>
    </tr>
    <tr>
      <td>Bland</td>
      <td>blænd</td>
      <td>Soso</td>
      <td>Blando: soft</td>
      <td>sɒft</td>
    </tr>
    <tr>
      <td>Camp</td>
      <td>kæmp</td>
      <td>Campamento</td>
      <td>Campo: field</td>
      <td>fiːld</td>
    </tr>
    <tr>
      <td>Career</td>
      <td>kəˈrɪə</td>
      <td>Carrera profesional</td>
      <td>Carrera (universitaria): degree</td>
      <td>dɪˈɡriː |
</td>

      </tr>
      <tr>
      <td>Carpet</td>
      <td>ˈkɑːpɪt</td>
      <td>Moqueta</td>
      <td>Carpeta: file</td>
      <td>faɪl</td>
</tr>
<tr>
      <td>Casualty</td>
      <td>ˈkæʒʊəlti</td>
      <td>Víctima</td>
      <td>Casualidad: coincidence</td>
      <td>kəʊˈɪnsɪdəns</td>
</tr>
<tr>
      <td>Commodity</td>
      <td>kəˈmɒdɪti</td>
      <td>Producto</td>
      <td>Comodidad: comfort</td>
      <td>ˈkʌmfət</td>
</tr>
<tr>
      <td>Compliment</td>
      <td>ˈkɒmplɪment</td>
      <td>Piropo</td>
      <td>Complemento: accessory</td>
      <td>əkˈsesəri</td>
</tr>
<tr>
      <td>Conductor</td>
      <td>kənˈdʌktə</td>
      <td>Director orquesta</td>
      <td>Conductor: Driver</td>
      <td>ˈdraɪvə</td>
</tr>
<tr>
      <td>Constipation</td>
      <td>ˌkɒnstɪˈpeɪʃn̩</td>
      <td>Estreñimiento</td>
      <td>Constipado: cold</td>
      <td>kəʊld</td>
</tr>
<tr>
      <td>Currant</td>
      <td>ˈkʌrənt</td>
      <td>Grosella</td>
      <td>Currante: worker</td>
      <td>ˈwɜːkə</td>
</tr>
<tr>
      <td>Deception</td>
      <td>dɪˈsepʃn̩</td>
      <td>Engaño</td>
      <td>Decepción: disappointment</td>
      <td>ˌdɪsəˈpoɪntmənt</td>
</tr>
<tr>
      <td>Dessert</td>
      <td>dɪˈzɜːt</td>
      <td>Postre</td>
      <td>Desierto: desert</td>
      <td>‘dezət</td>
</tr>
<tr>
      <td>Dinner</td>
      <td>ˈdɪnə</td>
      <td>Cena</td>
      <td>Dinero: money</td>
      <td>ˈmʌni</td>
</tr>
<tr>
      <td>Discussion</td>
      <td>dɪˈskʌʃn̩</td>
      <td>Debate</td>
      <td>Discusión: argument</td>
      <td>ˈɑːɡjumənt</td>
</tr>
  </tbody>
</table>
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

export default FalseFriends
