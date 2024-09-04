import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between bg-stone-700 shadow-lg px-6 py-4">
      <div className="flex items-center gap-4">
        <img
          src="logo tas.png"
          alt="Vite Logo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <h1 className="text-2xl font-bold text-white tracking-wider">Alwisa</h1>
      </div>
      <nav className="flex justify-center text-white flex-grow">
        <ul className="flex justify-center gap-12 text-lg">
          <li className="flex items-center gap-2 cursor-pointer">
            <Link to="/">Beranda</Link>
          </li>
          {/* <li className="flex items-center text-white gap-2 cursor-pointer">
            <Link to="/">Tentang kami</Link>
          </li> */}
          <li className="flex items-center text-white gap-2 cursor-pointer">
            <Link to="/product">Product</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-10">
        <Link to="/login" className="flex items-center gap-2 text-white cursor-pointer">
          <UserRound />
        </Link>
        
      </div>
    </header>
  );
}

export default Header;
