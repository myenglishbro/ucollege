import React from "react";
import { check2, grid } from "../asset";
import { Gradient } from "../components/design/Roadmap";
import Tagline from "../components/Tagline";

const Staff = ({ thumbnail, title, subtitle, description, calificacion, precio, enlaces }) => {
  return (
    <div className="relative p-0.25 rounded-[2.5rem] bg-n-6 overflow-hidden">
      <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
        <div className="absolute top-0 left-0 max-w-full opacity-10">
          <img className="w-full" src={grid} width={550} height={550} alt="Grid" />
        </div>
        <div className="relative z-1">
          <div className="flex items-center justify-between max-w-[27rem] mb-6 md:mb-12">
            <Tagline>{subtitle}</Tagline>
            <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
              <img className="mr-2.5" src={check2} width={16} height={16} alt="Verified" />
              <div className="tagline">Verified</div>
            </div>
          </div>
          <div className="mb-6 flex justify-center">
            <img className="w-[80%] md:w-[60%] rounded-xl shadow-lg" src={thumbnail} alt={title} />
          </div>
          <h4 className="h4 mb-3 text-white text-center">{title}</h4>
          <p className="body-2 text-n-4 text-center">{description}</p>
          <div className="flex items-center justify-between mt-6 px-4 md:px-8">
            <span className="text-yellow-400 font-semibold text-lg md:text-xl">⭐ {calificacion}</span>
            <span className="text-green-500 font-semibold text-lg md:text-xl">💲{precio}</span>
          </div>
          <div className="mt-6 flex justify-center">
            <a
              href={enlaces}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 shadow-md"
            >
              Descargar
            </a>
          </div>
        </div>
      </div>
      <Gradient />
    </div>
  );
};

export default Staff;
