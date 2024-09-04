/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../pages/Loading";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function Orders({ products, counts }) {
  const [dataReq, setDataReq] = useState([]);
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(""); // Metode pembayaran
  const [loading, setLoading] = useState(false); // State untuk loading
  const [formVisible, setFormVisible] = useState(true); // State untuk menampilkan/menyembunyikan form
  // eslint-disable-next-line no-unused-vars
  const [orderId, setOrderId] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // Hook untuk navigasi

  useEffect(() => {
    fetchData();
  }, [products, counts]);

  const fetchData = () => {
    const newDataReq = products.map((product) => ({
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      quantity: counts[product.product_id],
      total_price: product.price * counts[product.id],
    }));
    setDataReq(newDataReq);
  };

  const calculateTotalHarga = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * counts[product.product_id];
    });
    return total;
  };

  const calculateTotalAmount = () => {
    let total = 0;
    products.forEach((product) => {
      total += counts[product.product_id];
    });
    return total;
  };

  const handlePayment = async () => {
    if (!customer || !address || !paymentMethod) {
      alert("Harap isi semua field.");
      return;
    }

    const dataRequest = {
      user_id: jwtDecode(Cookies.get("token")).user_id,
      customer: customer,
      address: address,
      quantity: calculateTotalAmount(),
      total_price: calculateTotalHarga(),
      order_date: new Date(),
      payment_method: paymentMethod,
      data: dataReq,
    };

    console.log(dataRequest);

    setLoading(true); // Set loading to true sebelum mulai request
    setFormVisible(false); // Sembunyikan form setelah transaksi dimulai

    try {
      const response = await fetch("http://localhost:3001/api/bisa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRequest),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        console.log("Transaction berhasil");
        setOrderId(result.data.id);
        
        // Tampilkan halaman loading selama beberapa detik sebelum navigasi ke halaman home
        setTimeout(() => {
          <Loading />; // Ganti '/home' dengan path halaman home Anda
        }, 2000); // Tampilkan loading selama 2 detik
      } else {
        console.error("Transaction failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error transaction", error);
      alert("Gagal memproses transaksi, coba lagi.");
    } finally {
      setLoading(false); // Set loading ke false jika proses pembayaran selesai
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "customer") {
      setCustomer(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "paymentMethod") {
      setPaymentMethod(value);
    }
  };

  // Tampilkan komponen Loading jika state loading true
  if (loading) {
    return <Loading />;
  }

  // Tampilkan form jika formVisible true
  if (formVisible) {
    return (
      <>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Form Pemesanan
          </h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-medium mb-2">
              Username:
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              name="customer"
              value={customer}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-600 font-medium mb-2">
              Address:
            </label>
            <input
              id="address"
              type="text"
              placeholder="address"
              name="address"
              value={address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-600 font-medium mb-2">
              Metode Pembayaran:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="cod">Cash on Delivery (COD)</option>
              <option value="spaylater">SpayLater</option>
            </select>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handlePayment}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-white bg-zinc-800 hover:bg-cyan-900"
            >
              Selesai Pembayaran
            </button>
          </div>
        </div>
      </>
    );
  }

  return null; // Tidak menampilkan apa-apa jika form tidak visible
}
