import React from 'react'
import {data} from "../utils/data"
import Articulo from './Articulo'
const ContainerVideo = () => {
  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {data.map((item) => (
        <Articulo
          key={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          subtitle={item.subtitle}
          enlaceblog={item.enlaceblog}
          description={item.description}
          channel={item.channel}
        />
      ))}
    </div>
  );
};

export default ContainerVideo
