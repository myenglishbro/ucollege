import React from 'react'
import "../css/styles.css"
import cliente1 from '../img/clients/client-1.png';
import cliente2 from '../img/clients/client-2.png';
import cliente3 from '../img/clients/client-3.png';
import cliente4 from '../img/clients/client-4.png';
import cliente5 from '../img/clients/client-5.png';
import cliente6 from '../img/clients/client-6.png';
import Hero from './Hero';
import Benefit from '../components/Benefit/Benefit';
import LearningExperience from '../components/LearningExperience/LearningExperience';
import Situations from '../components/Situations/Situations';


const Home = () => {
  return (
    <>
      {/* <div class="hero-main vh-100 d-flex align-items-center">
    <div class="container">
        <div class="row">
            <div class="col-lg-7 mx-auto text-center">
                <h1 class="display-4 text-white">Únete a la comunidad de aprendizaje online en vivo más grande de Latinoamérica </h1>
                <p class="text-white my-3">Clases online en vivo , enfoque 100% práctico, mentorías personalizadas y acceso a una comunidad de estudiantes.</p>
                <a href="https://wa.link/qwnf6w" class="btn me-2 btn-main">Contactar</a>
                <a href="https://wa.link/qwnf6w" class="btn btn-outline-light">Grupo Wsp</a>
            </div>
        </div>

    </div>

</div> */}
<Hero></Hero>
<section id="clients" class="clients clients">
        <div class="container">
  
          <div class="row">
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente1} class="img-fluid" alt="" data-aos="zoom-in"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente2} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="100"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente3} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="200"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente4} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="300"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente5} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="400"></img>
            </div>
  
            <div class="col-lg-2 col-md-4 col-6">
              <img src={cliente6} class="img-fluid" alt="" data-aos="zoom-in" data-aos-delay="500"></img>
            </div>
  
          </div>
  
        </div>
      </section>
<Situations></Situations>
<Benefit></Benefit>
<LearningExperience></LearningExperience>
   

      <div id="mainslider3" class="carousel slide" data-bs-ride="carousel tiktok">
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
    
            </div>
    </>
  )
}

export default Home
