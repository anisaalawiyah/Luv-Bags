/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { TbSortAscending2, TbSortDescending2 } from "react-icons/tb"; // Import ikon untuk ascending dan descending
import Cart from '../components/Cart';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);

        // Ambil daftar brand yang unik menggunakan Set
        const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
        setBrands(uniqueBrands);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        alert("Terjadi masalah saat mengambil data produk. Silakan coba lagi.");
      });
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cart]);

  const filterData = products && products
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => {
      return item.product_name.toLowerCase().includes(search.toLowerCase()) &&
        (selectedBrand === "" || item.brand === selectedBrand);
    });

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.product_id === product.product_id);
  
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.product_id === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  function handleRemoveCartItem(item) {
    const updatedCart = cart
      .map((cartItem) =>
        cartItem.product_id === item.product_id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((cartItem) => cartItem.quantity > 0);
    setCart(updatedCart);
  }

  function handlePlusCartItem(item) {
    const updatedCart = cart.map((i) =>
      i.product_id === item.product_id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setCart(updatedCart);
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header />
      <div className="p-6 mt-10">
        <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-2/5">
              <input
                type="text"
                className="bg-gray-100 w-full p-2 rounded-lg border border-gray-300"
                placeholder="Cari produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="text-gray-500" />
            </div>
            <div className="flex items-center gap-14 w-full sm:w-auto">
              <div
                className="flex flex-row gap-4 items-center border border-gray-300 rounded-md py-3 px-2 outline-none cursor-pointer"
                onClick={() => {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                }}
              >
                <label>Urutkan harga</label>
                {sortOrder === "asc" ? (
                  <TbSortAscending2 className="text-2xl" />
                ) : (
                  <TbSortDescending2 className="text-2xl" />
                )}
              </div>
              <label className="flex items-center gap-12 w-full sm:w-auto">
                <select
                  className="flex flex-row rounded-lg border border-gray-300 w-full p-2 text-sm  rounded-md py-3 px-2"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Filter by Brand:</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </label>
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative fixed bottom-1 right-4 bg-cyan-900 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 flex items-center"
              >
                <ShoppingCart className="w-6 h-6 mr-2" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {filterData.map((product) => (
            <div
              key={product.product_id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div className="flex justify-center items-center mb-4">
                <img
                  src={product.imageurl}
                  className="w-full h-auto object-contain max-h-48 rounded-lg"
                  alt={product.product_name}
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{product.product_name}</p>
                <p className="font-bold text-lg text-stone-800">{product.brand}</p>
                <p className="font-bold text-lg">Rp {product.price}</p>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-stone-600 text-white py-2 px-4 rounded-lg hover:bg-stone-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <Cart
            cart={cart}
            totalPrice={totalPrice}
            onClose={() => setIsModalOpen(false)}
            onPlus={handlePlusCartItem}
            onMinus={handleRemoveCartItem}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
