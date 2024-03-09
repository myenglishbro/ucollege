import styles, { layout } from "../style";
import Button2 from "./Button2";
const CardDeal2 = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Road to  Fluency<br className="sm:block hidden" />ft. MyenglishBro!
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
Aquí encontrarás todos los materiales y recursos que usaremos en clase      </p>

 
<Button2 styles={`mt-10`} />
 </div>

    <div className={layout.sectionImg}>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXc2Y2Y2Y2N0MWF5bjI0emJidGJ1YWltNXZ0ZzRsY3cyeXlrM3VlMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uhh3QMYZ7VUfmYqSyY/source.gif" alt="billing" className="w-[90%] h-[100%] relative z-[5]" />
    </div>
  </section>
);

export default CardDeal2;
