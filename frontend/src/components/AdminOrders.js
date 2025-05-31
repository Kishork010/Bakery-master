import React, { useEffect, useState } from 'react';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetch(`https://your-backend.onrender.com/${showHistory ? 'order-history' : 'orders'}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, [showHistory]);

  const handleStatusUpdate = async (order, status) => {
    if (!order) return;

    if (status === 'Delivered') {
      const res = await fetch('https://your-backend.onrender.com/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, status }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Order marked as Delivered');
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
      } else {
        alert('Failed to update status');
      }
    } else if (status === 'Delivery Out') {
      alert('Marked as Delivery Out (no DB update needed)');
    } else if (status === 'Cancelled') {
      const remark = prompt('Enter a remark for cancellation:');
      if (!remark) return;

      const res = await fetch('https://your-backend.onrender.com/cancel-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, remark }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Order Cancelled');
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
      } else {
        alert('Failed to cancel order');
      }
    }
  };

const renderItems = (order) => {
  if (Array.isArray(order.items)) {
    return order.items.map((item, i) => (
      <div key={i}>{item.name} × {item.quantity || item.qty}</div>
    ));
  } else if (typeof order.items === 'string') {
    return <div>{order.items}</div>; // plain string from DB (like in history)
  } else if (order.customer?.cart && Array.isArray(order.customer.cart)) {
    return order.customer.cart.map((item, i) => (
      <div key={i}>{item.name} × {item.quantity || item.qty}</div>
    ));
  } else {
    return <div>No items found</div>;
  }
};


  const formatAddress = (customer) => {
    return [
      customer?.flat,
      customer?.area,
      customer?.landmark,
      customer?.pincode,
      customer?.city,
      customer?.taluka,
      customer?.dist,
      customer?.state
    ].filter(Boolean).join(', ');
  };

  return (
    <div className="admin-orders-container">
      <h2>{showHistory ? 'Order History' : 'All Orders'}</h2>
      <button onClick={() => setShowHistory(!showHistory)} className="history-btn">
        {showHistory ? 'Back to Orders' : 'Show History'}
      </button>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount (₹)</th>
            <th>Customer</th>
            <th>Address</th>
            <th>Items</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order.id}</td>
              <td>{Number(order.amount).toFixed(2)}</td>
              <td>
                {order.name || order.customer?.name}<br />
                {order.email || order.customer?.email}<br />
                {order.mobile || order.customer?.mobile}
              </td>
              <td>{order.address || formatAddress(order.customer)}</td>
              <td>{renderItems(order)}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>
                {!showHistory ? (
                  <>
                    <button onClick={() => handleStatusUpdate(order, 'Delivery Out')}>Delivery Out</button>
                    <button onClick={() => handleStatusUpdate(order, 'Delivered')}>Delivered</button>
                    <button onClick={() => handleStatusUpdate(order, 'Cancelled')}>Cancel</button>
                  </>
                ) : (
                  <strong>
                    {order.status}
                    {order.remark ? ` (Remark: ${order.remark})` : ''}
                  </strong>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrders;
