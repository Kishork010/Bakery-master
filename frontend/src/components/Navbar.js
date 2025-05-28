import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="nav-bar" data-aos="fade-up">
      <div className="logo">Shah Bakers</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
