import React from 'react';

const Producto = (props) => {
  const {
    thumbnail,
    title,
    subtitle,
    description,
    calificacion,
    precio,
    enlaces
  } = props;

  return (
    <div className="max-w-sm mx-auto bg-black-gradient-2 rounded-lg overflow-hidden shadow-md mb-6 feature-card">
      <img src={thumbnail} alt={title} className="w-full h-[200px] object-cover" />
      <div className="p-4">
        <h2 className="font-poppins font-semibold text-xl text-white">{title}</h2>
        <p className="font-poppins font-normal text-sm text-dimWhite mt-2">{subtitle}</p>
        <p className="font-poppins font-normal text-sm text-dimWhite mt-2">{description}</p>

        <div className="flex items-center mt-4 mb-5">
          <img src={thumbnail} alt={title} className="w-8 h-8 rounded-full" />
          <div className="flex flex-col ml-2">
            <span className="font-poppins font-semibold text-sm text-white">{calificacion}</span>
            <span className="font-poppins font-normal text-xs text-dimWhite">{precio}</span>
          </div>
        </div>
        <a
          href={enlaces}
          className={` mt-6 py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none `}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enlace de Descarga
        </a>
      </div>
    </div>
  );
};

export default Producto;
