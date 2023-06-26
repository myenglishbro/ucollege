import React, { useState } from 'react';
import { products } from '../utils/products.js';
import Producto from './Producto.jsx';
import { BsSearch } from 'react-icons/bs';
const ContainerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on title
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-bar text-center my-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text">
            <BsSearch />
          </span>
        </div>
      </div>
      <div className="card-container d-flex flex-wrap justify-content-center">
        {filteredProducts.map((item) => (
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
          />
        ))}
      </div>
    </>
  );
};

export default ContainerProducts;
