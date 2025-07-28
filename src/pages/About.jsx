import React from 'react'
import { about } from "../assets/index.js";
import styles, { layout } from "../style";
const About = () => {
  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>

      <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Aprende el inglés <br className="sm:block hidden" />de la vida diaria
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Garantizamos un aprendizaje individualizado. Domina el inglés que realmente necesitas para socializar, trabajar y viajar con confianza. ¡Únete ahora y desbloquea tu potencial lingüístico!
      </p>

    
    </div>

    <div className={layout.sectionImg}>
      <img src={about} alt="billing" className="w-[80%] h-[80%]" />
    </div>
  </section>
        </div>
      </div>
   
  )
}

export default About
