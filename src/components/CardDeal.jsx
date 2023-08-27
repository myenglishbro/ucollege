import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Aprende el inglés <br className="sm:block hidden" />de la vida diaria
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Garantizamos un aprendizaje individualizado. Domina el inglés que realmente necesitas para socializar, trabajar y viajar con confianza. ¡Únete ahora y desbloquea tu potencial lingüístico!
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
