import React from 'react'
import Descargables from './Descargables';
import Footer from '../components/Footer';
import Hero from '../components/Hero/Hero';
import {data} from "../utils/data.js"

const Abbreviations = () => {
    const heroData = data[17]; // selecciona el primer objeto de datos, por ejemplo

    return (
      <>
        <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
      <div className='container-fluid mt-3'>
    <div className='row gap-3 mx-3'>
      <div className='col-lg-7'>
        
        <p>An abbreviation is a shortened form of a word or words; because there are different ways to shorten words, there are a few different types of abbreviations. For example, you could get rid of a syllable or two, create a contraction, or use the first letters of multiple words to create an entirely new word.
    </p>      
    <p>If you want to make an abbreviation, you have several options. In this guide, we explain the types of abbreviations, describe how they work, and provide plenty of abbreviation examples so you can see how it’s done.</p>
        <article>
        <h2 className='titulos-post'>What are abbreviations in English?</h2>
         <p>An abbreviation is just a short version of a longer word or a phrase. For example, the word ad is an abbreviation of advertisement, and the word don’t is an abbreviation of do not. Abbreviations are prevalent in both speaking and writing. They’re present in most languages as well, so abbreviations in English aren’t the only ones.</p>
          <p>The purpose of abbreviations is to make communication more efficient by using smaller words. This is most apparent in acronyms, one of the types of abbreviations we discuss below. An acronym takes the first letter (or letters) of a set of words and adds them together to create a brand-new word. In this way, an acronym replaces a long string of words with just a single one, making communication that much easier.</p>
         <h2>Types of abbreviations: What are the 5 abbreviation types?</h2>
         <p>There are a few different ways to shorten words, and not all of them can be used on every word. Before we discuss the types of abbreviations individually, here’s a quick list of them so you know what to expect. We’ll describe how each of these terms is commonly used, but you should be aware that exact definitions sometimes vary.</p>
          <ul className='listas'>
          <li> Clipping: removing entire syllables to make words shorter</li>
          <li> Contractions: removing certain letters to make words shorter, and sometimes combining two or more words, with missing letters replaced by an apostrophe</li>
          <li>Initialism: combining the first letters of multiple words, with the result pronounced as individual letters</li>
          <li> Acronyms: combining the first letters of multiple words, with the result pronounced as a new word</li>
          <li> Textese (online slang): a modern form of communication that uses individual letters, numbers, and symbols to reduce typing time</li>
          </ul>
          <p>Below we explain how each type of abbreviation works, including some common examples for each.</p>
        </article>
     <hr></hr>
     <article>
        <h2 className='titulos-post'> Clipping</h2>
        <p>Clipping refers to the removal of entire syllables from words, usually from the end. What’s left is typically one or two syllables that people can still easily recognize. Clipping is so common that often the abbreviation is much more popular than the full version of the word. It’s also frequently used with people’s names to create nicknames.</p>
         <p>Clipping does not usually require additional punctuation. In formal writing like research papers, spelling out the entire word is preferred, and clipping is avoided; this often applies to contractions as well.</p>
         <h3>Clipping abbreviation examples</h3>
          <ul className='listas'>
          <li>ad (advertisement)</li>
          <li>exam (examination)</li>
          <li>app (application)</li>
          <li>rhino (rhinoceros)</li>
          <li>flu (influenza)</li>
          <li>Liz or Beth (Elizabeth)</li>
          </ul>
          
        </article>
     <hr></hr>
     <article>
        <h2 className='titulos-post'> 📝 Contractions</h2>
        <p>Contractions are one of the most common types of abbreviations. It involves removing individual letters, instead of entire syllables as in clipping. You might be familiar with contractions that use the apostrophe, like can’t or you’re, but these aren’t the only contractions.</p>
         <p>A lot of contractions use punctuation to show that a word has been shortened, usually a period or apostrophe. Formal titles often use a period to form a contraction, such as Dr. for doctor, and months often do the same, like Jan. for January (which also incorporates clipping).</p>
         <p>Contractions are also normal when writing addresses, like St. for Street or Apt. for Apartment. Typically abbreviations are used for proper names in addresses, whereas they are not used to replace words used generically. For example, it’s incorrect to write, “What st. do you live on?”</p>
         <p>Not all contractions use punctuation, however. For example, cm for centimeter does not use any punctuation, while in stands for inches. The punctuation used with a unit of measurement is related to the style being followed, so always double-check the proper way to write a contraction if you are uncertain.</p>
         <p>It’s also worth noting that some contractions use letters that aren’t even in the original word. For example, the contraction lbs. for the unit of mass pounds uses letters from the outdated Latin word libra.</p>
         <h3>Contraction abbreviation examples</h3>
          <ul className='listas'>
          <li>can’t (cannot) 😕</li>
          <li>could’ve (could have) 😊</li>
          <li>it’s (it is or it has) 😉</li>
          <li>I’ll (I will) 😎</li>
          <li>Mr. and Mrs. (Mister and Missus) 😍</li>
          <li>Dr. (doctor) 🩺</li>
          <li>Jan. (January) ❄️</li>
          <li>Ave. (Avenue) 🛣️</li>
          <li>Apt. (Apartment) 🏢</li>
          <li>pt (pint) 🍻</li>
          <li>in (inch) 📏</li>
          <li>lbs (pounds) ⚖️</li>
          <li>ft (foot or feet) 👣</li>
          </ul>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'>🔠 Initialisms</h2>
        <p>An initialism is an abbreviation that uses the first letter of each word to represent the whole phrase. They are commonly used for people and organizations' names as a way to shorten long titles, especially in writing. For instance, J. R. R. Tolkien is the more popular name for the author of The Lord of the Rings.</p>
        <p>When pronouncing initialisms, say the name of each letter. This is the main difference between initialisms and acronyms, where acronyms are pronounced like words.</p>
        <p>Periods may or may not be used with initialisms. Traditionally, periods were used to indicate an abbreviation, such as U.S.A., but modern writing tends to omit them for the sake of brevity, as in USA.</p>
        <p>If you use initials to abbreviate a person's full name, do not use periods. For example, use MLK instead of M.L.K. when referring to Martin Luther King.</p>
        <h3>Initialism abbreviation examples</h3>
        <ul className='listas'>
            <li>FBI (Federal Bureau of Investigation) 👮</li>
            <li>UFO (Unidentified Flying Object) 🛸</li>
            <li>CEO (Chief Executive Officer) 👨‍💼</li>
            <li>CCTV (Closed Circuit TeleVision) 📹</li>
            <li>FDR (Franklin Delano Roosevelt) 🇺🇸</li>
            <li>MBA (Master of Business Administration) 💼</li>
            <li>FAQ (Frequently Asked Questions) ❓</li>
        </ul>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'> 🔤 Acronyms</h2>
        <p>Acronyms are abbreviations that are formed by combining the first letters of multiple words, but unlike initialisms, they are pronounced as a single word. Some acronyms are so commonly used that we might forget what the words behind them originally stood for, like laser, which stands for Light Amplification by Stimulated Emission of Radiation.</p>
         <p>Acronyms can be either capitalized or lowercase, and it’s important to use the correct form based on the word. If you’re not sure which form to use, consult a dictionary to double-check.</p>
         <h3>Acronym abbreviation examples</h3>
          <ul className='listas'>
          <li>PIN (Personal Identification Number) 🔑</li>
          <li>NASA (National Aeronautics and Space Administration) 🚀</li>
          <li>RAM (Random Access Memory) 💻</li>
          <li>scuba (Self-Contained Underwater Breathing Apparatus) 🤿</li>
          <li>radar (RAdio Detection And Ranging) 📡</li>
          <li>zip code (Zone Improvement Plan code) 📮</li>
          </ul>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'> 💬 Textese (online slang)</h2>
        <p>Textese, also known as online slang, is a type of abbreviation created to speed up typing time on computers and mobile phones. The concept is to use minimal characters to represent words, such as typing U instead of you, so messages can be sent faster.</p>
        <p>Textese covers any typed communication, from phone texting to email acronyms. It draws on other types of abbreviations, including initialism (irl for in real life), contractions (bc for because), and new words created by combining letters and numbers based on sounds (gr8 for great).</p>
        <p>As a type of slang, there are no real grammar or formality rules. The more you use it, the quicker you'll learn it.</p>
        <h3>Textese abbreviation examples</h3>
        <ul className='listas'>
          <li>lol (laugh out loud) 😂</li>
          <li>btw (by the way) 🤫</li>
          <li>imo (in my opinion) 🤔</li>
          <li>idk (I don’t know) 🤷‍♀️</li>
          <li>wat (what) 🤨</li>
          <li>bc (because) 🤷‍♂️</li>
          <li>wknd (weekend) 🎉</li>
        </ul>
</article>
<hr></hr>
<article>
        <h2 className='titulos-post'>🔍 What are the top 10 abbreviations in English?</h2>
        <p>Abbreviations are a common way to shorten words or phrases for faster and easier communication. Here are ten of the most common abbreviations in English:</p>
         <ol className='listas'>
          <li>don’t (do not) 🚫</li>
          <li>can’t (cannot) 🚫</li>
          <li>won’t (will not) 🚫</li>
          <li>he/she/it’s (he/she/it is or has) 👨‍👩‍👧</li>
          <li>I’m, you/we/they’re (I am, you/we/they are) 🙋‍♀️</li>
          <li>I/you/we/they’ve (I/you/we/they have) 🤝</li>
          <li>Mr. (Mister) 🧑</li>
          <li>PM (post meridiem) 🌃</li>
          <li>AM (ante meridiem) 🌅</li>
          <li>ok (okay) 👌</li>
          </ol>
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

export default Abbreviations
