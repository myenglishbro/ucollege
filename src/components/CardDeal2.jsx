import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Button2 from "./Button2";
import Section from "./Hero/Section";

const CardDeal2 = ({ realname, userImage, nivel }) => {
  const defaultImage = 'https://i.ibb.co/wL83KQZ/Dise-o-sin-t-tulo-4.png'; // Default image URL

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
        <div className="flex items-center justify-center space-x-6 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          {/* User Image with Modern Border */}
          <img 
            src={userImage || defaultImage} 
            alt="User" 
            className="w-28 h-28 rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform duration-300" 
          />

          {/* User Info and Nivel */}
          <div className="flex flex-col items-start space-y-3">
            {/* Greeting Message with Typing Effect */}
            {realname ? (
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                <ReactTypingEffect 
                  text={["What's up!"]}
                  speed={100}
                  eraseDelay={500}
                />
                <br className="sm:block hidden" />
                <span className="px-2 py-1 relative inline-block">
                  <svg className="stroke-current bottom-0 absolute text-orange-600 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                  </svg>
                  <span className="relative">{realname}</span>
                </span>
              </h2>
            ) : (
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Welcome! Please log in to see your name.
              </h2>
            )}

            {/* Nivel displayed with modern styling */}
            <span className="text-xl text-white bg-orange-500 px-4 py-1 rounded-full shadow-md">
              Nivel: {nivel}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CardDeal2;
