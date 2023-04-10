import React from 'react';
import { FcAssistant } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Articulo = ({thumbnail, title, subtitle, dateAdded, description, channel, enlaces}) => {

  const styles = {
    colImg: {
      backgroundImage: `url(${thumbnail})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      marginTop: '30px',
      minHeight: '80px',
    }
  };

  return (
    <>
      <section className="row w-80 py-0 bg-light mt-0">
        <div className="col-lg-6 d-none d-sm-block" style={styles.colImg}></div>
        <div className="col-lg-6 py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <h6>{subtitle}</h6>
                        <Link to="/PhrasesAtWork">
                          <h1>{title}</h1> 
                        </Link>
                        <p>{description}</p>
                        <div className="feature d-flex">
                            <div className="icon-sm me-4">
                            <FcAssistant></FcAssistant>
                            </div>
                            <div>
                            <p>{enlaces.channel}</p>
                              <h5>Enlaces de Recursos:</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Articulo;
