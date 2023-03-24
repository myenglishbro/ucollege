import React from 'react'

const Horario = () => {
  return (
    <section class="container-lg">
    <div class="table-responsive  add-style ">
      <table class="table ">
        <thead class="table-dark">
          
          <th>HORA</th>
          <th>LUNES</th>
          <th>MARTES</th>
          <th>MIERCOLES</th>
          <th>JUEVES</th>
          <th>VIERNES</th>

       
       
        </thead>
        <tbody>
          <tr   class="table-success">
            <td  class="table-light">7:00 - 8:45 am</td>
            <td class="table-dark">🙅 No Available</td>
            <td class="table-dark">🙅 No Available</td>
            <td class="table-dark">🙅 No Available</td>
            <td class="table-dark">🙅 No Available</td>
            <td class="table-dark">🙅 No Available</td>
     
          </tr>
          <tr class="table-success">
            <td class="table-light">8:45 - 10:15 am</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>

          </tr>
          

          <tr class="table-success">
            <td class="table-light">10:30 - 12:30 am</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>

            
         
          </tr>
          <tr class="table-success">
            <td class="table-light">01:00 - 2:00 Pm</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-warning">🤩 disponible</td>

            
         
          </tr>

          <tr class="table-light">
            <td class="table-light">02:00 pm- 03:00 pm</td>
            <td colspan="5"  class="table-success text-center"> Ucollege Canada</td>  

 
           
          </tr>
          <tr class="table-light">
            <td class="table-light">03:00 pm- 04:00 pm</td>
            <td colspan="5"  class="table-success text-center"> Ucollege Canada</td>  

 
           
          </tr>

          <tr  class="table-success">
            <td class="table-light">04:00 - 05:00</td>
            <td colspan="5"  class="table-success text-center"> ICPNA </td>  

           
           
          </tr>
          <tr  class="table-success">
            <td class="table-light">05:00 - 05:30</td>
            <td colspan="5"  class="table-success text-center"> ICPNA </td>  

           
           
          </tr>
        
          <tr class="table-warning">
            <td class="table-light">06:00 - 07:00</td>
            <td class="table-success">Crash Course</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-success">Crash Course</td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-success">Crash Course</td>


           

          </tr>
          
         
          <tr class="table-success">
            <td class="table-light">07:00 pm - 8:00 pm </td>
            <td colspan="5" class="text-center"> Universidad Cayetano Heredia</td>  

             

          </tr>
          <tr class="table-success">
            <td class="table-light">08:00 pm - 09:00 pm </td>
            <td colspan="5" class="text-center"> Universidad Cayetano Heredia</td>  


          </tr>
          <tr class="table-success">
            <td class="table-light">09:00 pm - 10:45 pm </td>
            <td colspan="5" class="text-center"> Universidad Cayetano Heredia</td>  


          </tr>
          <tr class="table-success">
            <td class="table-light">11:00 pm - 12:00 pm </td>
            <td class="table-warning">🤩 disponible</td>
            <td class="table-success text-center">BRAYAN</td>
            <td class="table-success text-center">BRAYAN</td>
            <td class="table-success text-center">BRAYAN</td>
            <td class="table-success text-center">BRAYAN</td>



             

          </tr>

          
        
          
          
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">📢 Clase cancelada el mismo día no tiene recuperación</td>
          </tr>
          <tr>
            <td colspan="3">📢 Los horarios <span class="text-bg-warning">No Available</span> consultar por wsp  </td>
          </tr>
        </tfoot>
      </table>

    </div>
    
  </section>
  )
}

export default Horario
