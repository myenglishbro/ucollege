import React, { useState, useEffect } from 'react';
import styles, { layout } from "../style";
import "../index.css"

const Hito = ({ road, containerRefs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (containerRefs) {
      containerRefs.current = containerRefs.current.slice(0, road.length);
    }
  }, [road, containerRefs]);

  return (
    <div className="roadmap-container">
      {road.map((elemento, index) => (
        <div 
          key={index} 
          className="roadmap-step" // Removed custom class application
          ref={el => (containerRefs.current[index] = el)}
        >
          <div className="step-thumbnail">
            <img src={elemento.thumbnail} alt="Thumbnail" className="thumbnail-img" />
          </div>
          <div className={`${layout.sectionImg} flex-col`}>
            <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-2 mb-6`}>
              <div 
                className="flex-1 flex justify-start items-center flex-row m-3 cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <h4 className={styles.heading2}>
                  {elemento.title}
                </h4>
                <p className={`${styles.paragraph} max-w-full xs:max-w-[670px] mb-6`}>
                  {elemento.description}
                </p>
              </div>
            </section>
            {activeIndex === index && (
              <div className="accordion-content">
                <div className="flex-1 flex flex-col">
                  {elemento.enlaces.map((enlace, i) => (
                    <React.Fragment key={i}>
                      <div className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                        <div className="timeline-number">{i + 1}</div>
                        <a 
                          href={enlace.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="link" 
                          data-tooltip={enlace.mensaje}
                        >
                          {enlace.titulo}
                        </a>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hito;
