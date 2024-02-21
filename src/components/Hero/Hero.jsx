import React from 'react';
import { discount } from '../../assets';
import styles from '../../style';
import GetStarted from '../GetStarted';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">¿Inglés estancado?  </span> ¿Robótico?
            <span className="text-white">  Has llegado al lugar correcto. </span> 
          
          </p>
          
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          Aprender el  <br className="sm:block hidden" />{" "}
            <span className="text-gradient"> inglés</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
          <GetStarted />

          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        de la vida real 
              </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Dile “bye-bye” a tu curso aburrido y  tradicional <span className="text-gradient font-semibold ">Aprende el inglés como si estuvieras en Estados Unidos </span>.
        </p>
        
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXo4MjdlN292OXZtNmc1YzV0emhhNnJ6ZjI1ejkwZXBiM2swMnl4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/coX4P237hwyaLdWFUd/giphy.gif" alt="billing" className="w-[80%] h-[60%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
      <GetStarted />

      </div>
    </section>
  
  );
}

export default Hero;
