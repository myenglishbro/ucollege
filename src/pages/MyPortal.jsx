import { card } from "../assets";
import styles, { layout } from "../style";

const MyPortal = () => {
  
  return (
    <>
      <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Enlace a clases<br className="sm:block hidden" /> a Distancias
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Recuerda que puedes cancelar tu clase con 24 horas de anticipación
      </p>

      <a href="https://meet.google.com/" className="text-blue-500 hover:underline">
        Ingresar a clase
      </a>
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>

  <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Revisa tus clases!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
       Aquí encontraras tus clases grabadas y las fechas de las mismas para un mejor control
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <a
        href="https://docs.google.com/spreadsheets/d/1ztiRdJp4b6odziiqhwlEoE6VfLopJiMOrT_RvOl7KDc/edit?usp=sharing"
        className="text-blue-500 hover:underline"
      >
        Ver clases
      </a>
    </div>
  </section>
    </>
  );
};

export default MyPortal;
