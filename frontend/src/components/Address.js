import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Address() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', mobile: '',
    flat: '', area: '', landmark: '',
    city: '', taluka: '', dist: '', state: '', pincode: ''
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const cartTotal = parseFloat(localStorage.getItem("cartTotal"));

    const address = { ...form };
    const razorpay_order_id = `order_${Date.now()}`; // Simulate order ID or fetch from Razorpay
    const order = {
      id: razorpay_order_id,
      amount: cartTotal,
      date: new Date().toISOString(),
      customer: { ...address, cart }
    };

    const response = await fetch("http://localhost:5000/complete-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, status: "Delivered", remark: "" }),
    });

    if (response.ok) {
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");
      alert("Order placed successfully!");
      navigate("/");
    } else {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="address-container">
      <h2>Enter Your Address</h2>
      {[
        "name", "email", "mobile", "flat", "area", "landmark",
        "city", "taluka", "dist", "state", "pincode"
      ].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.toUpperCase()}
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Address;
