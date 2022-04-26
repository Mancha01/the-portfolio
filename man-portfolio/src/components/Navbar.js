import React from 'react'
import {Link} from 'gatsby'

const Navbar = () => {
  return (
   
        <nav>
            <h1>Mancha Pam</h1>
            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/projects'>Portfolio Projects</Link>
                <Link to='/challenges'>Challenges</Link>
            </div>
        </nav>

   
  )
}

export default Navbar