import React from 'react'
import {products} from '../utils/products.js'
import Producto from './Producto.jsx'
const ContainerProducts = () => {
  return (
    <>
            <div className="card-container d-flex flex-wrap justify-content-center">

            
             <Producto 
             products={products}>


             </Producto>
             </div>

        
    
    </>
  )
}

export default ContainerProducts
