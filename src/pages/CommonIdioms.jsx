import React from 'react'
import {data} from "../utils/data.js"

import Hero from '../components/Hero/Hero.jsx';
import Descargables from './Descargables';
import Footer from './Footer';

const CommonIdioms = () => {
    const heroData = data[14];
    return (
     <>
            <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
      
            <div className='container-fluid'>
  <div className='row gap-3 mx-3'>
    <div className='col-lg-7'>
      
      <h2 className='titulos-post'>Common English Idioms</h2>
      <p>
      Learning English isn’t as easy as some might think. First, grammar muddies the waters (makes things unclear), and idiomatic expressions only add fuel to the fire (make things worse).
     </p>	
    <hr></hr>
    <article>
<h2>Fun Idioms with Examples</h2>

<ul className='listas'>
   <li><span class="titulos-post">24/7 🕑💤</span>: Twenty-four hours a day; seven days a week; all the time; constantly. My little sister irritates me 24/7!
       <p>My phone is ringing 24/7 with work calls even on weekends. 😩</p>
   </li> 
   <li><span class="titulos-post">A short fuse 🧨😡</span>: A quick temper. Jamie is known for his short fuse; just a few days ago he screamed at his coach for not letting him play.
       <p>Don't mess with Kelly, she has a short fuse and can snap at any moment. 🤯</p>
   </li> 
   <li><span class="titulos-post">A taste of your own medicine 🤢💊</span>: Bad treatment deservedly received for treating other people badly. After constantly being prank-called, Julian decided to give Juan a taste of his own medicine and ordered twenty-seven pizzas to be delivered to Juan’s house.
       <p>Mark has been talking behind my back, so I'm going to give him a taste of his own medicine and spread some rumors about him. 😈</p>
   </li> 
   <li><span class="titulos-post">Butterflies in my stomach 🦋😰</span>: To be nervous. Liam had butterflies in his stomach before he went on stage to play the violin.
       <p>I always get butterflies in my stomach before a job interview, even if I'm fully prepared. 😅</p>
   </li> 
   <li><span class="titulos-post">By the skin of your teeth🦷😬</span>: To just barely get by or make it. Lester made the dance team by the skin of his teeth; you can tell he hasn't been dancing jazz for very long. 
       <p>I passed the final exam by the skin of my teeth, even though I studied all night. 😅</p>
   </li> 
   <li><span class="titulos-post">Cat got your tongue? 🐈👅</span>: Can’t you speak? (Usually said to embarrass the other person). I just saw you kissing my boyfriend. What’s the matter? Cat got your tongue?
       <p>Why are you so quiet all of a sudden? Cat got your tongue? 😏</p>
   </li> 
   <li><span class="titulos-post">Crying wolf 🐺😢</span>: To ask for help when you don't need it. You have cried wolf so many times that no one believes you when you're really hurt. 
       <p>Don't cry wolf when you need help, people won't take you seriously. 🙄</p>
   </li> 
   <li><span class="titulos-post">Cut someone some slack✂️🙏</span>: To not judge someone too harshly. Hey. Cut me some slack. I was really busy with my frog hunting business last week and forgot to call. I'm sorry!
       <p>Please cut me some slack, I've been going through a tough time lately. 😔</p>
   </li> 
   <li><span class="titulos-post">Down for the count 💤🥊</span> Tired; giving up; unable or unwilling to participate any longer. No, you can’t take my dog for a walk—she’s down for the count after chasing cats all day.
       <p>I'm down for the count after a long day at work, I just want to relax and watch TV. 🛋️</p>
  </li>
  <li><span class="titulos-post">Draw the line 🖊️</span>: To set a limit on what is acceptable. I love helping my friends, but I have to draw the line when they start asking me to do their homework for them.
       <p>My boss asked me to work 24/7 during the busy season, but I had to draw the line and insist on at least one day off per week.</p>
   </li>
<li><span class="titulos-post">Easier said than done 💬🤔</span>: Not as easy as it appears to be. Everyone says I should just quit my job and start my own business, but it's easier said than done.
       <p>My friend told me to just ignore the negative comments online, but it's easier said than done when they are constantly attacking me.</p>
   </li>
<li><span class="titulos-post">Every cloud has a silver lining ☁️☀️</span>: You can find good in every bad situation. I didn't get the job I really wanted, but every cloud has a silver lining and I learned some valuable interview skills for next time.
       <p>Even though my flight was cancelled and I had to spend the night at the airport, every cloud has a silver lining and I made some new friends while waiting for the next flight.</p>
   </li>
<li><span class="titulos-post">Finding a needle in a haystack 🔍🧵</span>: Virtually impossible to find. Trying to find a parking spot in the city on a Saturday night is like finding a needle in a haystack.
       <p>My roommate lost her earring somewhere in our messy apartment, and trying to find it is like finding a needle in a haystack.</p>
   </li>
<li><span class="titulos-post">Fish out of water 🐟🌊</span>: To be out of place. As an introvert, attending a big party always makes me feel like a fish out of water.
       <p>When I visited a foreign country for the first time, I felt like a fish out of water because I didn't know the language or the customs.</p>
   </li>
<li><span class="titulos-post">Get something off your chest 💬❤️</span>: To talk about something that has been bothering you for a long time; to admit something you have done wrong. I finally got it off my chest and apologized to my friend for being so mean to her in middle school.
       <p>After keeping it a secret for years, I finally got it off my chest and told my parents about my struggles with anxiety.</p>
   </li>
<li><span class="titulos-post">Give it a whirl 🌀🤞</span>: To try something. I've never cooked sushi before, but I'm willing to give it a whirl and see how it turns out.
       <p>My friend recommended a new exercise class, and even though I'm not very athletic, I decided to give it a whirl.</p>
   </li>
<li><span class="titulos-post">Go down in flames 🔥💥</span>: To fail suddenly and spectacularly. The new restaurant went down in flames after receiving multiple bad reviews and health violations.
       <p>My attempt to impress my crush by singing a love song went down in flames when I forgot the lyrics halfway through.</p>
   </li>
   <li><span class="titulos-post">24/7 🕑💤</span>: Twenty-four hours a day; seven days a week; all the time; constantly. My little sister irritates me 24/7!
       <p>My phone is ringing 24/7 with work calls even on weekends. 😩</p>
   </li> 
<li><span class="titulos-post">Go the extra mile</span>: To make an extra effort. My dentist always goes the extra mile, offering free back massages at the end of a stressful tooth extraction.</li>
<li><span class="titulos-post">Hang in there</span>: Be patient. Wait it out. I know you're struggling right now in school but just hang in there. It'll get easier. I promise.</li>
<li><span class="titulos-post">In the fast lane</span>: A life filled with excitement. When Curtis turned forty, he decided he needed to live life in the fast lane, so he quit his job as a dentist and decided to tour Europe by motorcycle.</li>
<li><span class="titulos-post">In the nick of time</span>: Almost too late. You gave me that main idea help in the nick of time—my teacher just gave us a quiz on that reading skill and I passed it!</li>
<li><span class="titulos-post">Let the cat out of the bag</span>: Tell a secret. Brady’s surprise party is going to be great if you don’t let the cat out of the bag.</li>
<li><span class="titulos-post">Let the chips fall where they may</span>: To let something happen, no matter if it's good or bad. Look. I'm going to just try out for the cheerleading squad and let the chips fall where they may.</li>
<li><span class="titulos-post">Lose your marbles</span>: To go crazy; insane. Mom has really lost her marbles; she's making me practice writing the ACT Essay seven times this week!</li>
<li><span class="titulos-post">Once in a blue moon</span>: Rarely. In Florida, the temperature drops below freezing only once in a blue moon.</li>
<li><span class="titulos-post">Plain as day</span>: Obvious; clear. It’s plain as day that you’re in love with her, so just admit it.</li>
<li><span class="titulos-post">Play second fiddle</span>: To be less important. I hate playing second fiddle to my sister; she always does things better than I do!</li>
<li><span class="titulos-post">Put your foot in your mouth</span>: Saying something you shouldn’t have. Jessica really put her foot in her mouth when she asked about John’s job right after he lost it.</li>
<li><span class="titulos-post">Pull yourself together</span>: Calm down and behave normally. Pull yourself together, man! Sure, your girlfriend just dumped you and then you got hit by a car, but you can't let those things get you down.</li>
<li><span class="titulos-post">Sick and tired</span>: To be bothered or annoyed by. She is sick and tired of her dog chewing up her shoes every day.</li>
<li><span class="titulos-post">Sleep on it</span>: To think about something for a while before making a decision. Don’t tell me whether you’ll move to Texas with me or not today. Sleep on it, and get back to me tomorrow.</li>
<li><span class="titulos-post">Snug as a bug in a rug</span>: Warm and cozy; content. That baby looks as snug as a bug in a rug cuddled up next to his mother.</li>
<li><span class="titulos-post">Step up your game</span>: To start performing better. Listen, Jen. You'd better step up your game if you want to get all A's in Miss Finch's Physics class. She isn't easy!</li>
<li><span class="titulos-post">Stick your nose into something</span>: To interfere. Sharon always sticks her nose into everyone else’s business.</li>
<li><span class="titulos-post">Straight from the horse’s mouth</span>: Directly from the person involved. Listen to the news straight from the horse’s mouth; we’re all getting bonuses this week!</li>
<li><span class="titulos-post">Take it easy</span>: Relax. I know you’re not feeling well, so try to take it easy today.</li>
<li><span class="titulos-post">Tip of the iceberg</span>: The small easily visible part of a larger problem. The fact that Carrie is dating a member of the mafia is just the tip of the iceberg; she’s also smuggling contraband into the country.</li>
<li><span class="titulos-post">To not see the wood for the trees</span>: To be so involved with the details that you don’t get the most important facts. She always argues about the silliest things; it’s like she can’t see the wood for the trees.</li>
<li><span class="titulos-post">Up a creek without a paddle</span>: In an unlucky/bad situation. If you don’t have any money to pay for the repairs we just made to your car, I guess you’re up a creek without a paddle because you can’t have your car back.</li>
<li><span class="titulos-post">You rock!</span>: You are great. Dude. You rock. Thanks for offering to watch my pet iguana all week.</li>
</ul>
</article>
<article className='container '>
<div className='row'>
<div className='col-lg-12 d-flex flex-wrap'>
<iframe title="modismos" style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/34388/663/430" width="600" height="380" frameborder="0" allowfullscreen></iframe>
<iframe title="modismos" style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/20423/518/5037" width="600" height="380" frameborder="0" allowfullscreen></iframe>
<iframe title="modismos" style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/34381/387/183" width="600" height="380" frameborder="0" allowfullscreen></iframe>
<iframe title="modismos" style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/3540/699/418" width="600" height="380" frameborder="0" allowfullscreen></iframe>
<iframe title="modismos" style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/21810/467/138" width="600" height="380" frameborder="0" allowfullscreen></iframe>

</div>

</div>
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

export default CommonIdioms
