import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Nhập file CSS để áp dụng giao diện Tailwind CSS

// Tìm phần tử có id='root' trong file index.html và nhúng ứng dụng React vào đó
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);