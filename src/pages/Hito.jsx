import React from 'react'
import './../css/map.css'

const Hito = (props) => {
  return (
    <div className="main">
      <h3 className="heading">{props.title}</h3>

      <div className="container">
        <ul>
          {props.road.map((elemento, index) => (
            <li key={index}>
              <h3 className="title">{elemento.title}</h3>
              <p>{elemento.description}</p>
              <a href={elemento.enlace}>Read More </a>
              <span className="circle"></span>
              <span className="date">{elemento.fecha}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Hito
