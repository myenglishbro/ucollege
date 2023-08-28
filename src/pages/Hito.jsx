import React from 'react';

import styles, { layout } from "../style";
import Button from '../components/Button';
const Hito = (props) => {
  return (
    <>
     
      <section className={`${layout.sectionImg} flex-col`}>
  <div className="flex-1 flex flex-col">
    <h2 className={`${styles.heading2 } text-white`} >{props.title}</h2>
    {props.road.map((elemento, index) => (
      <div key={index}>
        <p className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]" >{elemento.dateAdded}</p>
        <p className='text-white'>
          {elemento.description}
        </p>
        <div>
          {elemento.enlaces.map((enlace, i) => (
            <a key={i} href={enlace.url} target="_blank" rel="noopener noreferrer">
              <p className=' text-white'>{enlace.titulo}</p>
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>

  <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
    <Button />
  </div>
</section>


  
    </>
  );
};

export default Hito;
