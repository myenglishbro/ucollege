import React, { useState } from "react";
import ReactTypingEffect from "react-typing-effect";
import { FaTimes, FaBookOpen, FaWhatsapp } from "react-icons/fa";

const CardDeal2 = ({ realname, userImage, nivel, expirationDate }) => {
  const [isOpen, setIsOpen] = useState(true);
  const defaultImage = "https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png";

  const toggleModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 animate-fade-in">
          <div className="relative bg-gradient-to-b from-gray-800 via-gray-900 to-black border border-gray-700 rounded-3xl shadow-2xl max-w-md w-full p-8 text-white animate-scale-up">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Welcome Back! 🎉
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-white text-2xl"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={userImage || defaultImage}
                  alt="User"
                  className="w-28 h-28 rounded-full border-4 border-purple-600 shadow-lg hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-gray-800 shadow-lg"></div>
              </div>
              <p className="font-bold text-2xl mt-4 text-center">
                <ReactTypingEffect
                  text={realname || "John Doe"}
                  speed={120}
                  eraseSpeed={60}
                  typingDelay={300}
                  cursor="|"
                />
              </p>
              <div className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg">
                <p className="font-semibold uppercase">{nivel}</p>
              </div>
              <p className="text-gray-400 mt-3 text-sm">
                Subscription ends:{" "}
                <span className="text-gray-300">{expirationDate || "Unknown"}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-6">
              <button
                onClick={toggleModal}
                className="px-6 py-3 flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-300 hover:scale-105"
              >
                <FaBookOpen />
                Let's Study!
              </button>

              <a
                href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
                className="px-6 py-3 flex items-center gap-3 bg-gradient-to-r from-green-500 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:bg-gradient-to-l transform hover:scale-105 transition duration-300"
              >
                <FaWhatsapp className="text-2xl" />
                Realizar Consultas a Tutor
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardDeal2;
