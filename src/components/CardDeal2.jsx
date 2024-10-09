import React from 'react';
import Button2 from "./Button2";
import Section from "./Hero/Section";

const CardDeal2 = ({ realname, userImage }) => {
  const defaultImage = 'https://via.placeholder.com/150'; // Default image URL

  return (
      <Section
          className="pt-[12rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
      >
          <div className="container relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <div className="flex flex-col items-center">
                  <img 
                      src={userImage || defaultImage} // Ensure this uses userImage
                      alt="User" 
                      className="w-24 h-24 rounded-full mb-4" 
                  />
                  {realname ? (
                      <h2 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                          Hello 👋 <br className="sm:block hidden" />
                          <span className="px-2 py-1 relative inline-block">
                              <svg className="stroke-current bottom-0 absolute text-orange-600 -translate-x-2" viewBox="0 0 410 18" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" strokeWidth="12" fill="none" fillRule="evenodd" strokeLinecap="round"></path>
                              </svg>
                              <span className="relative">{realname}</span>
                          </span>
                      </h2>
                  ) : (
                      <h2 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                          Welcome! Please log in to see your name.
                      </h2>
                  )}
              </div>
          </div>
      </Section>
  );
};

export default CardDeal2;
