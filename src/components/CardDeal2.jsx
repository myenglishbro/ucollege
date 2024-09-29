import React from 'react';
import Button2 from "./Button2";
import Section from "./Hero/Section";
import { curve } from "../assets2";

const CardDeal2 = ({ password }) => {
  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >

      <div className="container relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
       
      <div class="max-w-7xl mx-auto py-5 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div class="text-center space-y-5">
           
            <div class="inline-flex items-end justify-center w-full text-center mx-auto">
              <div class="inline-flex items-end justify-center w-full text-center mx-auto">
                <img src="https://i.ibb.co/N1m4tVG/Dise-o-sin-t-tulo-3.png" class="absolute transform translate-x-24 ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/>
                <img src="https://i.ibb.co/sqMczRL/Dise-o-sin-t-tulo-6.png" class="absolute transform -translate-x-24 -ml-6 rounded-full w-12 h-12 md:w-16 md:h-16 border-4 border-white"/>
                <img src="https://i.ibb.co/6Jhv9PX/Dise-o-sin-t-tulo-2.png" class="absolute transform -translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
                <img src="https://i.ibb.co/1QrH1mg/Dise-o-sin-t-tulo-4.png" class="absolute transform translate-x-16 rounded-full w-16 h-16 md:w-20 md:h-20 border-4 border-white"/>
                <img src="https://i.ibb.co/h2bWyds/Dise-o-sin-t-tulo-5.png" class="rounded-full w-20 h-20 md:w-24 md:h-24 border-4 border-white relative"/>
              </div>
               
            </div>
            

           


        </div>
    </div>
        {password && (
          <h2 className="mt-1 text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Hello 👋 <br className="sm:block hidden" />
            <span class="px-2 py-1 relative inline-block">
                    <svg class="stroke-current bottom-0 absolute text-orange-600 -translate-x-2" viewBox="0 0 410 18"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6.4c16.8 16.8 380.8-11.2 397.6 5.602" stroke-width="12" fill="none"
                            fill-rule="evenodd" stroke-linecap="round"></path>
                    </svg>
                    <span class="relative"> {password}</span>
                </span>
          </h2>
        )}
        <Button2 className=" ml-10" />
      </div>
    </Section>
  );
};

export default CardDeal2;
