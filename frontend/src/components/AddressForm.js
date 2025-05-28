import React, { useState } from 'react';
import './AddressForm.css';
import { getCartTotal } from './Cart'; // Assuming you have a function to get the cart total
import { useNavigate } from 'react-router-dom';

function AddressForm() {
  const navigate = useNavigate();
  const totalAmount = parseFloat(localStorage.getItem('cartTotal')) || 0;
  const gst = totalAmount * 0.18;
  const delivery = 50;
  const grandTotal = totalAmount + gst + delivery;

  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '',
    flat: '', area: '', landmark: '', pincode: '',
    city: '', taluka: '', dist: '', state: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handlePayment = async () => {
  const response = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: grandTotal })
  });

  const order = await response.json();

  const options = {
    key: "YOUR_KEY_ID", // Replace with your Razorpay Key ID
    amount: order.amount,
    currency: "INR",
    name: "My Store",
    description: "Order Payment",
    order_id: order.id,
    handler: function (response) {
      alert("Payment successful!");
      console.log(response);
      navigate("/success");
    },
    prefill: {
      name: formData.name,
      email: formData.email,
      contact: formData.mobile
    },
    theme: {
      color: "#3399cc"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div className="address-container">
        
      {/* Back Arrow */}
      <button
        onClick={() => navigate('/cart')}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          position: 'absolute',
          top: '20px',
          left: '20px'
        }}
        aria-label="Back to cart"
      >
        ⬅
      </button>


      <h2>Delivery Address</h2>
      <form className="address-form">
        <label>Full Name</label>
        <input name="name" placeholder="Full Name" onChange={handleChange} />
        <label>Contact Number</label>
        <input name="mobile" placeholder="Mobile No" onChange={handleChange} />
        <label>Email ID</label>
        <input name="email" placeholder="Gmail ID" onChange={handleChange} />
        <label>Flat, House No., Building, Company, Apartment</label>
        <input name="flat" placeholder="Flat, House No., Building, Company, Apartment" onChange={handleChange} />
        <label>Area, Street, Sector, Village</label>
        <input name="area" placeholder="Area, Street, Sector, Village" onChange={handleChange} />
        <label>Landmark</label>
        <input name="landmark" placeholder="Landmark" onChange={handleChange} />
        <label>Pincode</label>
        <input name="pincode" placeholder="Pincode (6 digit)" maxLength="6" onChange={handleChange} />
        <label>Village/Town/City</label>
        <input name="city" placeholder="Village/Town/City" onChange={handleChange} />
        <label>Taluka</label>
        <input name="taluka" placeholder="Taluka" onChange={handleChange} />
        <label>District</label>
        <input name="dist" placeholder="District" onChange={handleChange} />
        <label>State</label>
        <input name="state" placeholder="State" onChange={handleChange} />
        
       <label
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
    fontSize: '16px',
    cursor: 'pointer'
  }}
>
  <input
    type="checkbox"
    onChange={() => setShowPayment(!showPayment)}
    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
  />
  <span>Proceed to Payment</span>
</label>



      </form>

   {showPayment && (
  <div className="payment-section">
    <h3>Payment Summary</h3>
    <table className="payment-table">
      <tbody>
        <tr>
          <td>Total:</td>
          <td>₹{totalAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td>GST (18%):</td>
          <td>₹{gst.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Delivery:</td>
          <td>₹{delivery.toFixed(2)}</td>
        </tr>
        <tr className="total-row">
          <td><strong>Grand Total:</strong></td>
          <td><strong>₹{grandTotal.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>

    <button onClick={handlePayment} className="razorpay-button">
      Pay ₹{grandTotal.toFixed(2)} Securely
    </button>
  </div>
)}
    </div>
  );
}

export default AddressForm;
