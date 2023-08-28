import {road} from "../utils/road"
import Hito from './Hito'
import styles from "../style"
import { Helmet } from 'react-helmet';

const ContainerRoad = () => {
  return (
         

<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
                <div className="flex-1 flex flex-col">
                  <h2 className={styles.heading2}>Ruta de Aprendizaje</h2>
                  <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                  Bienvenido a nuestra emocionante ruta de aprendizaje del idioma inglés, diseñada para guiarte desde los fundamentos hasta la fluidez en este idioma global.
                  </p>
                  
                </div>

                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                <Helmet>
                  <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Helmet>
                  <div className="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>

                 
                </div>
             </section>
         <Hito road={road} />
      </div>
      </div>
             
     

  )
}

export default ContainerRoad
