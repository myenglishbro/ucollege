import React, { useState } from 'react';
import styles, { layout } from "../style";

const Hito = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="roadmap-container">
      {props.road.map((elemento, index) => (
        <div 
          key={index} 
          className={`roadmap-step ${index !== props.road.length - 1 ? 'with-line' : ''}`}
        >
          <div className="step-thumbnail">
            <img src={elemento.thumbnail} alt="Thumbnail" className="thumbnail-img" />
          </div>
          <div className={`${layout.sectionImg} flex-col`}>
            <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-2 mb-6`}>
              <div 
                className={`flex-1 flex justify-start items-center flex-row m-3 cursor-pointer`}
                onClick={() => toggleAccordion(index)}
              >
                <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
                  {elemento.title}
                </h4>
              </div>
            </section>
            {activeIndex === index && (
              <div className="accordion-content">
                <p className={`${styles.paragraph} max-w-[670px] mb-6`}>
                  {elemento.description}
                </p>
                <p className={`${styles.paragraph} max-w-[670px] mb-6`}>
                  {elemento.channel}
                </p>
                <div className="flex-1 flex flex-col">
                  {elemento.enlaces.map((enlace, i) => (
                    <React.Fragment key={i}>
                      <div className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                        <div className="timeline-number">{i + 1}</div>
                        <a 
                          href={enlace.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="link thunder-bubble" 
                          data-tooltip={enlace.mensaje}
                        >
                          {enlace.titulo}
                        </a>
                      </div>
                      {(i + 1) % 10 === 0 && (
                        <img src={elemento.thumbnail} alt="Thumbnail" className="thumbnail-small" />
                      )}
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
