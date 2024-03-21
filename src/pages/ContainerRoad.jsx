import {road} from "../utils/road"
import Hito from './Hito'
import styles from "../style"
import CardDeal2 from "../components/CardDeal2";

const ContainerRoad = () => {
  return (
         

<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      
             <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      
        <CardDeal2 />
       
      </div>
    </div>
         <Hito road={road} />
      </div>
      </div>
             
     

  )
}

export default ContainerRoad
