import React, { useState } from 'react';
import { products } from '../utils/products.js';
import Producto from './Producto.jsx';
import { BsSearch } from 'react-icons/bs';

import "../css/estilos.css";

const ContainerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar productos por título
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Barra de búsqueda estilizada */}
      <div className="flex justify-center mt-20 mb-10 px-4">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            className="w-full px-4 py-3 pl-12 text-lg border border-gray-300 rounded-full shadow-md focus:ring focus:ring-blue-400 focus:outline-none transition-all duration-300"
            placeholder="Buscar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-4 top-3.5 text-gray-400">
            <BsSearch size={20} />
          </span>
        </div>
      </div>

      {/* Lista de tarjetas en formato columna con diseño horizontal */}
      <div className="flex flex-col gap-8 px-4 md:px-10 lg:px-16 pb-16">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 italic py-10 text-lg">No se encontraron productos.</p>
        ) : (
          filteredProducts.map((item) => (
            <Producto
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              subtitle={item.subtitle}
              dateAdded={item.dateAdded}
              calificacion={item.calificacion}
              description={item.description}
              enlaces={item.enlaces}
              precio={item.precio}
              demo={item.demo}
              thumbnailfce={item.thumbnailfce}
              thumbnailcae={item.thumbnailcae}
              thumbnailcpe={item.thumbnailcpe}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ContainerProducts;
