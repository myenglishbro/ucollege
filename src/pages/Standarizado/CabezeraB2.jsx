import React from "react";

const CabezeraB2 = () => {
  return (
    <section className="overflow-hidden pb-9 px-4 md:px-8 bg-gray-900">
      <header className="flex mx-auto justify-between items-center max-w-[1300px] py-4">
        <button className="sm:hidden inline-block">
          <svg
            width="33"
            height="26"
            viewBox="0 0 33 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="33"
              height="3.71429"
              rx="1.85714"
              fill="url(#paint0_linear_13_83)"
            />
            <rect
              y="22.2857"
              width="33"
              height="3.71429"
              rx="1.85714"
              fill="url(#paint1_linear_13_83)"
            />
            <rect
              x="9"
              y="11.1429"
              width="24"
              height="3.71429"
              rx="1.85714"
              fill="url(#paint2_linear_13_83)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_13_83"
                x1="0"
                y1="3.46667"
                x2="36.04"
                y2="3.46666"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3B3F58" />
                <stop offset="1" stopColor="#1F1B24" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_13_83"
                x1="0"
                y1="26"
                x2="33"
                y2="26"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3B3F58" />
                <stop offset="1" stopColor="#1F1B24" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_13_83"
                x1="5.21"
                y1="13"
                x2="33"
                y2="13"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3B3F58" />
                <stop offset="1" stopColor="#1F1B24" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </header>
      <section className="relative flex flex-col-reverse md:flex-row mx-auto justify-between items-center gap-9 md:gap-4 max-w-[1300px] py-4 my-12">
        {/* SVG de fondo */}
        <svg
          width="736"
          height="423"
          className="absolute top-[50px] sm:top-[200px] sm:right-[-150px]"
          viewBox="0 0 736 423"
          fill="none"
        >
          <path
            d="M738.5 4.5C491.667 -7.66666 -0.9 58.9 3.5 422.5"
            stroke="url(#paint0_linear_16_172)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_172"
              x1="700.5"
              y1="-4"
              x2="14.5"
              y2="361"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F1B24" />
              <stop offset="0.21" stopColor="#3B3F58" />
              <stop offset="0.72" stopColor="#575A78" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute sm:right-28 md:right-6"
          width="383"
          height="846"
          viewBox="0 0 383 846"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.19293 0C-0.08791 140.127 37.2087 433.314 212.642 485.053C388.075 536.792 391.776 746.576 371.697 845"
            stroke="url(#paint0_linear_16_173)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_173"
              x1="16.5"
              y1="39.5"
              x2="363"
              y2="814"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.01" stopColor="#1F1B24" />
              <stop offset="0.23" stopColor="#3B3F58" />
              <stop offset="0.78" stopColor="#575A78" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          className="absolute -top-14 sm:right-7"
          width="416"
          height="675"
          viewBox="0 0 416 675"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M415 3C325.774 17.8434 155.913 102.224 190.271 320.998C224.63 539.772 78.4065 646.155 1 672"
            stroke="url(#paint0_linear_16_171)"
            strokeWidth="6"
          />
          <defs>
            <linearGradient
              id="paint0_linear_16_171"
              x1="365.5"
              y1="28"
              x2="110"
              y2="594"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1F1B24" />
              <stop offset="0.28" stopColor="#575A78" />
              <stop offset="0.74" stopColor="#3B3F58" />
              <stop offset="1" stopColor="#1F1B24" />
            </linearGradient>
          </defs>
        </svg>
        <div className="md:w-[520px] z-20">
          <h1 className="text-3xl md:text-[36px] lg:text-[46px] leading-[56px] text-white font-bold">
            Bienvenido a la Ruta de Aprendizaje de Nivel <span className="text-[#575A78]">B2</span>
          </h1>
          <p className="text-base text-gray-300 mt-4 md:mt-9 mb-10 md:mb-16">
            Prepárate para conquistar tus exámenes de Cambridge y el inglés real. Con esta ruta, estarás listo para enfrentar el mundo.
          </p>
          <div className="flex gap-6 sm:gap-10">
            <button className="uppercase font-bold text-xs rounded-[40px] py-2 lg:py-4 px-4 lg:px-9 text-gray-900 bg-gradient-to-r from-[#575A78] to-[#3B3F58] hover:from-[#3B3F58] hover:to-[#575A78] transition-all duration-300">
              Comienza tu ruta ahora
            </button>
            <svg
              className="w-8 h-6 sm:w-12 sm:h-9"
              viewBox="0 0 46 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M43.8334 19L2.16669 19M43.8334 19L27.1667 35.6667M43.8334 19L27.1667 2.33333"
                stroke="#575A78"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="p-4 z-20 bg-black rounded-[100px] md:rounded-bl-[200px] lg:rounded-bl-[250px] bg-opacity-30">
          <img
            className="max-w-[490px] w-full"
            src="https://iili.io/39E0tiQ.png"
            alt="Ilustración de aprendizaje"
          />
        </div>
      </section>
    
    </section>
  );
};

export default CabezeraB2;
