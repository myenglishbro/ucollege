import React from 'react';
import { mad,teacher } from '../../assets';
import styles from '../../style';
import GetStarted from '../GetStarted';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={mad} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">¿Inglés Robótico?  </span> ¿Sigues en el verbo Be?
          
          </p>
          
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          Aprende  <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> inglés  </span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
          {/* <GetStarted /> */}

          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        de la Vida real 
              </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-3`}>
     Comunicate y expresate como todo un   <span className="text-gradient font-semibold ">Nativo </span>.
        </p>
        
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGdoczVxczdrdWR6eXpmcGhkYnZhejNmcDlpOXJzM2pmNDg1dGNkdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/otg3tCDmnH372Kxx00/giphy.gif" alt="billing" className="w-[80%] h-[85%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
      {/* <GetStarted /> */}

      </div>
    </section>
  
  );
}

export default Hero;
