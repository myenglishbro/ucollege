import React from 'react'
import ContainerProducts from './ContainerProducts'
import Oferta from '../components/Promocion/Oferta'

const Store = () => {
  
  return (
    <>
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">¡Oferta Especial!</h4>
  <p>¡Aprovecha nuestro descuento exclusivo del 70% en libros digitales de la serie "World English 3E"!</p>
  <hr/>
  <p class="mb-0">Esta oferta es por tiempo limitado, así que no pierdas la oportunidad de mejorar tus habilidades en inglés.</p>
</div>
<Oferta></Oferta>
    <ContainerProducts></ContainerProducts>

    </>
  )
}

export default Store
