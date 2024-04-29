import styles from "../style";

const Schedule = () => (
  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Horarios Disponibles</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
         Sí deseas llevar clases personalizadas ,puedes revisar la hora y disponibilidad que mejor se adapte a tu disponibilidad
      </p>
    
    </div>

 
   

  <div className={`${styles.flexCenter}  ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <iframe src="https://docs.google.com/spreadsheets/d/1zveQ_IMRxsB8CFHxy-jK40wDx48bfN6HqgLG63yctxo/edit?usp=sharing" width="370px" height="350px" frameborder="0"/>
    </div>
    
  </section>
);

export default Schedule;
