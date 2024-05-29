import React, { useState, useEffect } from 'react';
import styles, { layout } from "../style";

const Hitob2 = ({ roadmed = [], containerRefs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (containerRefs && roadmed.length > 0) {
      containerRefs.current = containerRefs.current.slice(0, roadmed.length);
    }
  }, [roadmed, containerRefs]);

  if (!roadmed || roadmed.length === 0) {
    return <div>No roadmap data available.</div>;
  }

  return (
    <div className="roadmap-container">
      {roadmed.map((elemento, index) => (
        <div 
          key={index} 
          className={`roadmap-step ${index !== roadmed.length - 1 ? 'with-line' : ''}`}
          ref={el => (containerRefs.current[index] = el)}
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

export default Hitob2;
