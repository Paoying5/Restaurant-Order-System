const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 1. Lấy danh sách món ăn (Menu)
// Route kiểm tra máy chủ đã hoạt động chưa
app.get('/', (req, res) => {
  res.send(' Backend Đặt Món Ăn Nhà Hàng đang chạy thành công!');
});
app.get('/api/products', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products WHERE is_available = true ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải menu' });
  }
});

// 2. Khách đặt món
app.post('/api/orders', async (req, res) => {
  const { tableNumber, items } = req.body;
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const orderRes = await client.query(
      'INSERT INTO orders (table_number, total_amount) VALUES ($1, $2) RETURNING *',
      [tableNumber, totalAmount]
    );
    const newOrder = orderRes.rows[0];

    for (let item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [newOrder.id, item.productId, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    // Bắn tín hiệu Realtime đến màn hình Admin
    io.emit('new_order', {
      orderId: newOrder.id,
      tableNumber,
      totalAmount,
      items,
      createdAt: newOrder.created_at
    });

    res.status(201).json({ success: true, orderId: newOrder.id });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Lỗi tạo đơn hàng' });
  } finally {
    client.release();
  }
});

// 3. Lấy báo cáo thống kê theo tháng
app.get('/api/reports/monthly', async (req, res) => {
  const { year, month } = req.query;

  const queryText = `
    SELECT 
      p.id AS product_id,
      p.name AS product_name,
      SUM(oi.quantity) AS total_quantity_sold,
      SUM(oi.quantity * oi.price) AS total_revenue
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    JOIN products p ON oi.product_id = p.id
    WHERE 
      EXTRACT(YEAR FROM o.created_at) = $1 
      AND EXTRACT(MONTH FROM o.created_at) = $2
    GROUP BY p.id, p.name
    ORDER BY total_quantity_sold DESC;
  `;

  try {
    const reportRes = await db.query(queryText, [year, month]);
    res.json(reportRes.rows);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xuất báo cáo' });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server Backend chạy tại: http://localhost:${PORT}`);
});
// thêm health endpoint
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');

    res.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
    });
  }
});
