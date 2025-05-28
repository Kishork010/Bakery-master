import React from 'react';
import './MapSection.css';

function MapSection() {
  return (
    <div className="map-section" data-aos="fade-up">
      <div className="info-box">
        <h2>Shah Sweets & Bakers (Pure Veg)</h2>
        <p><strong></strong> Shahbad Cross, Kusnoor, Kalaburagi, Karnataka 585102 </p>
        <p><strong>Timing:</strong> 7:00 AM – 10:00 PM (All days)</p>
        <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐ (5 / 5)</p>
      </div>

      <div className="map-box">
        <iframe
          src="https://www.google.com/maps?q=17.313909669821463, 76.8514015555444&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Shah Sweets & Bakers Location"
        ></iframe>
        <a
          href="https://maps.app.goo.gl/wMNqoRHnPui9HcWCA"
          target="_blank"
          rel="noopener noreferrer"
          className="map-link-button"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default MapSection;
