CREATE DATABASE quan_an_db;

\c quan_an_db;

-- 1. Bảng Món ăn
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE
);

-- 2. Bảng Đơn hàng
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    table_number INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLETED', -- PENDING, COMPLETED, CANCELLED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Chi tiết đơn hàng
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Chèn dữ liệu món ăn mẫu
INSERT INTO products (name, price, image_url) VALUES
('Cơm Tấm Sườn Bì Chả', 50000, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'),
('Phở Bò Đặc Biệt', 60000, 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43'),
('Trà Sữa Thái Xanh', 30000, 'https://images.unsplash.com/photo-1558857563-b371033873b8'),
('Bánh Mỳ Thịt Nướng', 35000, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f');