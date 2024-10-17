import React from 'react';
import Hito from './Hito';
import styles from "../style";
import DonationComponent from '../components/DonationComponent';

const ContainerRoadDev = ({ road, containerRefs }) => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
     
      <div className="mt-20 md:mt-24 lg:mt-28 w-full">
      <div className={`${styles.boxWidth}`}>
          {/* Componente de donación */}
          <DonationComponent />
          {/* Componente Hito */}
          <Hito road={road} containerRefs={containerRefs} />
        </div>
      </div>
    </div>
  );
};

export default ContainerRoadDev;
