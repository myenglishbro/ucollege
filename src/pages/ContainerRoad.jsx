import React from 'react';
import Hito from './Hito';
import styles from "../style";
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = ({ road, containerRefs, password, realname, userImage }) => {
  console.log("realname en ContainerRoad:", realname); // Debugging
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      <CardDeal2 password={password} realname={realname} userImage={userImage} /> {/* Pass userImage */}
      <Hito road={road} containerRefs={containerRefs} />
      </div>
    </div>
  );
};

export default ContainerRoad;
