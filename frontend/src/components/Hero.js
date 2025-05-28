import React, { useEffect, useState } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

import cake1 from '../assets/images/cake.1.jpg';
import cake2 from '../assets/images/cake.2.jpg';
import cake3 from '../assets/images/cake.3.jpg';

const images = [cake1, cake2, cake3];

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container" data-aos="fade-up">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`cake ${index}`}
          className={`hero-bg ${index === currentImageIndex ? 'active' : ''}`}
        />
      ))}

      <div className="overlay">
        <div className="hero-text">
          <h1>Welcome to Shah Sweets & Bakers (Pure Veg)</h1>
          <p>Freshly baked happiness, traditional sweets, and 100% pure vegetarian delights.</p>
          <p>Taste the love in every bite – from handcrafted mithai to oven-fresh pastries!</p>
          <p>Like a layer cake, life has its ups and downs. But whether you frost it up or top it with joy is up to you.</p>
          <Link to="/menu" className="shop-button">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
