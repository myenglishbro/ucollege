import React from 'react'
import "../css/styles.css"
import myenglishbro from '../img/clients/myenglishbro.png';
import islcollective from '../img/clients/islcollective.png';
import wordwall from '../img/clients/wordwall.webp';
import Benefit from '../components/Benefit/Benefit';
import LearningExperience from '../components/LearningExperience/LearningExperience';
import Situations from '../components/Situations/Situations';
import Hero from '../components/Hero/Hero';
import Iner from '../components/Iner';
import styles from '../style';
import Billing from '../components/Billing';
import Business from '../components/Business';
import CTA from '../components/CTA';
import Schedule from '../components/Schedule';
import Business3 from '../components/Business3';
import Business2 from '../components/Business2';
import Hero2 from '../components/Hero/Hero2';
import Benefits from '../components/Benefits';
import Collaboration from '../components/Collaboration';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Roadmap from '../components/Roadmap';
const Home = () => {
  return (
    <>

     
        <Hero2></Hero2>
        <Benefits/>
<Services></Services>
      <Collaboration></Collaboration>
      <Pricing></Pricing>
      <Roadmap></Roadmap>
      <div className={`${styles.boxWidth}`}>
     
      <Business/>
      <Business2/>
      <Business3/>
      <Schedule></Schedule>
        <Billing />
    
        <CTA></CTA>
      </div>
    
    
   
{/* <section id="clients" class="clients clients">
        <div class="container ">
  
          <div class="row d-flex justify-center">

            <div class="col-lg-2 col-md-4 col-6">
              <img src={myenglishbro} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="200"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={islcollective} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="400"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={wordwall} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500"></img>
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <img src={myenglishbro} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="600"></img>
            </div>

            <div class="col-lg-2 col-md-4 col-6">
              <img src={islcollective} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="700"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={wordwall} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="800"></img>
            </div>
          </div>
  
        </div>
      </section> */}
{/* <Situations></Situations> */}
{/* <Iner></Iner> */}
{/* <SourceDisclaimer/> */}
{/* <Benefit></Benefit> */}
{/* <LearningExperience></LearningExperience> */}
   {/* <Footer/> */}

      {/* <div id="mainslider3" class="carousel slide" data-bs-ride="carousel tiktok">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        
                            <iframe width="400px" class="d-block w-100 " height="350px" src="https://www.youtube.com/embed/H9E2WH6BaRU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                             </div>
                      <div class="carousel-item active">
                        
                        <iframe width="400px" class="d-block w-100 " height="350px" src="https://www.youtube.com/embed/6hCEi2camwg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>             
                         </div>
                      <div class="carousel-item">
                        <iframe width="400px" class="d-block w-100 " height="350px" src="https://www.youtube.com/embed/aSpsus810jg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>                     
                     </div>
                        <div class="carousel-item">
                        <iframe width="400px" class="d-block w-100 " height="350px" src="https://www.youtube.com/embed/HoK25HNMjQU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>           
                      </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#mainslider3" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#mainslider3" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                </div>
    
            </div> */}
    </>
  )
}

export default Home
