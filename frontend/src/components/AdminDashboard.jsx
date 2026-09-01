import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from '../socket';

export default function AdminDashboard() {
  const [liveOrders, setLiveOrders] = useState([]);
  const [report, setReport] = useState([]);
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  useEffect(() => {
    // Lắng nghe sự kiện đơn mới từ Socket.io
    socket.on('new_order', (data) => {
      setLiveOrders((prev) => [data, ...prev]);
    });

    return () => socket.off('new_order');
  }, []);

  const fetchMonthlyReport = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reports/monthly?year=${year}&month=${month}`);
      setReport(res.data);
    } catch (err) {
      alert('Lỗi khi tải báo cáo');
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, [month, year]);

  return (
    <div className="space-y-8">
      {/* 1. KHU VỰC NHẬN ĐƠN REALTIME */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Đơn Hàng Mới Nhận (Realtime Máy Chủ)
        </h2>

        {liveOrders.length === 0 ? (
          <p className="text-slate-500 italic">Đang chờ đơn hàng mới từ khách...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveOrders.map((order, index) => (
              <div key={index} className="bg-amber-50 border-2 border-amber-300 p-4 rounded-xl shadow-md">
                <div className="flex justify-between font-bold border-b pb-2 text-slate-800">
                  <span>BÀN SỐ: {order.tableNumber}</span>
                  <span className="text-amber-700">#{order.orderId}</span>
                </div>
                <div className="my-3 space-y-1 text-sm">
                  {order.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{i.name}</span>
                      <span className="font-semibold">x{i.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-slate-900">
                  <span>Tổng:</span>
                  <span>{Number(order.totalAmount).toLocaleString()} VNĐ</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. KHU VỰC BÁO CÁO TỔNG KẾT CUỐI THÁNG */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">📊 Báo Cáo & Tổng Kết Số Lượng Món Cuối Tháng</h2>
          
          <div className="flex gap-2 items-center">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="border p-2 rounded-lg font-medium"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
              ))}
            </select>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border p-2 rounded-lg w-24 font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b">
                <th className="p-3">Mã Món</th>
                <th className="p-3">Tên Món Ăn</th>
                <th className="p-3 text-center">Tổng Số Lượng Đã Bán</th>
                <th className="p-3 text-right">Tổng Doanh Thu</th>
              </tr>
            </thead>
            <tbody>
              {report.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-slate-400">
                    Không có dữ liệu bán hàng trong tháng {month}/{year}
                  </td>
                </tr>
              ) : (
                report.map((row) => (
                  <tr key={row.product_id} className="border-b hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-500">#{row.product_id}</td>
                    <td className="p-3 font-semibold text-slate-800">{row.product_name}</td>
                    <td className="p-3 text-center font-bold text-amber-600">{row.total_quantity_sold}</td>
                    <td className="p-3 text-right font-bold text-emerald-600">
                      {Number(row.total_revenue).toLocaleString()} VNĐ
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}