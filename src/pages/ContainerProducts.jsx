import React from 'react'
import {products} from '../utils/products.js'
import Producto from './Producto.jsx'
const ContainerProducts = () => {
  return (
    <>
        
            
             <Producto 
             products={products}>


             </Producto>

        
    
    </>
  )
}

export default ContainerProducts
