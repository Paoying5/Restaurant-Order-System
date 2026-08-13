-- ============================================================
-- Restaurant Order System - PostgreSQL Schema
-- ============================================================

-- 1. Bảng Món ăn
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Bảng Đơn hàng
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    table_number INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT orders_status_check
        CHECK (status IN ('PENDING', 'COMPLETED', 'CANCELLED'))
);

-- 3. Bảng Chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    product_id INT NOT NULL
        REFERENCES products(id),

    quantity INT NOT NULL
        CHECK (quantity > 0),

    price DECIMAL(10, 2) NOT NULL
        CHECK (price >= 0)
);

-- ============================================================
-- Sample data
-- ============================================================

INSERT INTO products (name, price, image_url)
SELECT *
FROM (
    VALUES
        (
            'Cơm Tấm Sườn Bì Chả',
            50000::DECIMAL(10, 2),
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'
        ),
        (
            'Phở Bò Đặc Biệt',
            60000::DECIMAL(10, 2),
            'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43'
        ),
        (
            'Trà Sữa Thái Xanh',
            30000::DECIMAL(10, 2),
            'https://images.unsplash.com/photo-1558857563-b371033873b8'
        ),
        (
            'Bánh Mỳ Thịt Nướng',
            35000::DECIMAL(10, 2),
            'https://images.unsplash.com/photo-1626700051175-6818013e1d4f'
        )
) AS seed(name, price, image_url)
WHERE NOT EXISTS (
    SELECT 1 FROM products
);
