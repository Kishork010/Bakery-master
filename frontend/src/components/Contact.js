import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHover(value);
  };

  const handleStarLeave = () => {
    setHover(0);
  };

  return (
    <section className="contact-section" data-aos="fade-up">
      <h2>Contact Us</h2>
      <form className="contact-form">
        <div className="form-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="form-row">
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone" required />
        </div>
        <textarea placeholder="Your Message" required></textarea>

        <div className="form-row star-rating">
          <div className="stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= (hover || rating) ? 'filled' : ''}`}
                onClick={() => handleStarClick(value)}
                onMouseEnter={() => handleStarHover(value)}
                onMouseLeave={handleStarLeave}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default Contact;
