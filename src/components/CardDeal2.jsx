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
        {password && (
          <h2 className="h1 mb-12 relative inline-block">
            Hello 👋 <br className="sm:block hidden" /> {password}
            <span className="absolute top-full left-0 w-full mt-2">
              <img
                src={curve}
                className="w-full"
                alt="Curve"
              />
            </span>
          </h2>
        )}
        <Button2 className=" ml-10" />
      </div>
    </Section>
  );
};

export default CardDeal2;
