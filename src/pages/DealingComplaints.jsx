import React from 'react'
import {data} from "../utils/data.js"
import Hero from './Hero.jsx';
import Descargables from './Descargables.jsx';
import Footer from './Footer.jsx';
import "../css/Global.css"

const DealingComplaints = () => {
    const heroData = data[13];
  return (
   <>
          <Hero title={heroData.title} description={heroData.description} thumbnail={heroData.thumbnail} />
          <div className='container-fluid'>
  <div className='row gap-3 mx-3'>
    <div className='col-lg-7'>
      
      <p>
      It's also important for customer service reps to gather information to help resolve the problem. The following short dialog provides some helpful phrases to deal with complaints:     
     </p>	
    <hr></hr>
    <article>
    <p><span class="person1">👤 Customer:</span> Good morning. I purchased a computer from your company last month. Unfortunately, I'm not satisfied with my new computer. I'm having a lot of problems.</p>
<p><span class="person2">👥 Customer Care Representative:</span> What seems to be the problem?</p>
<p><span class="person1">👤 Customer:</span> I'm having problems with my Internet connection, as well as repeated crashes when I try to run my word-processing software.</p>
<p><span class="person2">👥 Customer Care Representative:</span> Did you read the instructions that came with the computer?</p>
<p><span class="person1">👤 Customer:</span> Well, yes. But the troubleshooting section was no help.</p>
<p><span class="person2">👥 Customer Care Representative:</span> What happened exactly?</p>
<p><span class="person1">👤 Customer:</span> Well, the Internet connection doesn't work. I think the modem is broken. I'd like a replacement.</p>
<p><span class="person2">👥 Customer Care Representative:</span> How were you using the computer when you tried to connect to the Internet?</p>
<p><span class="person1">👤 Customer:</span> I was trying to connect to the Internet! What kind of question is that?! 😠</p>
<p><span class="person2">👥 Customer Care Representative:</span> I understand you're upset, sir. I'm just trying to understand the problem. I'm afraid it's not our policy to replace computers because of glitches.</p>
<p><span class="person1">👤 Customer:</span> I bought this computer with the software pre-loaded. I haven't touched anything.</p>
<p><span class="person2">👥 Customer Care Representative:</span> We’re sorry that you’ve had a problem with this computer. Could you bring in your computer? I promise you we'll check the settings and get back to you immediately.</p>
<p><span class="person1">👤 Customer:</span> OK, that will work for me.</p>
<p><span class="person2">👥 Customer Care Representative:</span> Is there anything else I need to know about this that I haven’t thought to ask?</p>
<p><span class="person1">👤 Customer:</span> No, I'd just like to be able to use my computer to connect to the Internet.</p>
<p><span class="person2">👥 Customer Care Representative:</span> We'll do our best to get your computer working as soon as possible. 😊</p>

</article>

<article>
<span className='titulos-post'>Key Vocabulary</span>
<ul className='listas'>
  <li><strong>Customer service representatives (reps):</strong> Individuals who provide assistance and support to customers.</li>
  <li><strong>Gather information:</strong> Collecting details from the customer about their issue or concern in order to better understand how to assist them.<p> Example: "May I ask you some questions to help me better understand the problem?"</p></li>
  <li><strong>Resolve the problem:</strong> Finding a solution to the customer's issue and implementing it.<p>  Example: "I think I know how to fix this problem. Please give me a moment."</p></li>
  <li><strong>Deal with complaints:</strong> Handling negative feedback or dissatisfaction from a customer in a professional and courteous manner. <p> Example: "I'm sorry to hear that you're unhappy with our service. I'll do my best to make it right."</p></li>
  <li><strong>Not our policy:</strong> A statement that indicates a certain action is not within the company's guidelines or procedures.<p>  Example: "I'm sorry, but it's not our policy to offer refunds for items that have been used."</p></li>
  <li><strong>Troubleshoot:</strong> Identifying and resolving issues or problems with a product or service.<p>  Example: "Let's try troubleshooting your internet connection to see if we can resolve the issue."</p></li>
  <li><strong>Glitch:</strong> A sudden and usually temporary malfunction or error in a system or device.<p>  Example: "It seems that there's a glitch in the software that's causing the program to crash."</p></li>
</ul>
</article>
<article>
<span className='titulos-post'>Key Phrases</span>
<ul class="listas">
  <li>🤔 What seems to be the problem?</li>
  <li>😕 What happened exactly?</li>
  <li>🙅‍♀️ I'm afraid it's not our policy to...</li>
  <li>🤞 I promise you I'll...</li>
  <li>📖 Did you read the instructions that came with the...?</li>
  <li>🤔 How were you using the...?</li>
  <li>😔 I understand you're upset, sir.</li>
  <li>🤝 I'm just trying to understand the problem.</li>
  <li>😞 We're sorry that you've had a problem with this product.</li>
  <li>🤔 Is there anything else I need to know about this that I haven't thought to ask?</li>
</ul>
</article>
<article>
  <iframe title="Dealing"  style={{maxWidth: '100%'}} src="https://wordwall.net/embed/play/42737/753/371" width="600" height="380" frameBorder="0" allowFullScreen />
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

export default DealingComplaints
