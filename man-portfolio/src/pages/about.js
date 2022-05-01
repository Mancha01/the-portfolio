import React from 'react'
import Layout from '../components/layout';
import { FaGithub, FaLinkedinIn, FaTwitterSquare, FaMailBulk} from 'react-icons/fa';
import '../styles/global.css'


const About = () => {
  return (
      <Layout>
    <div className='about'>
    <p>
            <hr />
            My name is Emmanuel Pam Mancha and I am a FrontEnd Developer. I specialize in creating user interfaces that are 
representative of a product idea/vision.

<br />
<br />

I graduated from the University of Jos in 2019 with a Bachelor's Degree in Computer Science. While in school, I 
earned the COMPUTER PROFESSIONALS CERTIFICATION, duly registered by the COMPUTER PROFESSIONALS REGISTRATION 
COUNCIL OF NIGERIA. I've designed, developed, and deployed the quintessential high-value, high-quality user 
interfaces which lead to highly engaging and incredibly performant products.

<br />
<br />

I am wholly and exhaustively committed to the end-user. I am passionate about creating simple, seamless, and effective 
online experiences that accentuate and ultimately climax the company offers. 

<br />
<br />

<hr />

<p>Tech Stack: HTML, CSS, JAVASCRIPT, SCSS, REACT, FIGMA, GATSBYJS, WEBFLOW, GIT</p>


<hr />

For more information about me, my work, and how to contact me, please consult the options below:
        </p>
    </div>

    <div>
    <a href="https://github.com/Mancha01" className='fa-icons' target='_blank'> 
        <FaGithub />
    </a>
    <a href="https://www.linkedin.com/in/emmanuel-pam-081b89ab/" className='fa-icons' target='_blank'>  
        <FaLinkedinIn />
    </a>
    <a href="https://twitter.com/EmmanuelPam9" className='fa-icons' target='_blank'> 
        <FaTwitterSquare />
    </a>

    <a href = "mailto: pamemmanuel0@gmail.com" className='fa-icons' target='_blank'> 
    <FaMailBulk />
    </a>
    
    </div>
    <hr />
    </Layout>
  )
}

export default About;