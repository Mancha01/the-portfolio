import React from 'react'
import { FaGithub, FaLinkedinIn, FaTwitterSquare, FaMailBulk} from 'react-icons/fa';
import Layout from '../components/layout';
import '../styles/global.css'

const Contact = () => {
  return (
<Layout>  
     <div className='contact'>
        <h1>Contact Information</h1>
        <h3>For more information about me, my work, and how to contact me, please consult the options below:</h3>
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
    </div>
    </Layout>
 
  )
}

export default Contact