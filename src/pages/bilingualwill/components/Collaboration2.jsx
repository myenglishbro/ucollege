import React from "react";


const Collaboration2 = () => {
  return (
    <div className="h-screen w-screen  sm:mb-15">
      <div className="mx-auto max-w-7xl pt-16 sm:pt-24 sm:mb-10">
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sección de Texto */}
          <div className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="rounded-full uppercase bg-pink-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                  ¿Qué veremos en los talleres?
                  </span>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Desenreda tu lengua {" "}
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">
                    y al fin pierde el miedo 
                    </span>
                    <br />
                    paralizante a hablar
                  </h1>
                </div>
                <p className="text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Exprésate con confianza y entiende cuando los nativos te hablen. Te acompañaré en cada paso del camino, brindándote todas las herramientas necesarias con ejercicios prácticos y fáciles de entender.
                </p>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex space-x-4 items-center text-white">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img
                      className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://randomuser.me/api/portraits/men/29.jpg"
                      alt="User 1"
                    />
                    <img
                      className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://randomuser.me/api/portraits/men/90.jpg"
                      alt="User 2"
                    />
                    <img
                      className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://randomuser.me/api/portraits/men/75.jpg"
                      alt="User 3"
                    />
                    <img
                      className="h-6 w-6 max-w-none rounded-full ring-2 ring-white"
                      src="https://randomuser.me/api/portraits/men/5.jpg"
                      alt="User 4"
                    />
                  </div>
                  <span className="flex-shrink-0 text-xs font-medium leading-5">
                    +15
                  </span>
                </div>
                <div className="h-4 border-l border-gray-700"></div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-current text-yellow-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path>
                    </svg>
                  ))}
                </div>
                <div className="h-4 border-l border-gray-700"></div>
               
              </div>
            </div>
          </div>

          {/* Sección de Video */}
          <div className="flex items-center w-full col-span-6 sm:mb-10">
            <div className="px-6 h-96 lg:h-full w-full max-w-2xl col-span-6 flex items-center mx-auto">
              <div className="w-full h-full">
              <iframe
  frameBorder="0"
  allowFullScreen
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/HHZghScZAaE?si=XO1V1J3tSXmOgKhG"
  title="YouTube video player"
  referrerPolicy="strict-origin-when-cross-origin"
  id="widget2"
/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration2;

