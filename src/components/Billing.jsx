import { bill, google,apple } from "../assets";
import styles, { layout } from "../style";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      {/* <img src={bill} alt="billing" className="w-[100%] h-[100%] relative z-[5]" /> */}
      <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGdoczVxczdrdWR6eXpmcGhkYnZhejNmcDlpOXJzM2pmNDg1dGNkdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/otg3tCDmnH372Kxx00/giphy.gif" alt="billing" className="w-[90%] h-[100%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Clases<br className="sm:block hidden" /> 100% Vivenciales
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
     Contamos con un roadmap muy dinamico y desafios para mejorar tu aprendizaje de esta forma dominarás el inglés
      </p>

      <div className="flex flex-row flex-wrap sm:mt-5 mt-6">
      <a href="https://www.udemy.com/user/carlos-apolaya-sanchez/"><img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" /></a>

       <a href="https://www.linkedin.com/in/carlosapolaya/"><img src={google} alt="google_play" className="w-[174.17px] h-[43.08px] object-contain cursor-pointer" /> </a> 
      </div>
    </div>
  </section>
);

export default Billing;