import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems = [] }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const initialItems = cartItems.map(item => ({ ...item, quantity: 1 }));
    setItems(initialItems);
  }, [cartItems]);

  const cleanPrice = (price) => parseFloat(price.toString().replace(/[^\d.]/g, '')) || 0;

  const updateQuantity = (index, newQuantity) => {
    const updated = [...items];
    updated[index].quantity = Math.max(1, parseInt(newQuantity) || 1);
    setItems(updated);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const getItemTotal = (item) => cleanPrice(item.price) * item.quantity;
  const getCartTotal = () => items.reduce((total, item) => total + getItemTotal(item), 0).toFixed(2);

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(items));
    localStorage.setItem("cartTotal", getCartTotal());
    navigate("/address");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div className="cart-item-card" key={index}>
              <strong>{item.name}</strong>
              <span>₹{cleanPrice(item.price).toFixed(2)}</span>
              <input type="number" value={item.quantity} min="1" onChange={(e) => updateQuantity(index, e.target.value)} />
              <span>= ₹{getItemTotal(item).toFixed(2)}</span>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}
            <div className="cart-total-wrapper">
              <h3>Total: ₹{getCartTotal()}</h3>
              {getCartTotal() >= 200 ? (
                <button onClick={handleCheckout}>
                  Enter Address
                </button>
              ) : (
                <>
                  <p style={{ color: 'red', marginBottom: '10px' }}>Minimum order ₹200 required.</p>
                  <button disabled>
                    Enter Address
                  </button>
                </>
              )}

                    </div>

        </>
      )}
    </div>
  );
}

export default Cart;
