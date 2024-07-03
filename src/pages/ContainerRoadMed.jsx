import React from 'react';
import Hitob2 from './Hitob2';
import styles from "../style";
import CardDeal2 from "../components/CardDeal2";

const ContainerRoadMed = ({ roadmed = [], containerRefs,password }) => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      <CardDeal2 password={password} />
        <Hitob2 roadmed={roadmed} containerRefs={containerRefs} />
      </div>
    </div>
  );
}

export default ContainerRoadMed;
