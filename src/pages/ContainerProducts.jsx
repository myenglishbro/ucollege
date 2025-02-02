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
        <div className="flex justify-center my-6 mt-20">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              className="w-full px-4 py-3 pl-10 text-lg border rounded-full shadow-md focus:ring focus:ring-blue-400 focus:outline-none"
              placeholder="Buscar por título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-3 text-gray-500">
              <BsSearch size={20} />
            </span>
          </div>
        </div>
  
        {/* Grilla de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 italic py-10">No se encontraron productos.</p>
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
