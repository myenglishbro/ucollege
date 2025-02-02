import { LeftCurve, RightCurve } from "../design/Collaboration";
import { collabApps, collabContent, collabText } from "../../constants";
import Section from "../Hero/Section";
import { brainwaveSymbol } from "../../assets2";
import Button from "../Button";

const Hero2 = () => {
  return (
    <div className="h-screen flex flex-col    items-center justify-center text-indigo-400 bg-cover bg-fixed"  >
   
      {/* Main */}
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        {/* Left Col */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-3xl md:text-5xl text-white opacity-80 font-bold leading-tight">
          Aprende el idioma y
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"> Comunicate con todos </span>
           
          </h1>
          <p className="text-base md:text-2xl text-white opacity-80 my-6">
          Deja atrás los métodos aburridos y comienza a hablar como un nativo.
          </p>
          <a href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82" className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition duration-300">
            Reservar Clases
          </a>
        </div>

        {/* Right Col */}
        <Section crosses>
      <div className="container lg:flex">
        

        <div className="lg:ml-auto xl:w-[38rem] ">
         

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 ">
            <div className="flex w-80 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img
                    src={brainwaveSymbol}
                    width={68}
                    height={68}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[2.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[4.2rem] h-[4.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <img
                    className="m-auto rounded-lg"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
      </div>
    </div>
  );
};

export default Hero2;

