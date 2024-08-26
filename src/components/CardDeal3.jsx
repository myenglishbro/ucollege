import React, { useEffect } from 'react';
import Section from "./Hero/Section";

const CardDeal3 = () => {
  useEffect(() => {
    // Load the YouTube API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Section className="pt-20 mt-26" crosses crossesOffset="lg:translate-y-20" customPaddings id="hero">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          Bienvenido a la Ruta de Aprendizaje Gratuita
        </h1>
        <p className="text-lg text-gray-300">
          Sigue esta ruta para mejorar tus habilidades en inglés y alcanzar tus metas.
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center gap-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/AtFAyHefJBY?si=Ms1Ap2VQ0Dv0OtNS"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>

        <div className="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>
      </div>
    </Section>
  );
};

export default CardDeal3;
