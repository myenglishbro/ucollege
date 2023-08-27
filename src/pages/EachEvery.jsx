import React from 'react'
import {data} from "../utils/data.js"
import Descargables from './Descargables.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero/Hero.jsx';

const EachEvery = () => {
    const heroData = data[18]; // selecciona el primer objeto de datos, por ejemplo

    return (
      <>
        <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
      <div className='container-fluid mt-3'>
    <div className='row gap-3 mx-3'>
      <div className='col-lg-7'>
        
        <p>English is often said to be one of the hardest languages to learn: Its grammar can be tricky, and some of its words have overlapping meanings.</p>    
        <p>When it comes to the words each and every, even seasoned writers can make mistakes. After all, there are times when either word can sound correct, and they can be used to convey very similar ideas—but that doesn’t necessarily mean both words will work in a given sentence. That’s why it’s important to understand what these words truly mean and how they function in a sentence.</p>
        <p>Here’s what you need to know about each and every to use them correctly:</p>
        <article>
        <h2 className='titulos-post'>What does each mean?</h2>
        <p>The word each refers to individual things within a group of two or more. For example: </p>
          <ul className='listas'>
          <li> The last two slices of pizza → each slice</li>
          <li> Canvases in a gallery → each canvas</li>
          <li>Members of your recreational club → each member</li>
          <li> People who are romantically entangled → each other</li>
          </ul>
          <p>In cases where there are only two items in a group, you can use either each or both. Another notable synonym for each other is one another. However, one another is more formal.</p>
        </article>
     <hr></hr>
     <article>
        <h2 className='titulos-post'> What does every mean?</h2>
        <p>Every is similar to each in that both words are used to reference groups of items. While each can be used for groups of two or more, every refers to groups of at least three items. Additionally, every refers to the collective whole, not just the individuals. For instance:</p>
         <h3>Clipping abbreviation examples</h3>
          <ul className='listas'>
          <li>Doctors, in general → every doctor</li>
          <li>All the people at the family reunion → everyone</li>
          <li>The people at a concert → every concertgoer</li>
          
          </ul>
          <p>Another word that you could use instead of every is all.</p>
        </article>
     <hr></hr>
     <article>
        <h2 className='titulos-post'> How to use each and every in a sentence</h2>
        <p>Now that you know the meaning of these words, it’s time to figure out how to use them correctly when you’re structuring a sentence. Here’s a general guideline for how to order the parts of a sentence when you’re using each or every:</p>
         <h3 className='titulos-post-sec'>[each or every] + noun + verb</h3>
         <p>When you’re writing a sentence and trying to decide between using each or every, first think about the noun, or subject, of the sentence. Both each and every can be used only with countable nouns. For instance, dogs, mornings, or milliliters of water are all countable. However, nouns like beauty, water, and research are not.</p>
          <p>If it passes that test, consider the number of items in the group. If it’s only two, stick with each. If it’s three or more, either word could work. The next step is looking at what you want to say. Ask yourself: Am I referring to the individuals in a group or to the group as a whole? If the answer is “individuals in a group,” use each; if it’s “the group as a whole,” use every.</p>
          <p>Once you’ve decided which word works best, look at the verb you want to use. Are you unsure about which form of the verb is correct? For example, you might feel caught between writing “each is” or “each are.” The key here is to remember the rule of subject-verb agreement. That means the subject of your sentence and the verb (i.e., the action word or phrase) should be consistent with each other. So if you’re using a singular subject that refers to an individual thing or object (which is common with both each and every), the verb should be singular, too.</p>
          <ul className='listas'>
          <li>✅ correct Each person is</li>
          <li> ❌incorrect Each person are</li>
         
          </ul>
          <p>Going through all of these steps can feel like a lot of work for a single sentence, especially if you’re learning English as an adult. But, with time and practice, it will become easier, and you’ll be able to structure a sentence without going through so many steps.</p>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'>Each of vs. every one of</h2>
        <p>If each and every are being used before a plural noun, you need to include the word of after them. That’s when the phrases each of and every one of come in handy. For example: </p>
        <p>She gave each of them assignments that day.</p>
        <p>The teacher graded every one of the tests.</p>
       
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'>Each and every examples</h2>
                    <ul className='listas'>
            <li>Each person recalled their best birthday memory.</li>
            <li>They were each holding a copy of the book.</li>
            <li>Each of the graduates thanked the history teacher.</li>
            <li>They looked at each other.</li>
            </ul>
            <ul className='listas'>
            <li>Every person at the party stopped talking.</li>
            <li>Every one of the students passed the test.</li>
            <li>Almost every contestant wore headphones.</li>
            <li>Everyone at the barbeque wore a hat.</li>
            </ul>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'> Each and every FAQs</h2>
        
        <h3>What’s the difference between each and every? </h3>
        <p>Each focuses on individual things within a larger group of two or more items, while every refers to a collective group of three or more items.</p>
        <h3>What are some examples of how each and every is used?  </h3>
        <p>Each: “She had a small tattoo on each wrist.” Every: “She wore a ring on every finger.”</p>
        <h3>Is it correct to say each and every? </h3>
        <p>While this phrase is commonly used for emphasis, each and every is redundant, so it’s best kept out of formal or professional writing.</p>
      
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

export default EachEvery
