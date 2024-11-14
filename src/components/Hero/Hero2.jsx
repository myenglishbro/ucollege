const Hero2 = () => {
  return (
    <div className="h-screen flex flex-col max-sm:mt-10 items-center justify-center text-indigo-400 bg-cover bg-fixed" style={{ backgroundImage: "url('https://i.ibb.co/Gd2nhM4/header.png')" }}>
      {/* Nav */}
      <div className="w-full container mx-auto px-6 flex justify-between items-center">
        <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
        </a>
        <div className="flex space-x-4">
          <a className="text-blue-300 hover:text-pink-500 transition-transform transform hover:scale-125 duration-300" href="https://twitter.com/intent/tweet?url=#">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path>
            </svg>
          </a>
          <a className="text-blue-300 hover:text-pink-500 transition-transform transform hover:scale-125 duration-300" href="https://www.facebook.com/sharer/sharer.php?u=#">
            <svg className="fill-current h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        {/* Left Col */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-3xl md:text-5xl text-white opacity-80 font-bold leading-tight">
            ¿Inglés Robótico?
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500"> Aprende Inglés </span>
            de la Vida Real
          </h1>
          <p className="text-base md:text-2xl text-white opacity-80 my-6">
            Comunicate y expresate como todo un Nativo.
          </p>
          <a href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82" className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition duration-300">
            Contactar
          </a>
        </div>

        {/* Right Col */}
        <div className="w-full md:w-3/5 flex justify-center">
          <img className="w-2/4 md:w-1/4 transform -rotate-6 hover:rotate-6 transition-transform duration-700" src="https://i.ibb.co/wNDf6GS/My-english-bro-Personajek-10.png" alt="Macbook" />
        </div>
      </div>
    </div>
  );
};

export default Hero2;

