import React from 'react'
import {Link} from 'gatsby'
import { useState } from 'react'
import '../styles/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false);
  return (
   
        <nav className='navbar'>
            <h1>Mancha Pam</h1>
            <div className="links">
                <ul className={isMobile? "nav-links-mobile": "nav-links"} onClick={() => setIsMobile(false)}>
                    <Link to='/' className='the-links'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about' className='the-links'>
                        <li>About</li>
                    </Link>
                    <Link to='/projects' className='the-links'>
                        <li>Portfolio Projects</li>
                    </Link>
                    <Link to='/challenges' className='the-links'>
                        <li>Challenges</li>
                    </Link>
                </ul>
                <button className='mobile-menu-icon' onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? (
                 <FontAwesomeIcon icon={faTimes} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} />
                    )}
                </button>
            </div>
        </nav>

   
  )
}

export default Navbar

// https://www.youtube.com/watch?v=P3W7MZ3JkyA