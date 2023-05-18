import React from 'react'
import MiImagen from '../img/carloswqe.png';


const About = () => {
  return (
   <>
    
     <div class="bg-light text-dark p-5 p-lg-0 pt-lg-5 pb-lg-5  text-sm-start">
    <div class="container-fluid p-5 gap-5 add-style">
        <div class="d-sm-flex d-block d-md-flex align-items-center justify-content-between">
            <div>
              <h1>What's up bro!</h1>
              <p class="lead my-4 me-4 ">
                 Aqui creemos firmemente que hablar un idioma con fluidez y seguridad no tiene que llevarte media vida,
                 costarte “an arm an a leg”, ni ser una de tus peores pesadillas.
                 Aquí aprenderás todo el inglés que necesitas en la vida real, de forma natural y divertida. 
              </p>
            
            </div>
            <div>
            <img class="img-fluid border border-5 rounded w-100 d-none d-sm-block" src={MiImagen} alt="ga"/>
            
            </div>
            
        </div>
        
    </div>
</div>
<div class="badge-base LI-profile-badge" data-locale="es_ES" data-size="large" data-theme="dark" data-type="VERTICAL" data-vanity="carlosapolaya" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://pe.linkedin.com/in/carlosapolaya?trk=profile-badge">Carlos Alberto Apolaya Sánchez</a></div>
              
   </>
  )
}

export default About
