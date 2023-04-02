import React from 'react';
import './../css/map.css';

const Hito = (props) => {
  return (
    <div className="main">
      <h3 className="heading">Road to English Pokemon Master</h3>

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
