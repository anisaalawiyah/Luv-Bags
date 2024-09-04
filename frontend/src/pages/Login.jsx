import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        Cookies.set('token', data.token, { expires: 1 }); // Simpan token dalam cookies, berakhir dalam 1 hari
        navigate("/");
      } else {
        setError("Login failed. Please check your username and password.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
      <div className="p-8 w-full max-w-md bg-gradient-to-r from-stone-500 via-zinc-700 to-sky-900 rounded-xl shadow-md space-y-3">
        <h2 className="text-center text-2xl font-bold text-white-700">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-white font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-white font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 mb-5 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-cyan-900"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-white text-gray-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}

export default Login;
