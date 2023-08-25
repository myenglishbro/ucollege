import React from 'react';
import banner from "../../img/banner.jpg";

const Hero = () => {
  return (
    <section class="section pb-0 mt-40">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-lg-7 text-center text-lg-left">
          <h1 class="mb-4">Democratizando la Educación</h1>
          <p class="mb-4">Únete a la comunidad de aprendizaje online y en vivo más grande de habla hispana</p>
          <form class="search-wrapper" action="search.html">
            <input id="search-by" name="s" type="search" class="form-control form-control-lg"
              placeholder="Search Here..."/>
            <button type="submit" class="btn btn-primary">Search</button>
          </form>
        </div>
        <div class="col-lg-4 d-lg-block d-none">
          <img src={banner} alt="illustration" class="img-fluid"/>
        </div>
      </div>
    </div>
  </section>
  );
}

export default Hero;
