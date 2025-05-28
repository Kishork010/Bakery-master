// backend/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // amount in paisa
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
