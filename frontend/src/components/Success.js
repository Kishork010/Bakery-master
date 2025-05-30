import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

function Success() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length > 0) {
      setOrder(orders[orders.length - 1]); // Get latest order
    }
  }, []);

  return (
    <div className="success-container">
      <div id="printable">
        <h2>🎉 Order Confirmed!</h2>
        <p>Thank you for your purchase.</p>

        {order ? (
          <div className="receipt-box">
            <h3>Order Receipt</h3>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Name:</strong> {order.customer?.name}</p>
            <p><strong>Email:</strong> {order.customer?.email}</p>
            <p><strong>Mobile:</strong> {order.customer?.mobile}</p>
            <hr />
            <p><strong>Amount Paid:</strong> ₹{(order.amount / 100).toFixed(2)}</p>

          </div>
        ) : (
          <p>No order found. Please go back and place an order.</p>
        )}
      </div>

      <button className="back-to-menu" onClick={() => navigate('/menu')}>
        ⬅ Back to Menu
      </button>

      {order && (
        <button className="print-receipt" onClick={() => window.print()}>
          🖨️ Print / Save as PDF
        </button>
      )}
    </div>
  );
}

export default Success;
