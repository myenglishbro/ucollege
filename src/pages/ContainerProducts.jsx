import React, { useState } from 'react';
import { products } from '../utils/products.js';
import Producto from './Producto.jsx';
import { BsSearch } from 'react-icons/bs';
import styles from '../style.js';
import { Helmet } from 'react-helmet';
import "../css/estilos.css";

const ContainerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar productos por título
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-wrapper text-center my-3">
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Buscar por título"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text">
            <BsSearch size={20} />
          </span>
        </div>
      </div>

   

      <div className="grilla">
        {filteredProducts.length === 0 ? (
          <p>No se encontraron productos.</p>
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
