import React from 'react'
import Descargables from './Descargables'
import Footer from './Footer'
import Hero from './Hero'
import {data} from "../utils/data.js"

const SuffixinEnglish01 = () => {
    const heroData = data[22]; // selecciona el primer objeto de datos, por ejemplo

  return (
    <>
    <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />

<div className='container-fluid'>
<div className='row gap-3 mx-3'>
<div className='col-lg-7'>
<img
src="https://grammarist.com/wp-content/uploads/Grammarist-Article-Graphic-V5-14-1024x478.png"
alt="Imagen relacionada con el trabajo"
style={{ width: "100%", height: "auto" }}
/>
<h2 className='titulos-post'>The -Aholic and -Oholic Suffixes</h2>
<p>
When it comes -aholic, -oholic, and -holic meanings, just remember that the actual suffix is -holic, and -aholic or -oholic are used phonetically. But I’ve broken down all the details on using these three suffixes to create new words right here in this guide.</p>
<p>
First of all, I should explain that suffixes are words or letters that we add to the end of other words to make them mean something else, like aholic and oholic. We’d add these suffixes to the end of words like alcohol, book, food, etc. In all honesty, you can add holic to the end of just about any word and people will understand that you’re talking about an addiction, whether seriously or in a joking manner.</p>     
<hr></hr>

<article>
<span className='titulos-post'>What Is an Example of the Suffix Aholic?</span>

<p>👉 Being an author and massive book nerd, the first one that pops into my mind is “bookaholic,” and I proudly accept the title. I’m not just addicted to reading; I’m addicted to buying, collecting, and even making books.</p>

<span className='titulos-post'>What Are the Types of Holics?</span>

<p>There are many different -holic suffix words, but here are some of the most common.</p>
<ul>
<li>Bookaholic: I had to start with this one because it’s a term I use all the time! A lover of books in any shape or form; reading, writing, collecting, special editions, etc. I think about books at least 80% of making hours.</li>
<li>Alcoholic: Probably the most common use of the suffix is when paired with the word alcohol. This is someone who has a substance abuse problem and drinks too much.</li>
<li>Foodaholic: This one goes without saying, but it refers to anyone who either loves to eat food or is passionate about food in general.</li>
<li>Blogaholic: Not as popular as other addictions, but I’ve known people who were addicted to their blog, whether it’s monitoring it, adding to it, etc.</li>
<li>Workaholic: I think a lot of us are guilty of this one these days. The term refers to someone who is addicted to working, whether physically or mentally. I know, as a content creator and author, my phone and laptop are always an arm’s reach away.
</li>
</ul>

</article>
<hr></hr>

<article>
<span className='titulos-post'>Where Does the Suffix Aholic Come From?</span>

<p>The word alcoholic was coined at the end of the 1700s by adding the suffix -ic to the stem word alcohol. The suffix -ic means having the nature of.</p>
<p>During the twentieth century, the suffixes -aholic, -oholic and -holic were coined, patterned on the ending of the word alcoholic, to indicate items to which people had become dependent or had an abnormal desire.</p>
<p>In the 1960s, especially, the system of word formation became popular with the words sugarholic, foodaholic, and workaholic. In the 1970s, the words chocoholic and golfaholic were coined, and in the 1980s, the word shopaholic.</p>
</article>
<article>
<span className='titulos-post'>How Do You Use Aholic Words in a Sentence?</span>
<img
src="https://grammarist.com/wp-content/uploads/Grammarist-Article-Graphic-V5-15-1024x478.png"
alt="Imagen relacionada con el trabajo"
style={{ width: "100%", height: "auto" }}
/>
<p>Holic, oholic, and aholic examples surrounded by the context of sentences can help us better understand how to use the suffix.</p>
<ul>
<li>My father was an alcoholic all throughout my childhood and never got help for the disease until I was an adult</li>
<li>I’m a total bookaholic; I collect different versions of the same book if it’s one of my favorites.</li>
<li>I know I’m a workaholic; my husband tells me every single day. But I just love what I do!</li>
<li>She’s a chocoholic, through and through, and should limit her chocolate consumption if she wants to avoid diabetes.</li>
</ul>
</article>

<article>
<span className='titulos-post'>Are You a Holic of Any Kind?</span>

<p>Remember, you can add the suffix holic to the end of just about any word to turn it into an addiction. Some are official words found in the dictionary, while others are somewhat made-up but are still widely accepted and understood by most people.</p>

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

export default SuffixinEnglish01
