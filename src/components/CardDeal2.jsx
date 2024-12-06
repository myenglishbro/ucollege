import React, { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import Section from "./Hero/Section";
import { grid, check2, loading1 } from "../assets2";

const CardDeal2 = ({ realname, userImage, nivel,img,expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true); // El popup está abierto por defecto
  const defaultImage = "https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png";

  const toggleModal = () => {
    setIsOpen(false); // Permite cerrar el modal
  };

  return (
    <>
     
 
{/* Modal emergente con estilo dark y badge para el ranking */}
{isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
    <div className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-lg max-w-md w-full p-8 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          User Details
        </h3>
        <button onClick={toggleModal} className="text-gray-400 hover:text-white text-2xl">
          ✖
        </button>
      </div>
      <div className="flex flex-col items-center">
        {/* Imagen de usuario */}
        <img
          src={userImage || defaultImage}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-gray-700 shadow-lg transform transition-transform duration-300 hover:scale-105"
        />
        <p className="font-bold text-2xl mt-4">
          <ReactTypingEffect
            text={realname || "John Doe"}
            speed={100}
            eraseSpeed={50}
            typingDelay={500}
            cursor="|"
            displayTextRenderer={(text, i) => (
              <span key={i}>{text}</span>
            )}
          />
        </p>
        {/* Badge para el ranking */}
        <div className="mt-3 p-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full shadow-md">
          <p className="font-semibold">{nivel}</p>
        </div>
        <p className="text-gray-400 mt-2">Subscription ends: {expirationDate || "Unknown"}</p>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={toggleModal}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default CardDeal2;
