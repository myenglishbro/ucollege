import React, { useState } from "react";

const Collaboration3 = () => {
  const images = [
    "https://i.ibb.co/n12V4rY/eee.png",
    "https://i.ibb.co/Nn7th16/wwwwwww.png",
    "https://i.ibb.co/SmnHPYR/ej.png",
    "https://i.ibb.co/wRL1kk7/wewewewqqq.png",
    "https://i.ibb.co/LQNj4qx/Captura-de-pantalla-2025-01-02-122115.png",
    "https://i.ibb.co/n31h7T0/aswwq.png",
    "https://i.ibb.co/71NCRwB/wsw.png",
    "https://i.ibb.co/9bBMJcX/sss.png",
    "https://i.ibb.co/khxw777/aaa.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 text-center">
      <div className="relative rounded-lg shadow-lg overflow-hidden">
        {/* Image Carousel */}
        <div className="relative h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full ${
                index === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-400 hover:bg-blue-400"
              } transition transform`}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition shadow-lg"
          onClick={handlePrev}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition shadow-lg"
          onClick={handleNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <p className="mt-6 text-gray-600">
        Deja tu testimonios en{" "}
        <a
          href="https://www.linkedin.com/in/carlosapolaya/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
         Linkedin y gana 1 semana en la plataforma
        </a>
        .
      </p>
    </div>
  );
};

export default Collaboration3;
