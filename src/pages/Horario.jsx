import React from 'react'
import "../css/horario.css"
const Horario = () => {
  return (
   <>

<div class="alert alert-primary" role="alert">
  <h4 class="alert-heading">📢 ¡Atención estudiantes!👩‍🏫🤓✍️</h4>
  <p>Queridos estudiantes, les pedimos amablemente que tomen en cuenta que los siguientes horarios ya no estarán disponibles desde Junio en Adelante:</p>
  <ul>
    <li>🕢 7:30 pm - 9:00 pm</li>
    <li>🕘 9:15 pm - 10:45 pm</li>
  </ul>
  <hr></hr>
    <p class="mb-0">Si tienes un paquete de clases en progreso seguiras en el mismo horario hasta terminar el mes 🙌✨</p>

  <p class="mb-0">Ambos horarios no estarán disponibles hasta nuevo aviso. Nos complace informarles que este evento comenzará en junio. Por favor, tenganlo en cuenta y estén atentos a cualquier actualización. ¡Gracias por su atención y participación! 🙌✨</p>
</div>



    <div class="container-fluid  ">
     <div class="row">
      <div class="col-lg-2">
      <h5 class="text-center">Monday 🌞</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item ">08:00-09:00 am 🟢 Open</li>
          <li class="list-group-item ">09:00-10:00 am 🟢 Open</li>
          <li class="list-group-item">10:00-11:00 am 🟢 Open</li>
          <li class="list-group-item ">11:00-12:00 am 🟢 Open </li>
          <li class="list-group-item">12:00-01:00 pm 🟢 Open</li>

          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
           <li class="list-group-item bg-warning">02:00-03:00 pm 🔴 Gaby</li>
          <li class="list-group-item bg-warning">03:00-04:00 pm 🔴 Gaby</li>
          <li class="list-group-item">04:00-05:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">05:00-06:00 pm 🔴 Rita</li>
          <li class="list-group-item">06:00-07:00 pm 🟢 Open</li>
       
          
          <li class="list-group-item ">11:00-12:00 pm 🟢 Open</li>

        </ul>
      </div>
      
      <div class="col-lg-2">
      <h5 class="text-center">Tuesday 🌈</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item ">08:00-09:00 am 🟢 Open</li>

      <li class="list-group-item ">09:00-10:00 am 🟢 Open</li>
          <li class="list-group-item">10:00-11:00 am 🟢 Open</li>
          <li class="list-group-item">11:00-12:00 am 🟢 Open</li>
          <li class="list-group-item">12:00-01:00 pm 🟢 Open</li>

          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
          {/* <li class="list-group-item bg-warning">02:00-03:00 pm 🔴 Raul</li>
          <li class="list-group-item bg-warning">03:00-04:00 pm 🔴 Raul</li> */}
          <li class="list-group-item ">02:00-03:00 pm 🟢 Open</li>
          <li class="list-group-item ">03:00-04:00 pm 🟢 Open</li>
          <li class="list-group-item">04:00-05:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">05:00-06:00 pm 🔴 Rita</li>
          <li class="list-group-item">06:00-07:00 pm 🟢 Open</li>
         
          
          <li class="list-group-item ">11:00-12:00 pm 🟢 Open</li>

        </ul>
      </div>
      <div class="col-lg-2">
      <h5 class="text-center">Wednesday 🌟</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item ">08:00-09:00 am 🟢 Open</li>

      <li class="list-group-item ">09:00-10:00 am 🟢 Open</li>
          <li class="list-group-item">10:00-11:00 am 🟢 Open</li>
          <li class="list-group-item">11:00-12:00 am 🟢 Open</li>
          <li class="list-group-item">12:00-01:00 pm 🟢 Open</li>

          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">02:00-03:00 pm 🔴 Gaby</li>
          <li class="list-group-item bg-warning">03:00-04:00 pm 🔴 Gaby</li>
        
          <li class="list-group-item">04:00-05:00 pm 🟢 Open</li>
          <li class="list-group-item">05:00-06:00 pm 🟢 Open</li>
          <li class="list-group-item ">06:00-07:00 pm 🟢 Open</li>
          
        
          <li class="list-group-item ">11:00-12:00 pm 🟢 Open</li>

        </ul>
      </div>
      <div class="col-lg-2">
      <h5 class="text-center">Thursday 🤗</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item ">08:00-09:00 am 🟢 Open</li>

      <li class="list-group-item ">09:00-10:00 am 🟢 Open</li>
          <li class="list-group-item">10:00-11:00 am 🟢 Open</li>
          <li class="list-group-item">11:00-12:00 am 🟢 Open</li>
          <li class="list-group-item">12:00-01:00 pm 🟢 Open</li>

          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
        
          <li class="list-group-item ">02:00-03:00 pm 🟢 Open</li>
          <li class="list-group-item ">03:00-04:00 pm 🟢 Open</li>
          <li class="list-group-item">04:00-05:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">05:00-06:00 pm 🔴 Rita</li>
          <li class="list-group-item">06:00-07:00 pm 🟢 Open</li>
         
          
          <li class="list-group-item ">11:00-12:00 pm 🟢 Open</li>

        </ul>
      </div>
      <div class="col-lg-2">
      <h5 class="text-center">Friday 🥳</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item ">08:00-09:00 am 🟢 Open</li>

      <li class="list-group-item ">09:00-10:00 am 🟢 Open</li>
          <li class="list-group-item">10:00-11:00 am 🟢 Open</li>
          <li class="list-group-item ">11:00-12:00 am  🟢 Open</li>
          <li class="list-group-item">12:00-01:00 pm 🟢 Open</li>

          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
           <li class="list-group-item bg-warning">02:00-03:00 pm 🔴 Gaby</li>
          <li class="list-group-item bg-warning">03:00-04:00 pm 🔴 Gaby</li>
          <li class="list-group-item ">03:00-04:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">04:00-05:00 pm 🔴 Rafael</li>
          <li class="list-group-item bg-warning">05:00-06:00 pm 🔴 Rita</li>
          <li class="list-group-item">06:00-07:00 pm 🟢 Open</li>
         
          
          <li class="list-group-item ">11:00-12:00 pm 🟢 Open</li>

        </ul>
      </div>
      <div class="col-lg-2">
      <h5 class="text-center">Saturday 💪</h5>
      <ul class="list-group list-group-flush">

      <li class="list-group-item bg-warning ">07:50-08:50 am 🔴 Arnold</li>

          <li class="list-group-item bg-warning">09:00-10:00 am 🔴 ICPNA</li>
          <li class="list-group-item bg-warning">10:00-11:00 am 🔴 ICPNA</li>
          <li class="list-group-item bg-warning">11:00-12:30 am 🔴 ICPNA</li>
          <li class="list-group-item">01:00-02:00 pm 🟢 Open</li>
          <li class="list-group-item">02:00-03:00 pm 🟢 Open</li>
          <li class="list-group-item ">02:00-03:00 pm 🟢 Open</li>
          <li class="list-group-item ">03:00-04:00 pm 🟢 Open</li>
          <li class="list-group-item bg-warning">04:00-05:00 pm 🔴 UPCH </li>
          <li class="list-group-item bg-warning">05:00-06:00 pm 🔴 UPCH </li>
          <li class="list-group-item bg-warning">06:00-07:15 pm 🔴 UPCH </li>
          

        </ul>
      </div>


      
      

     </div>

    
  </div>
   </>
  )
}

export default Horario
