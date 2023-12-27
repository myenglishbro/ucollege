import {roaddev} from "../utils/road"
import Hito from './Hito'
import styles from "../style"
import { Helmet } from 'react-helmet';

const ContainerRoadDev = () => {
  return (
         

<div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
      <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
                <div className="flex-1 flex flex-col">
                  <h2 className={styles.heading2}>Repositorio</h2>
                  <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
                  Te damos la bienvenida a nuestro emocionante repositorio de aprendizaje del idioma inglés, cuidadosamente diseñado para guiarte desde los conceptos básicos hasta alcanzar la fluidez en este idioma global.
                  </p>
                  
                </div>

                <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                <Helmet>
                  <script src="https://apis.google.com/js/platform.js" async defer></script>
                </Helmet>
                  <div className="g-ytsubscribe" data-channelid="UCmoCEECyW8IRFEmsu3-Z30g" data-layout="full" data-count="hidden"></div>

                 
                </div>
             </section>
         <Hito road={roaddev} />
      </div>
      </div>
             
     

  )
}

export default ContainerRoadDev
