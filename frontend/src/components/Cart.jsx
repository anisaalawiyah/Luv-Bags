/* eslint-disable react/prop-types */
// src/components/Cart.js
import { Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import Orders from "./Orders";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, onClose, onPlus, onMinus }) => {
  const [showBok, setShowBok] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // Hitung total harga berdasarkan jumlah item di cart
  const calculateTotalHarga = () => {
    return cart.reduce((total, item) => {
      const totalHarga = total + item.price * item.quantity;
      console.log(totalHarga);
      return totalHarga;
    }, 0);
  };

 
  const showOrder = () => {
    // Periksa apakah token ada dan role pengguna adalah "user"
    if (token && jwtDecode(token).role === "User") {
      // Arahkan pengguna ke halaman orders jika sudah login
      setShowBok(true);
    } else {
      // Jika belum login, arahkan ke halaman login
      navigate("/login");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>
        {/* <h2 className="text-lg font-bold mb-4">Keranjang Belanja</h2> */}
        {cart.length === 0 ? (
          <p className="text-gray-600">Keranjang belanja kosong.</p>
        ) : (
          <>
            {!showBok ? (
              <>
                <ul className="divide-y divide-gray-300">
                  {cart.map((item) => (
                    <li
                      key={item.product_id}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex space-x-2 items-center">
                        <img
                          src={item.imageurl}
                          alt={item.product_name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div>
                          <p className="font-bold">{item.product_name}</p>
                          <p className="text-sm text-gray-600">
                            Rp {item.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onMinus(item)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Minus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => onPlus(item)}
                          className="text-green-500 hover:text-green-600"
                        >
                          <Plus />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-bold">Total Harga:</p>
                  <p className="text-lg font-bold">
                    Rp {calculateTotalHarga()}
                  </p>
                </div>
                <button
                  onClick={showOrder}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded text-white bg-zinc-800 hover:bg-cyan-900"
                >
                  Checkout
                </button>
              </>
            ) : (
              <Orders
                products={cart}
                counts={cart.reduce((acc, item) => {
                  acc[item.product_id] = item.quantity;
                  return acc;
                }, {})}
                showBok={showBok}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
