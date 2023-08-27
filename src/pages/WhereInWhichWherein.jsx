import React from 'react'
import Descargables from './Descargables';
import Footer from '../components/Footer';
import Hero from '../components/Hero/Hero';
import {data} from "../utils/data.js"

const WhereInWhichWherein = () => {
    const heroData = data[19]; // selecciona el primer objeto de datos, por ejemplo

    return (
      <>
        <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
      <div className='container-fluid mt-3'>
    <div className='row gap-3 mx-3'>
      <div className='col-lg-7'>
        <p>Where and wherein may look and sound similar, but in reality they have different meanings. In fact, wherein can be another way of saying in which.</p>
         <p>But how do you know when to use each?</p>
         <p>Here, we’ll go over the definitions of where, in which, and wherein, explain the differences between the three, and let you know when you should use one over the others. We’ll also provide examples of how to use all three.</p>
        <article>
        <h2 className='titulos-post'>Definitions of where vs. in which vs. wherein</h2>
       <p>Where: Where can be an adverb or a conjunction. It’s used as an adverb to modify an adjective, verb, or another adverb. As a conjunction, where can be used in a sentence to mean in a place or in situations. Conjunctions are words that connect other words, clauses, or phrases together to create a compound or complex sentence. You can also use it as a conjunction to connect two sentences or clauses, for example:</p> 
          <ul className='listas'>
          <li>She lives in a neighborhood where everyone puts up holiday decorations.</li>
          <li> He only purchases avocados from Mexico, where they grow year-round.</li>
          </ul>
          <p>In which: In which is a combination of the preposition in and the relative pronoun which. When they’re used together, they form a relative pronoun to refer to a subject’s place or time. In which can also be used as an interrogative pronoun to take the place of the word where.</p>
          <ul className='listas'>
          <li>We went to the house on the top of the hill, in which we made many childhood memories.</li>
          <li>In which hotel are they staying?</li>
          </ul>
          <p>Wherein: Wherein can be an adverb or conjunction. As an adverb, it essentially means in what way or how. As a conjunction, its definition is in which.</p>
          <ul className='listas'>
          <li>Wherein was I wrong for putting pineapples on my pizza?</li>
          <li>Please refer to Exhibit C, wherein the terms of the contract are enumerated.</li>
          </ul>
        </article>
     <hr></hr>
     <article>
        <h2 className='titulos-post'>When to use where vs. in which vs. wherein?</h2>
        <h3 className='titulos-post-sec'>Where</h3>
        <p>Use where when you’re trying to indicate the location or position of a subject. Where can also be used as an interrogative adverb when you’re trying to ask someone where a subject is located.</p>
         <p>If you’re using it as an interrogative adverb, make sure the sentence’s verb comes before the subject.</p>
          <ul className='listas'>
          <li>We went back to the restaurant where we had our first date.</li>
          <li>Where is the nearest gas station?</li>
          <li>Where can also be used to refer to the status of a situation or circumstance.</li>
          <li>Where do you see this relationship going?</li>
          <li>He took a plane to Morocco, where he met his cousin for the first time.</li>
          </ul>
          <p>There may be times when you see or hear someone use where in place of when, but that should be avoided in your writing. In the previous sentence, for example, one might have said, “There may be times where . . .” but since we’re talking about time and not a location, we use when.</p>
          <h3 className='titulos-post-sec'>In which</h3>
            <p>The relative pronoun in which is used when you want to connect a relative (or dependent) clause to an independent clause, and it’s usually placed after a subject. As a reminder, relative clauses are sometimes called adjectival clauses since they describe a subject.</p>
            <ul className='listas'>
            <li>Sherlock had come to a halt in his investigation, in which he was trying to figure out who had stolen the king’s crown.</li>
            <p>Some writers use where and in which interchangeably, and while doing so might be grammatically correct, you should use where when referring to a place because it’s what’s known as a locative—a word that indicates a location. In which might be a better choice, however, when writing for a more formal audience.</p>
            <p>The only time you might use in which instead of where is if you need to specify the location of a certain object. For example:</p>
            <li>This is the cabinet where I keep all of my trinkets.</li>
            <p>It’s unclear from this sentence whether the trinkets in question are on the cabinet or inside of it. We can clarify that by replacing where with in which.</p>
            <li>This is the cabinet in which I keep all my trinkets.</li>
            <p>The above sentence makes clear that the trinkets are stored inside the cabinet and not on top of it.</p>
            <p>Although the word wherein can be used in place of where or in what way, it’s best to avoid it because it’s old-fashioned, and no longer used in everyday English. It was popular during Shakespeare’s time and still occurs in modern-day legal documents, but you’ll rarely hear someone use it in a conversation or in their writing.</p>
           </ul>
           <h3 className='titulos-post-sec'>Wherein</h3>
          <p>Although the word wherein can be used in place of where or in what way, it’s best to avoid it because it’s old-fashioned, and no longer used in everyday English. It was popular during Shakespeare’s time and still occurs in modern-day legal documents, but you’ll rarely hear someone use it in a conversation or in their writing.</p>
       
        </article>
     <hr></hr>

     <article>
        <h2 className='titulos-post'>Where vs. in which vs. wherein examples</h2>
          <ul className='listas'>
          <li>This is the house where I grew up.</li>
          <li>Jack dreamed of returning to England, where he had once studied.</li>
          <li>Where there’s smoke, there’s fire.</li>
          <li>Paul put a lot of thought into his book, in which he had written about his walk across the Andes.</li>
          <li>In which house do the McCallisters live?</li>
          <li>After talking to my sister, I realized wherein I was wrong.</li>
          <li>Atlanta was the city wherein John spent most of his formative years.</li>
          </ul>
       
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

export default WhereInWhichWherein
