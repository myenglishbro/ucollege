import {roadmed} from "../utils/roadmed"
import Hito from './Hito'
import styles from "../style"
import CardDeal2 from "../components/CardDeal2";

const ContainerRoadMed = () => {
  return (
         

<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      
             <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      
        <CardDeal2 />
       
      </div>
    </div>
         <Hito road={roadmed} />
      </div>
      </div>
             
     

  )
}

export default ContainerRoadMed
