import React from 'react';
import './Footer.css';
import { FaInstagram, FaWhatsapp, FaFacebookF } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer" data-aos="fade-up">
      <div className="footer-content">
        <h3>Shah Sweets & Bakers</h3>
        <p>Pure Veg | Freshly Baked | Traditional Taste</p>
        
        <div className="contact-info">
          <p><strong>Phone:</strong> +91 96860 24365</p>
          <p><strong>Email:</strong> shahbakers80@gmail.com</p>
        </div>

        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        </div>

        <p className="copyright">
          &copy; 2025 Shah Sweets & Bakers | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
