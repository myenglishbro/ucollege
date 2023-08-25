import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'
import Hero from '../components/Hero/Hero'
import {data} from "../utils/data.js"

const Article = () => {
    const heroData = data[20]; // selecciona el primer objeto de datos, por ejemplo

    return (
        <>
          <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
        <div className='container-lg'>
      <div className='row gap-3 mx-3'>
        <div className='col-lg-7'>
         
          <p>
          <span className='negritas'>What is it? </span>🤔 A word that is used with a noun or its equivalent. Articles
            work similarly to adjectives in English.🌟
          </p>
          <p>
          What is the function of an article? An article defines a noun. Simply
            put, it points out or refers to nouns.          </p>    
            <div className='box'><p className='box-words'>Articles describe a noun: whether it’s specific, or
                mentioned for the first time, or general, or one of many, etc.
                Articles define a noun as specific or unspecific.📝🤔</p></div> 
        <p>Types: definite (THE) / indefinite (A, AN) / zero article (–).</p>
        <hr></hr>
    
          <article>
          <span className='titulos-post'>THE DEFINITE ARTICLE “THE”</span>
        
          
          <div class="container">
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Usage of "The"</th>
        <th>Examples</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Used before singular, plural, and uncountable nouns</td>
        <td>The book, the dogs, the water</td>
      </tr>
      <tr>
        <td>Used before something that’s already known</td>
        <td>The school I go to is located not far from my home.</td>
      </tr>
      <tr>
        <td>Used before something specific</td>
        <td>The school in my neighborhood is the best one.</td>
      </tr>
      <tr>
        <td>Used before collective adjectives</td>
        <td>The rich, the poor, the elderly</td>
      </tr>
      <tr>
        <td>Used before unique phenomena</td>
        <td>The sun, the moon, the sky</td>
      </tr>
      <tr>
        <td>Used before geographical features</td>
        <td>The ocean, the sea, the desert</td>
      </tr>
      <tr>
        <td>Used before time of day</td>
        <td>The morning, the evening</td>
      </tr>
      <tr>
        <td>Used before titles</td>
        <td>The Queen, The King in the North</td>
      </tr>
      <tr>
        <td>Used before centuries, decades</td>
        <td>The 1950s</td>
      </tr>
      <tr>
        <td>Used before musical instruments</td>
        <td>The cello, the piano</td>
      </tr>
      <tr>
        <td>Used before last names</td>
        <td>The Smiths, The Potters</td>
      </tr>
    </tbody>
  </table>
</div>


            <div className='examples'>
            <p>try replacing THE with THIS. If the meaning doesn’t change, you’ve
chosen the right article.</p>
            </div>


            
          </article>
       <hr></hr>
    
  
          
    
    
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

export default Article
