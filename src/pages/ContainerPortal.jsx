import React from 'react'
import MyPortal from './MyPortal.jsx'
import styles from '../style.js'
const ContainerPortal = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
     
        <MyPortal
         
        />
       </div>
    </div>
  )
}

export default ContainerPortal