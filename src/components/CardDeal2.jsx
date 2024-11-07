import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Section from "./Hero/Section";
import { grid, check2, loading1 } from "../assets2";

const CardDeal2 = ({ realname, userImage, nivel }) => {
  const defaultImage = 'https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png';

  return (
    <Section className="bg-gradient-to-r to-blue-700" id="hero">
      <div className="container max-w-4xl mx-auto text-center py-20 px-6 md:px-10 lg:px-16 relative z-10">
        {/* Fondo de imagen */}
        <img src={grid} alt="Grid Background" className="absolute inset-0 w-full h-full object-cover opacity-10" />

        <div className="relative z-10 flex flex-col items-center md:flex-row p-8 bg-n-8 space-x-8 overflow-hidden">
          {/* Imagen de usuario */}
          <div className="relative">
            <img 
              src={userImage || defaultImage} 
              alt="User" 
              className="w-32 h-32 rounded-full border-[0.375rem] shadow-lg transform transition-transform duration-300 hover:scale-110" 
            />
            <div className="absolute inset-0 rounded-full border-[5px] border-dashed border-white opacity-30"></div>
          </div>

          {/* Información del usuario y Nivel */}
          <div className="mt-6 md:mt-0 text-white space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
              {realname ? (
                <>
                  Hello!<br />
                  <ReactTypingEffect 
                    text={realname} 
                    speed={80} 
                    eraseDelay={700} 
                    className="font-semibold text-yellow-400" 
                  />
                </>
              ) : "Welcome! Please log in to see your name."}
            </h2>
            <div className="inline-flex items-center px-5 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg">
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
