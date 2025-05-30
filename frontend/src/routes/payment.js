// backend/routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

const instance = new Razorpay({
  key_id: 'rzp_test_9QPT4JCe3g2LJn',
  key_secret: 'cKt4cNXeHPFgIzjL03CkrrUl',
});

// Create order endpoint
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: Math.round(amount * 100),
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

// Verify payment endpoint
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", instance.key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;
