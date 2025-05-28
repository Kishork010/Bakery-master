import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cakeType: '',
    cakeFlavor: '',
    cakeQuantity: '',
    message: '',
    confirmed: false
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.confirmed) {
      alert("Please confirm your booking before submitting.");
      return;
    }

    try {
      const response = await fetch(
        'YOUR_GOOGLE_SCRIPT_WEB_APP_URL', // Replace with your actual Web App URL
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.ok) {
        alert("Booking submitted successfully!");
        setFormData({
          name: '',
          phone: '',
          email: '',
          cakeType: '',
          cakeFlavor: '',
          cakeQuantity: '',
          message: '',
          confirmed: false
        });
      } else {
        alert("Error submitting booking.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    }
  };

  return (
    <div className="booking-form" data-aos="fade-up">
      <h2>🎂 Book Your Cake</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" required onChange={handleChange} value={formData.name} />

        <label>Phone:</label>
        <input type="tel" name="phone" required onChange={handleChange} value={formData.phone} />

        <label>Email:</label>
        <input type="email" name="email" required onChange={handleChange} value={formData.email} />

        <label>Cake Type:</label>
        <select name="cakeType" required onChange={handleChange} value={formData.cakeType}>
          <option value="">-- Select --</option>
          <option value="Birthday Cake">Birthday Cake</option>
          <option value="Wedding Cake">Wedding Cake</option>
          <option value="Custom Cake">Custom Cake</option>
        </select>

        <label>Cake Flavor:</label>
        <select name="cakeFlavor" required onChange={handleChange} value={formData.cakeFlavor}>
          <option value="">-- Select --</option>
          <option value="Chocolate">Chocolate</option>
          <option value="Pineapple">Pineapple</option>
          <option value="Strawberry">Strawberry</option>
          <option value="Vanilla">Vanilla</option>
          <option value="Black Forest">Black Forest</option>
          <option value="Red Velvet">Red Velvet</option>
        </select>

        <label>Cake Quantity:</label>
        <select name="cakeQuantity" required onChange={handleChange} value={formData.cakeQuantity}>
          <option value="">-- Select --</option>
          <option value="250g">250g</option>
          <option value="0.5kg">0.5 kg</option>
          <option value="1kg">1 kg</option>
          <option value="1.5kg">1.5 kg</option>
          <option value="2kg">2 kg</option>
          <option value="2.5kg">2.5 kg</option>
          <option value="3kg">3 kg</option>
        </select>

        <label>Message / Notes:</label>
        <textarea name="message" rows="3" onChange={handleChange} value={formData.message} />
        
        <div className="checkbox-group">
        <input
            type="checkbox"
            id="confirmed"
            name="confirmed"
            checked={formData.confirmed}
            onChange={handleChange}
        />
        <label htmlFor="confirmed">Booking Confirm</label>
        </div>


        <div className="button-group">
          <button onClick={handlePreview}>Preview</button>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>📋 Booking Preview</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Cake Type:</strong> {formData.cakeType}</p>
            <p><strong>Flavor:</strong> {formData.cakeFlavor}</p>
            <p><strong>Quantity:</strong> {formData.cakeQuantity}</p>
            <p><strong>Message:</strong> {formData.message}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
