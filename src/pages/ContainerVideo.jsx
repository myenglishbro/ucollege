import React, { useState } from 'react';
import { data } from '../utils/data';
import Articulo from './Articulo';
import styles from "../style";

const ContainerVideo = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === '') {
      setSearchResult([]);
    } else {
      const result = data.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResult(result);
    }
  };

  return (
    <>
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
  <div className="flex-1 flex flex-col">

      <h2 className={styles.heading2}>Revisa tus clases!</h2>  
            <input
          type='text'
          placeholder='Escribe tu Nombre'
          value={searchValue}
          onChange={handleSearch}
          className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}
        />
        </div>
      </section>

      <div className='flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-[0]'>
        {searchResult.length > 0
          ? searchResult.map((item) => (
              <Articulo
                key={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                subtitle={item.subtitle}
                enlaceblog={item.enlaceblog}
                description={item.description}
                channel={item.channel}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default ContainerVideo;
