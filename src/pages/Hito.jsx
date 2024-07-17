import React, { useEffect } from 'react';
import "../index.css";

const Hito = ({ road, containerRefs }) => {
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
          className="roadmap-step"
          ref={el => (containerRefs.current[index] = el)}
        >
          <div className="step-thumbnail">
            <img src={elemento.thumbnail} alt="Thumbnail" className="thumbnail-img" />
          </div>
          <div className="flex-col">
            <section className="flex-row flex-wrap sm:mb-2 mb-6">
              <div className="flex-1 flex justify-start items-center flex-row m-3 cursor-pointer">
               
                <p className="max-w-full xs:max-w-[670px] mb-6">
                  {elemento.description}
                </p>
              </div>
            </section>
            <div className="accordion-content">
              <div className="flex-1 flex flex-col">
                {elemento.enlaces.map((enlace, i) => (
                  <div key={i} className="timeline-item">
                    <div className="timeline-number">{i + 1}</div>
                    <div className="link-title">
                      <a href={enlace.url} target="_blank" rel="noopener noreferrer">{enlace.titulo}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hito;
