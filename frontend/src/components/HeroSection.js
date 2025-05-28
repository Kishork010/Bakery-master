import React from 'react';
import cakeImage from '../assets/images/cake.4.jpg'; // Adjust path as needed
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className="hero-section" data-aos="fade-up">
      <div className="hero-image">
        <img src={cakeImage} alt="Chocolate cake" />
      </div>
      <div className="hero-content">
        <h1>Shah Sweets and Bakery Delights, Freshly Made Every Day in the Heart of Your City</h1>
        <Link to="/menu" className="shop-button">Menu</Link>
      </div>
    </div>
  );
}

export default HeroSection;
