const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const crypto = require("crypto");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const instance = new Razorpay({
  key_id: 'rzp_test_9QPT4JCe3g2LJn',
  key_secret: 'cKt4cNXeHPFgIzjL03CkrrUl',
});

// SQLite DB setup
const db = new sqlite3.Database('./orders.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    name TEXT, email TEXT, mobile TEXT, address TEXT,
    amount REAL, date TEXT, status TEXT, remark TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS order_items (
    order_id TEXT,
    name TEXT,
    price REAL,
    quantity INTEGER,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  )`);
});

app.post('/create-order', async (req, res) => {
  const { amount, customer } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    const razorOrder = await instance.orders.create(options);

    const order = {
      id: razorOrder.id,
      amount,
      customer,
      date: new Date().toISOString(),
    };

    const filePath = path.join(__dirname, 'orders.json');
    let orders = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];

    orders.push(order);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    res.json(razorOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

app.post('/complete-order', (req, res) => {
  const { order, status, remark = '' } = req.body;
  const fullAddress = `${order.customer.flat}, ${order.customer.area}, ${order.customer.landmark}, ${order.customer.city}, ${order.customer.taluka}, ${order.customer.dist}, ${order.customer.state} - ${order.customer.pincode}`;

  db.serialize(() => {
    db.run(`INSERT INTO orders (id, name, email, mobile, address, amount, date, status, remark)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [order.id, order.customer.name, order.customer.email, order.customer.mobile, fullAddress, order.amount, order.date, status, remark]);

    const stmt = db.prepare(`INSERT INTO order_items (order_id, name, price, quantity) VALUES (?, ?, ?, ?)`);
    (order.customer.cart || []).forEach(item => {
      stmt.run(order.id, item.name, parseFloat(item.price), item.qty || item.quantity || 1);
    });
    stmt.finalize();

    // Remove from JSON
    const filePath = path.join(__dirname, 'orders.json');
    let orders = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
    orders = orders.filter(o => o.id !== order.id);
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));

    res.json({ success: true });
  });
});

app.get('/orders', (req, res) => {
  const filePath = path.join(__dirname, 'orders.json');
  if (fs.existsSync(filePath)) {
    const orders = JSON.parse(fs.readFileSync(filePath));
    res.json(orders);
  } else {
    res.json([]);
  }
});

app.get('/order-history', (req, res) => {
  db.all(`SELECT * FROM orders ORDER BY date DESC`, [], (err, orders) => {
    if (err) return res.status(500).json({ error: err.message });

    const orderIds = orders.map(o => o.id);
    if (!orderIds.length) return res.json([]);

    const placeholders = orderIds.map(() => '?').join(',');
    db.all(`SELECT * FROM order_items WHERE order_id IN (${placeholders})`, orderIds, (err2, items) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const orderMap = {};
      orders.forEach(order => {
        orderMap[order.id] = { ...order, items: [] };
      });

      items.forEach(item => {
        if (orderMap[item.order_id]) {
          orderMap[item.order_id].items.push(item);
        }
      });

      res.json(Object.values(orderMap));
    });
  });
});

app.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", instance.key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
