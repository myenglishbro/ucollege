import React from 'react';
import styles from "../style";
import CardDeal2 from './CardDeal2';
import CardDeal3 from './CardDeal3';

const DefaultView = ({ password }) => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {password ? (
          <CardDeal2 password={password} />
        ) : (
          <CardDeal3 />
        )}

        <div className="bg-primary flex-center">
          <h2>Selecciona un nivel del sidebar</h2>
        </div>
      </div>
    </div>
  );
};

export default DefaultView;
