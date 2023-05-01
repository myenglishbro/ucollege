import React, { useState } from 'react'
import { data } from "../utils/data"
import Articulo from './Articulo'

const ContainerVideo = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === "") {
      setSearchResult([]);
    } else {
      const result = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResult(result);
    }
  };

  return (
    <>
<div className='container-fluid mx-5 d-flex align-items-center justify-content-center' >
  <p style={{marginRight: "10px", fontSize: "1.2rem"}}>Busca el tema que deseas aprender:</p>
  <input
    type="text"
    placeholder="Buscar por título o subtítulo"
    value={searchValue}
    onChange={handleSearch}
  />
</div>


      <div className="card-container d-flex flex-wrap justify-content-center">
        {searchResult.length > 0 ? (
          searchResult.map((item) => (
            <Articulo
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              subtitle={item.subtitle}
              enlaceblog={item.enlaceblog}
              description={item.description}
              channel={item.channel}
            />
          ))
        ) : (
          data.map((item) => (
            <Articulo
              key={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              subtitle={item.subtitle}
              enlaceblog={item.enlaceblog}
              description={item.description}
              channel={item.channel}
            />
          ))
        )}
      </div>
    </>
  );
};

export default ContainerVideo
