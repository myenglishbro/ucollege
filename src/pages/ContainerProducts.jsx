import React, { useState } from 'react';
import { products } from '../utils/products.js';
import Producto from './Producto.jsx';
import { BsSearch } from 'react-icons/bs';
import styles from '../style.js';
import "../css/estilos.css"
const ContainerProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on title
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-wrapper text-center my-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text">
            <BsSearch />
          </span>
        </div>
      </div>
      <section className={`${styles.paddingY} ${styles.flexCenter} flex-col relative z-0`}>
      <div className="absolute z-[5] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />
      <div className="w-full flex justify-between items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2 className={styles.heading2}>
      Todo el contenido presentado aquí es gratuito y no se vende.
      </h2>
      <div className="w-full md:mt-0 mt-6">
        <p className={`${styles.paragraph} text-left max-w-[450px]`}>
        Todos los materiales aquí presentes son obtenidos de diversas fuentes, incluyendo ISECollective, Facebook, descargas de Mega y contribuciones de la comunidad. Este sitio pretende ser un lugar centralizado para almacenar y compartir recursos educativos.
        </p>
      </div>
    </div>
    
      </section>
      <div className="grilla">

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
            thumbnailfce={item.thumbnailfce}
            thumbnailcae={item.thumbnailcae}

            thumbnailcpe={item.thumbnailcpe}

          />
        ))}
        </div>
    </>
  );
};

export default ContainerProducts;
