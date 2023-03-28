import React from 'react'
import { FcAssistant } from "react-icons/fc";

const Articulo = ({thumbnail, title, subtitle, dateAdded, description, channel, enlaces}) => {

  // Estilos que reciben props
  const styles = {
    colImg: {
      backgroundImage: `url(${thumbnail})`,
      backgrounSize: 'cover',
      backgroundRepeat: 'no-repeat',
      margingTop: '70px',
      minHeight: '100px',
    },
    h1: {
      color: channel === 'English' ? 'blue' : 'black', // Ejemplo de uso de props en los estilos
    },
  };
  
  const renderLinkText = (index) => {
    if (index === enlaces.length - 1) {
      return 'Archivo de Clase';
    } else {
      return `Simulación ${index + 1}`;
    }
  };

  return (
    <>
      <section class="row w-100 py-0 bg-light mt-5">
        <div class="col-lg-6 d-none d-sm-block" style={styles.colImg} ></div>
        <div class="col-lg-6 py-5">
            <div class="container">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <h6>{subtitle}</h6>
                        <h1>{title}</h1>
                         <p>{description}</p>
                        <div class="feature d-flex mt-5">
                            <div class="icon-sm me-4">
                            </div>
                            <div>
                                <h5> Clases 100% Online</h5>
                                <p> Clases 100% virtuales y en vivo desde tu celular, tablet o computadora. </p>
                            </div>
                        </div>
                        <div class="feature d-flex">
                            <div class="icon-sm me-4">
                            </div>
                            <div>
                                <h5> A tu tiempo y a tu ritmo</h5>
                                <p> ¡Olvídate de los horarios! Todos nuestros cursos de inglés están disponibles 24/7.
                                    Puedes
                                    repetir los cursos las veces que necesites. </p>
                            </div>
                        </div>
                        <div class="feature d-flex">
                            <div class="icon-sm me-4">
                            <FcAssistant></FcAssistant>
                            </div>
                            <div>
                              <h5>Enlaces de Speaking Practice</h5>
                                {enlaces.map((link, index) => (
                                  <a href={link} target='_blank'>
                                    <p key={index}>
                                      {renderLinkText(index)}
                                    </p>
                                  </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Articulo;
