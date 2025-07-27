import { motion } from "framer-motion";
import { brainwaveSymbol } from "../../assets2";
import Typing from "react-typing-effect";

const Hero2 = () => {
  return (
    <div className="w-full min-h-screen bg-[#001BFF] text-white flex items-center justify-center px-6 py-12 mt-10 overflow-hidden">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Say hello a la <br /> forma más
            <span className="bg-pink-400 text-white px-3 py-1 rounded-lg ml-2">
              <Typing
                text={["fluida", "natural", "divertida"]}
                speed={90}
                eraseSpeed={60}
                typingDelay={400}
                eraseDelay={1500}
                cursorClassName="text-white"
              />
            </span><br />
            de aprender inglés
          </h1>

          <p className="text-lg md:text-xl text-white/90 mt-4">
            Aprende con las clases que han ayudado a más de <strong>1 millón</strong> de estudiantes a hablar con confianza y fluidez.
          </p>

        

          <a
            href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
            className="mt-6 w-fit bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-6 rounded-xl text-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            Let’s get fluent!
          </a>
        </div>

        {/* Right Side - Embedded YouTube video with floating elements */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-[320px] h-[480px] rounded-[2rem] overflow-hidden shadow-xl rotate-[6deg]">
            <iframe
              className="w-full h-full rounded-[2rem]"
              src="https://www.youtube.com/embed/AtFAyHefJBY?autoplay=1&mute=1&controls=0&loop=1"
              title="Aprende inglés video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 left-4 w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md"
            >
              <img
                src={brainwaveSymbol}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-4 right-4 bg-white text-black px-2 py-1 text-xs font-bold rounded-full shadow"
            >
              ✨
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-4 left-4 text-sm font-medium text-white bg-black/60 px-3 py-1 rounded-lg shadow-md"
            >
              This is the real way
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
