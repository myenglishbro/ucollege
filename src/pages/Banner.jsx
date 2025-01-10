import React from 'react';

const Banner = () => {
  return (
    <section className="px-0 bg-gray-100 pt-0">
      <div className="relative bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 p-8 sm:p-12 rounded-3xl w-full max-w-7xl text-white flex flex-col sm:flex-row items-center justify-between mx-auto mt-16 shadow-2xl overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-50 transform translate-x-20 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl opacity-40 transform -translate-x-20 translate-y-10"></div>

        {/* Content */}
        <div className="flex flex-col gap-6 z-10">
          <div className="text-center sm:text-left">
            <span className="text-gray-200 uppercase tracking-widest text-sm font-semibold">
              Oferta de Enero
            </span>
            <h1 className="text-4xl sm:text-3xl font-extrabold mt-2">
              <span className="block">Paga 2 meses y estudia</span>
              <span className="block text-yellow-300">3 meses por solo 30 soles / 10 dólares al mes</span>
            </h1>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=51926922032&text=Hello%20Carlos!%20%F0%9F%99%82"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-white text-black hover:bg-yellow-300 hover:text-black px-6 py-3 rounded-lg font-semibold shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-in-out"
          >
            <span>¡Reclama tu oferta ahora!</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 w-5 h-5 transition-transform duration-200 transform group-hover:translate-x-1"
              viewBox="0 0 256 256"
              fill="currentColor"
            >
              <path d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
            </svg>
          </a>
        </div>

        {/* Decorative Icon */}
        <div className="hidden sm:block z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-28 text-gray-200 opacity-80 animate-pulse"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M4.5 0A2.5 2.5 0 0 0 2 2.5v.286c0 .448.133.865.362 1.214H1.5A1.5 1.5 0 0 0 0 5.5v1A1.5 1.5 0 0 0 1.5 8H7V4h1v4h5.5A1.5 1.5 0 0 0 15 6.5v-1A1.5 1.5 0 0 0 13.5 4h-.862c.229-.349.362-.766.362-1.214V2.5A2.5 2.5 0 0 0 10.5 0c-1.273 0-2.388.68-3 1.696A3.498 3.498 0 0 0 4.5 0ZM8 4h2.786C11.456 4 12 3.456 12 2.786V2.5A1.5 1.5 0 0 0 10.5 1A2.5 2.5 0 0 0 8 3.5V4ZM7 4H4.214C3.544 4 3 3.456 3 2.786V2.5A1.5 1.5 0 0 1 4.5 1A2.5 2.5 0 0 1 7 3.5V4Z"
              clipRule="evenodd"
            />
            <path
              fill="currentColor"
              d="M7 9H1v3.5A2.5 2.5 0 0 0 3.5 15H7V9Zm1 6h3.5a2.5 2.5 0 0 0 2.5-2.5V9H8v6Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Banner;
