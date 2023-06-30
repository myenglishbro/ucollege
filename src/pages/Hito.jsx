import React from 'react';
import './../css/map.css';
import { Helmet } from 'react-helmet';

const Hito = (props) => {
  return (
    <div className="main">
      <h4 className="heading">Road to Fluency!</h4>
      <Helmet>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </Helmet>
      <div class="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>
      <div>
        <a
          href="https://chat.whatsapp.com/HecHr72mZGVDBcjPbMOeta"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          <button className='btn btn-success p-2 mt-3'>Grupo de WhatsApp</button>
        </a>
      </div>
      <h3 className="heading">{props.title}</h3>
      <div className="container">
        <ul>
          {props.road.map((elemento, index) => (
            <li key={index}>
              <h3 className="title">{elemento.title}</h3>
              <p>{elemento.description}</p>
              <div>
                {elemento.enlaces.map((enlace, i) => (
                  
                  <a href={enlace.url} target="_blank"><p key={i}>{enlace.titulo}</p></a>

                
                                  ))}
              </div>

              <span className="circle"></span>
              <span className="date">{elemento.dateAdded}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Hito;
