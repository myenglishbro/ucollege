import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
     Nuestras Asesorías <br className="sm:block hidden" />Educativas
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
    Nos adaptamos a tus requerimientos , tiempos y objetivos
      </p>

   
    </div>

    <div className={layout.sectionImg}>
      <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGgyOTJpY3B2Z3BtMjBmdmFtdHF0bnk3OHUycms4ZHpsZ251b2FuNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/z8bXS41OOIiN7IcM3u/giphy.gif" alt="billing" className="w-[100%] h-[100%]" />

    </div>
  </section>
);

export default CardDeal;
