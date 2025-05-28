import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/images/logo1.jpg';
import logo1 from '../assets/images/vagan.jpeg';
import { Link } from 'react-router-dom';

function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <header className={`header ${showHeader ? 'show' : 'hide'}`}>
      <div className="header-top">
        <div className="logo-bakery-name">
          <img src={logo} alt="Logo" className="logo" />
          <div className="bakery-text">
            <span className="bakery-name">Shah Sweets & Baker's</span>
            <span className="bakery-slogan">Sweet Moments, Freshly Baked</span>
          </div>
        </div>

        <div className="right-logo">
          <img src={logo1} alt="Right Logo" className="logo1" />
        </div>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

      </nav>
    </header>
  );
}

export default Header;
