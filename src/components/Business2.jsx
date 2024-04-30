import { features2 } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";

const FeatureCard = (data) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${data.index !== features2.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
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

const Business2 = () =>  (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
       Asesoría de  <br className="sm:block hidden" /> Inglés Personalizado
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Si quieres aprender inglés desde cero , cualquier nivel  o quieres llevar clases a tu propio ritmo pero con alguien que te diga como mejorar más rápido.
      Ya sea con amigos o de forma individual sea cual sea tu objetivos , por diversión, trabajo , becas o ciudadanía esto es para ti!
      </p>
      <p className={`${styles.paragraph} max-w-[470px] mt-3 text-[20px]` }>
     Costo:   <span className="text-gradient font-semibold ">S/25  </span>.
        </p>
        <p className={`${styles.paragraph} max-w-[470px] mt-3 text-[20px]` }>
    Duración:   <span className="text-gradient font-semibold ">1 Hora de clase en Vivo </span>.
        </p>
      <Button styles={`mt-10`} />
    </div>

    <div className={`${layout.sectionImg} flex-col`}>
      {features2.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default Business2;