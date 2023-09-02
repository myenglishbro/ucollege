import React from 'react';
import { politicas } from "../constants";
import styles, { layout } from "../style";
import Button from '../components/Button';

const PoliticasClase = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Políticas de mis clases a distancia
        </h2>
      
        <a href="https://wa.link/qwnf6w"><Button styles={`mt-10`} /></a>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {politicas.map((data) => (
          <div
            key={data.id}
            className={`flex flex-row p-6 rounded-[20px] ${data.index !== politicas.length - 1 ? "mb-6" : "mb-0"} feature-card`}
          >
            <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
              <img src={data.icon} alt="star" className="w-[50%] h-[50%] object-contain" />
            </div>
            <div className="flex-1 flex flex-col ml-3">
              <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                {data.title}
              </h4>
              <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                {data.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PoliticasClase;
