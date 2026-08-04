import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerMenu() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const addToCart = (product) => {
    const exist = cart.find(x => x.id === product.id);
    if (exist) {
      setCart(cart.map(x => x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleOrder = async () => {
    if (cart.length === 0) return alert('Vui lòng chọn ít nhất 1 món!');
    
    const payload = {
      tableNumber,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: Number(item.price),
        name: item.name
      }))
    };

    try {
      await axios.post('http://localhost:5000/api/orders', payload);
      setCart([]);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 4000);
    } catch (err) {
      alert('Có lỗi xảy ra khi đặt món!');
    }
  };

  const totalCart = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cột Menu Món ăn */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Thực Đơn Món Ăn</h2>
        {orderSuccess && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            🎉 Đặt món thành công! Đơn hàng đã gửi về bếp/máy chủ.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <img src={p.image_url} alt={p.name} className="w-full h-36 object-cover rounded-md mb-3" />
                <h3 className="font-semibold text-lg text-slate-800">{p.name}</h3>
                <p className="text-amber-600 font-bold mt-1">{Number(p.price).toLocaleString()} VNĐ</p>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium transition"
              >
                + Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cột Giỏ hàng & Đặt đơn */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit space-y-4">
        <h2 className="text-xl font-bold text-slate-800 border-b pb-2">Giỏ Hàng Bàn Của Bạn</h2>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Chọn Số Bàn:</label>
          <input
            type="number"
            min="1"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">Chưa có món nào được chọn</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-slate-500">{Number(item.price).toLocaleString()} đ x {item.quantity}</p>
                </div>
                <span className="font-bold">{(item.price * item.quantity).toLocaleString()} đ</span>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-3 flex justify-between items-center font-bold text-lg">
          <span>Tổng tiền:</span>
          <span className="text-amber-600">{totalCart.toLocaleString()} VNĐ</span>
        </div>

        <button
          onClick={handleOrder}
          className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-xl transition shadow-md"
        >
          Xác Nhận Đặt Món
        </button>
      </div>
    </div>
  );
}