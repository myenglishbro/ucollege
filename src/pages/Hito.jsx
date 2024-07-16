import React, { useState, useEffect } from 'react';
import styles, { layout } from "../style";
import "../index.css";

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

  const getYoutubeVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
      }
      return null;
    } catch (error) {
      console.error("Invalid URL:", url);
      return null;
    }
  };

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
                  {elemento.enlaces.map((enlace, i) => {
                    const videoId = getYoutubeVideoId(enlace.url);
                    return (
                      <React.Fragment key={i}>
                        <div className={`timeline-item ${i % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}>
                          <div className="timeline-number">{i + 1}</div>
                          {videoId ? (
                            <iframe
                              width="560"
                              height="315"
                              src={`https://www.youtube.com/embed/${videoId}`}
                              title={`YouTube video player - ${enlace.titulo}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                              className="video-iframe"
                            ></iframe>
                          ) : (
                            <div className="link-title">
                              <a href={enlace.url} target="_blank" rel="noopener noreferrer">{enlace.titulo}</a>
                            </div>
                          )}
                        </div>
                      </React.Fragment>
                    );
                  })}
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
