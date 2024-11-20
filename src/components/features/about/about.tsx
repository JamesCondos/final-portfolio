import React from 'react'
import { Headings } from '../../core/headings/headings'
import './style.css'



import './style.css'



const About = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="about-section">



      {/* 🎯 Display the section title and subtitle */}
      <Headings title="About" subtitle="Hi, I'm James." />{' '}
      {/* 📝 Edit the biography below to reflect your own journey and interests */}
      <p className="about-text">
      Hello! My name is James Condos, I have just graduated from my BSc in Mathematical Physics and my Diploma in Computer Science in 2022, and am beginning a MSc in Electrical Engineering from the University of Melbourne in 2023.

      My passion in STEM comes from my interests in Signal Theory, Machine Learning, Quantum Computing, Embedded Systems, and Physics specifically. 
      These fundemental ideas are pushing the envelope of human nature, and what is inherently contributing to a better tomorrow. <br></br><br></br>
       My experience and project work has been spread out across mutliple disciplines, and am actively trying to get more involved in interesting engineering and research projects, whilst also gaining more experience in industry.
        {/* 🔗 Update the href attribute with your Instagram link */}
        <br />
        <br />
        
      



        
    
<a href="\final-portfolio\JamesCondos_Resume_Aug_2024.pdf" download className="button">Download my Resume!</a>
        

      
       
      </p>


    
      

    </div>

    
  )
})

About.displayName = 'About'

export { About }
