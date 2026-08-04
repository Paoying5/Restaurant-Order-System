import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình Vite dành cho dự án React
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Cấu hình port chạy cho Frontend (http://localhost:3000)
    open: true, // Tự động bật trình duyệt web khi chạy lệnh npm run dev
  }
});