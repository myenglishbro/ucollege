import React, { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import Section from "./Hero/Section";
import { grid, check2, loading1 } from "../assets2";

const CardDeal2 = ({ realname, userImage, nivel }) => {
  const [isOpen, setIsOpen] = useState(true); // El popup está abierto por defecto
  const defaultImage = "https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png";

  const toggleModal = () => {
    setIsOpen(false); // Permite cerrar el modal
  };

  return (
    <>
      {/* Contenedor principal */}
      <div className="relative">
        <Section className="bg-gradient-to-r to-blue-700" id="hero">
          <div className={`container max-w-4xl mx-auto text-center py-20 px-6 md:px-10 lg:px-16 relative z-10 ${isOpen ? "opacity-20 pointer-events-none" : "opacity-100 pointer-events-auto"} transition-opacity duration-300`}>
            <img
              src={grid}
              alt="Grid Background"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative z-10 flex flex-col items-center md:flex-row p-8 bg-n-8 space-x-8 overflow-hidden">
              <div className="relative">
                <img
                  src={userImage || defaultImage}
                  alt="User"
                  className="w-32 h-32 rounded-full border-[0.375rem] shadow-lg transform transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full border-[5px] border-dashed border-white opacity-30"></div>
              </div>
              <div className="mt-6 md:mt-0 text-white space-y-6 text-center md:text-left">
                <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                  {realname ? (
                    <>
                      Hello!
                      <br />
                      <ReactTypingEffect
                        text={realname}
                        speed={80}
                        eraseDelay={700}
                        className="font-semibold text-yellow-400"
                      />
                    </>
                  ) : (
                    "Welcome! Please log in to see your name."
                  )}
                </h2>
                <div className="inline-flex items-center px-5 py-2 bg-yellow-400 text-indigo-900 font-semibold rounded-full shadow-lg">
                  <img
                    src={nivel > 5 ? check2 : loading1}
                    alt="Status"
                    className="mr-2 w-4 h-4"
                  />
                  Level: {nivel}
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
        >
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            {/* Botón de cerrar */}
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            {/* Contenido del modal */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h2>
            <img
              src={userImage || defaultImage}
              alt="User"
              className="w-24 h-24 mx-auto rounded-full mb-4 border-[0.375rem] border-gray-300"
            />
            <p className="text-gray-600 text-center mb-2">Name: {realname}</p>
            <p className="text-gray-600 text-center">Level: {nivel}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDeal2;
