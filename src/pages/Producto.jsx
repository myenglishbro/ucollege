import React from 'react';

const Producto = (props) => {
  const {
    thumbnail,
    title,
    subtitle,
    description,
    calificacion,
    precio,
    enlaces,
    thumbnailfce,
    thumbnailcae
  } = props;

  return (
    <div className="max-w-md mx-auto bg-gradient-to-r from-indigo-800 via-purple-800 to-indigo-900 text-white rounded-2xl shadow-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:bg-indigo-700 duration-300">
      <div className="poster relative group">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl group-hover:opacity-80 transition-opacity duration-300"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 space-y-4">
        <div className="imgcontent space-y-2">
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
            {title}
          </h3>
          <span className="block text-gray-300 text-sm">{subtitle}</span>
          <p className="text-lg">{description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-yellow-400 font-semibold text-xl">Calificación: {calificacion}</span>
          <span className="text-green-500 font-semibold text-xl">{precio}</span>
        </div>

        <div className="tags mt-4">
          <a
            href={enlaces}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Descargar
          </a>
        </div>

        <div className="cast mt-6">
          <h4 className="text-lg font-semibold mb-2">Para niveles:</h4>
          <ul className="flex space-x-6">
            {thumbnailfce && (
              <li>
                <img
                  src={thumbnailfce}
                  alt="FCE"
                  className="w-14 h-14 object-cover rounded-full border-4 border-indigo-500 transform hover:scale-110 transition-all duration-300"
                />
              </li>
            )}
            {thumbnailcae && (
              <li>
                <img
                  src={thumbnailcae}
                  alt="CAE"
                  className="w-14 h-14 object-cover rounded-full border-4 border-indigo-500 transform hover:scale-110 transition-all duration-300"
                />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Producto;
