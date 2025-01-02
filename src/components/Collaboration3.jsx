import React, { useState } from "react";
import 'flowbite';

const Collaboration3 = () => {
  const images = [
    "https://i.ibb.co/n12V4rY/eee.png",
    "https://i.ibb.co/Nn7th16/wwwwwww.png",
    "https://i.ibb.co/SmnHPYR/ej.png",
    "https://i.ibb.co/wRL1kk7/wewewewqqq.png",
    "https://i.ibb.co/LQNj4qx/Captura-de-pantalla-2025-01-02-122115.png", // Añade más imágenes aquí
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
    <div className="max-w-2xl mx-auto text-center mt-4  ">
      <div
        id="default-carousel"
        className="relative rounded-lg overflow-hidden shadow-lg"
      >
        {/* Carousel wrapper */}
        <div className="relative h-80 md:h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                className="object-contain w-full h-full mx-auto"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="flex justify-center absolute bottom-5 left-1/2 transform -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          onClick={handlePrev}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          onClick={handleNext}
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      <p className="mt-5 text-gray-700">
       Mira más testimonios en 
        <a
          className="text-blue-600 hover:underline"
          href="https://flowbite.com/docs/getting-started/introduction/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Flowbite Documentation
        </a>
        .
      </p>
    </div>
  );
};

export default Collaboration3;
