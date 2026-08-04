import React, { useState } from 'react';
import CustomerMenu from './components/CustomerMenu';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [role, setRole] = useState('customer'); // 'customer' hoặc 'admin'

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-amber-400">🍽️ Quán Ăn QuickServe</h1>
        <div className="space-x-2">
          <button
            onClick={() => setRole('customer')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              role === 'customer' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            Màn hình Đặt món (Khách)
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              role === 'admin' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            Máy chủ Quản lý (Admin)
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {role === 'customer' ? <CustomerMenu /> : <AdminDashboard />}
      </main>
    </div>
  );
}