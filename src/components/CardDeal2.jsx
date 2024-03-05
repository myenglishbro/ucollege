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
    <video
          id="valere-float"
          alt="Valerian programming animation"
          className="award-video_sec"
          autoPlay
          loop
          playsInline
          preload="metadata"
          style={{ aspectRatio: '1 / 1', objectFit: 'contain' }}
        >
          <source
            src="https://d2c3hglki5wb5z.cloudfront.net/assets/about-us.webm"
            type="video/webm"
          />
        </video>
    </div>
  </section>
);

export default CardDeal2;
