import React from 'react';
import styles from "../style";
import CardDeal2 from './CardDeal2';


const DefaultView = ({ password }) => {
    return (
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <CardDeal2 password={password} />
          <div className="bg-primary flex-center">
            <h2>Selecciona un nivel del sidebar</h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default DefaultView;