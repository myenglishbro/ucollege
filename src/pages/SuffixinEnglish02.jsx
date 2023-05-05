import React from 'react'
import Descargables from './Descargables';
import Footer from './Footer';
import Hero from './Hero';
import {data} from "../utils/data.js"

const SuffixinEnglish02 = () => {
    const heroData = data[23]; // selecciona el primer objeto de datos, por ejemplo

    return (
      <>
      <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
  
  <div className='container-fluid'>
  <div className='row gap-3 mx-3'>
  <div className='col-lg-7'>
  
  <h2 className='titulos-post'>-able and -ible</h2>
  <p> The suffixes -able and -ible both mean capable of or suitable for, but we treat them differently. The most important difference is that -able is a living suffix, meaning we can affix it to virtually any verb without using a hyphen, while -ible is not used to make new words. It lives on mainly in old words passed down through the centuries.</p>
  <p>As the living suffix, -able is useful for coining new words, though we often have to ignore spell check when it comes to -able coinages. For example, our spell check disapproves of sanctionable, channelable, overthrowable, redoable, and torturable, but these are perfectly good words and do not require hyphenation.</p>
  <p>To form an -able word, treat the verb as you do when making an -ing participle. For example, we make moving from move by dropping the e and adding -ing. So, to make move‘s -able adjective, we drop the e and add -able: movable.</p>
  <p>But when creating an -able word, make sure there is not already an equivalent -ible word (see below). For instance, convertable is superfluous because we already have convertible. All accepted -ible words are listed in the dictionary.</p>
  <hr></hr>
  
  <article>
  <span className='titulos-post'>–ible adjectives</span>
  
  <p>👉Unlike –able, -ible isn’t used to make new words. It exists only in words retained from earlier stages of English. Here are a few of the most common words with the suffix:</p>
  
  <div class="container">
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Palabra</th>
        <th>Significado en español</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Accessible</td>
        <td>Accesible</td>
      </tr>
      <tr>
        <td>Admissible</td>
        <td>Admisible</td>
      </tr>
      <tr>
        <td>Audible</td>
        <td>Audible</td>
      </tr>
      <tr>
        <td>Convertible</td>
        <td>Convertible</td>
      </tr>
      <tr>
        <td>Controvertible</td>
        <td>Controvertible</td>
      </tr>
      <tr>
        <td>Credible</td>
        <td>Credible</td>
      </tr>
      <tr>
        <td>Defensible</td>
        <td>Defendible</td>
      </tr>
      <tr>
        <td>Digestible</td>
        <td>Digerible</td>
      </tr>
      <tr>
        <td>Discernible</td>
        <td>Discernible</td>
      </tr>
      <tr>
        <td>Dismissible</td>
        <td>Desestimable</td>
      </tr>
      <tr>
        <td>Edible</td>
        <td>Comestible</td>
      </tr>
      <tr>
        <td>Eligible</td>
        <td>Elegible</td>
      </tr>
      <tr>
        <td>Exhaustible</td>
        <td>Agotable</td>
      </tr>
      <tr>
        <td>Fallible</td>
        <td>Falible</td>
      </tr>
      <tr>
        <td>Feasible</td>
        <td>Viable</td>
      </tr>
      <tr>
        <td>Flexible</td>
        <td>Flexible</td>
      </tr>
      <tr>
        <td>Gullible</td>
        <td>Ingenúo</td>
      </tr>
      <tr>
        <td>Horrible</td>
        <td>Horrible</td>
      </tr>
      <tr>
        <td>Invincible</td>
        <td>Invencible</td>
      </tr>
      <tr>
        <td>Legible</td>
        <td>Legible</td>
      </tr>
      <tr>
        <td>Ostensible</td>
        <td>Presunto</td>
      </tr>
      <tr>
        <td>Perceptible</td>
        <td>Perceptible</td>
      </tr>
      <tr>
        <td>Permissible</td>
        <td>Permisible</td>
      </tr>
      <tr>
        <td>Plausible</td>
        <td>Plausible</td>
      </tr>
      <tr>
        <td>Possible</td>
        <td>Posible</td>
      </tr>
      <tr>
        <td>Reprehensible</td>
        <td>Reprochable</td>
      </tr>
      <tr>
        <td>Susceptible</td>
        <td>Susceptible</td>
      </tr>
      <tr>
        <td>Terrible</td>
        <td>Terrible</td>
      </tr>
      <tr>
        <td>Visible</td>
        <td>Visible</td>
      </tr>
   </tbody>
   </table>
   </div>
  </article>
  <hr></hr>
  
  <article>
  
  <p>Many -ible adjectives have corresponding -able words from which they have differentiated over time. For example, forcible and forceable have different meanings. Other -ible words have -able variants that are identical in meaning—for example, extendable and extendible.</p>
  </article>
  
  
  
  
  
  </div>
  <div className='col-lg-2 '>
  
  <img
  src="https://i.ibb.co/bX2x42b/Rosa-Vertical-Retro-Banner-retr-ctil-para-Black-Friday-1.png"
  alt="Imagen relacionada con el trabajo"
  style={{ width: "100%", height: "auto" }}
  />
  <img
  src="https://i.ibb.co/tz5HvdR/Rosa-Vertical-Retro-Banner-retr-ctil-para-Black-Friday.png"
  alt="Imagen relacionada con el trabajo"
  style={{ width: "100%", height: "auto" }}
  />
  
  
  
  
  
  
  </div>
  <Descargables></Descargables>
  </div>
  </div>
  <Footer></Footer>
  </>
    )
  }
  

export default SuffixinEnglish02
