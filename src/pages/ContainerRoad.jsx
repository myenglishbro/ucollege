import React from 'react';
import Hito from './Hito';
import styles from "../style";
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = ({ road, containerRefs, password }) => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <CardDeal2 password={password} />
        <Hito road={road} containerRefs={containerRefs} />
      </div>
    </div>
  );
};

export default ContainerRoad;
