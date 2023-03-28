import React from 'react'
import {data} from "../utils/data"
import Articulo from './Articulo'
const ContainerVideo = () => {
  return (
    <>
        {
            data.map(item=>(
             <Articulo 
             key={item.id}
             thumbnail={item.thumbnail}
             title={item.title}
            dateAdded={item.dateAdded}
            channel={item.channel}
            description={item.description}
            subtitle={item.subtitle}
            enlaces={item.enlaces}>


             </Articulo>

            ))
        }
    </>
  )
}

export default ContainerVideo
