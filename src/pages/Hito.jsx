import React from 'react';
import { send } from '../assets';
import styles, { layout } from "../style";
const Hito = (props) => {
  return (
    <>
 
       
    {props.road.map((elemento, index) => (
          <>
         
    <div key={index} className={`${layout.sectionImg} flex-col`}>
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-2 mb-6`}>
    
          <div key={index} className={`flex-1 flex justify-start items-center flex-row m-3`} >
            <h4 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
              {elemento.title}
            </h4>
            <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
            {elemento.subtitle}
            </p>
           
          </div>
         
      </section>
      <div className={`w-[64px] h-[64px] rounded-full  bg-dimBlue`}>
      <img src={send} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
      <p className={`${styles.paragraph} max-w-[470px] mb-3`}>
        {elemento.description} 
        </p>
   
      <div className="flex-1 flex flex-col">

     
     
        <div key={index}>
          <div>
            {elemento.enlaces.map((enlace, i) => (
              <a key={i} href={enlace.url} target="_blank" rel="noopener noreferrer">
                <p className='text-white'>{enlace.titulo}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
      
    </div>
          </>

    ))}
  </>
  );
};

export default Hito;
