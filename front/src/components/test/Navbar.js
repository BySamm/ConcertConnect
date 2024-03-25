import React from 'react';
import { Link } from 'react-scroll'; // Use this for smooth scrolling to page sections

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ConcertCo</div>
      <div className="navbar-links">
        <Link to="intro" smooth={true} duration={500}>Home</Link>
        <Link to="features" smooth={true} duration={500}>Features</Link>
        <Link to="about" smooth={true} duration={500}>About</Link>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.078 1.078 0 0 0-.115-.1zM13 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
      </div>
    </nav>
  );
};

export default Navbar;

