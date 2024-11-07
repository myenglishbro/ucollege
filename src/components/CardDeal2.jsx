import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Button2 from "./Button2";
import Section from "./Hero/Section";
import { grid, check2, loading1 } from "../assets2";

const CardDeal2 = ({ realname, userImage, nivel }) => {
  const defaultImage = 'https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png';

  return (
    <Section
      className="overflow-hidden bg-gradient-to-r to-blue-700"
      id="hero"
    >
      <div className="container relative z-1 max-w-4xl mx-auto text-center py-20 px-6 md:px-10 lg:px-16">
        <div className="relative flex flex-col items-center md:flex-row md:items-center bg-n-8 p-8   md:space-x-8 overflow-hidden">
          
          {/* Fondo de imagen */}
          <div className="absolute inset-0 opacity-10">
            <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
          </div>

          {/* Imagen de usuario */}
          <div className="relative">
            <img 
              src={userImage || defaultImage} 
              alt="User" 
              className="w-32 h-32 rounded-full border-[0.375rem]  shadow-lg transform transition-transform duration-300 hover:scale-110" 
            />
            {/* Borde moderno */}
            <div className="absolute inset-0 rounded-full border-[5px] border-dashed border-white opacity-30"></div>
          </div>

          {/* Información del usuario y Nivel */}
          <div className="relative z-10 mt-6 md:mt-0 text-center md:text-left text-white space-y-6">
            <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl leading-tight">
              {realname ? (
                <>
                  Hello!
                  <br />
                  <span className="relative">
                    <ReactTypingEffect 
                      text={realname}
                      speed={80}
                      eraseDelay={700}
                      className="font-semibold text-yellow-400"
                    />
                  </span>
                </>
              ) : (
                "Welcome! Please log in to see your name."
              )}
            </h2>

            {/* Nivel con estilo de badge */}
            <div className="inline-flex items-center px-5 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg transform hover:scale-105 transition duration-300">
              <img src={nivel > 5 ? check2 : loading1} alt="Status" className="mr-2 w-4 h-4" />
              Level: {nivel}
            </div>

           
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CardDeal2;
