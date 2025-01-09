import React from 'react';
import styles from "../style";
import CardDeal2 from './CardDeal2';
import CardDeal3 from './CardDeal3';

const DefaultView = ({ password, realname, userImage, nivel, expirationDate }) => {
  return (
    <div className="max-w-4xl px-4 py-24 mx-auto sm:px-6 lg:px-8 mt-0 sm:mt-10 lg:mt-16">
      <div className="relative overflow-hidden bg-white shadow-2xl rounded-3xl">
        <div className="relative z-10 p-8 text-center md:p-16 lg:p-20">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            ¡Bienvenido a tu plataforma MyEnglishBro, {realname}!
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
            Aquí podrás acceder a recursos como el temporizador Pomodoro, lecciones grabadas y, no olvides, ¡también tenemos sesiones en vivo!
          </p>
          <div className="flex justify-center items-center mb-8">
            <img 
              src={userImage || 'https://via.placeholder.com/150'} 
              alt={`${realname}'s profile`} 
              className="w-24 h-24 rounded-full object-cover mr-4" 
            />
            <p className="text-lg text-gray-600">Tu nivel actual: {nivel}</p>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82" // Reemplaza con tu número de WhatsApp
            target="_blank"
            className="inline-block px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-green-600 rounded-xl hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Contáctanos por WhatsApp
          </a>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '0.2s', top: '5%', left: '5%' }}
            src="https://eliteai.tools/images/home/1.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '0.6s', top: '5%', right: '5%' }}
            src="https://eliteai.tools/images/home/3.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '0.8s', top: '45%', left: '15%' }}
            src="https://eliteai.tools/images/home/5.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '1.2s', top: '45%', right: '15%' }}
            src="https://eliteai.tools/images/home/10.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '1.4s', top: '85%', left: '5%' }}
            src="https://eliteai.tools/images/home/4.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100"
            style={{ animationDelay: '1.8s', top: '85%', right: '5%' }}
            src="https://eliteai.tools/images/home/8.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100 hidden md:block"
            style={{ animationDelay: '2.0s', top: '25%', left: '30%' }}
            src="https://eliteai.tools/images/home/9.svg"
            alt="AI Icon"
          />
          <img
            className="absolute w-16 h-16 transition-all duration-1000 animate-float opacity-40 hover:opacity-100 hidden md:block"
            style={{ animationDelay: '2.2s', top: '65%', right: '30%' }}
            src="https://eliteai.tools/images/home/7.svg"
            alt="AI Icon"
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultView;
