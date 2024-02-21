import { features } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = (data) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${data.index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img src={data.icon} alt="star" className="w-[50%] h-[50%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {data.title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {data.content}
      </p>
    </div>
  </div>
);

const Business = () =>  (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Estudia Inglés <br className="sm:block hidden" /> desde $9.99 
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Somos un espacio en línea dedicado a brindar oportunidades de aprendizaje a personas con recursos limitados. Nuestra misión es democratizar la educación al ofrecer clases gratuitas y recursos de calidad tanto para docentes como para estudiantes.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business;