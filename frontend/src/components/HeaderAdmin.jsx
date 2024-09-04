import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie';

const HeaderAdmin = () => {
    return (
        <header className="bg-gradient-to-r from-stone-700 via-zinc-700 to-sky-900 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="text-2xl font-bold">
                Admin Dashboard
            </div>
            <nav className="flex space-x-4">
            <Link to="/homeAdmin" className="text-white hover:text-gray-300">
                    Dashboard
                </Link>
                <Link to="/Orders" className="text-white hover:text-gray-300">
                    Data Order
                </Link>
                <Link to="/productsAdmin" className="text-white hover:text-gray-300">
                    Data Product
                </Link>
                {/* <button className="text-white hover:text-gray-300" onClick={() => Cookies.remove('token')}>
                    Logout
                </button> */}
                 <Link to="/" className="text-white hover:text-gray-300">
                    Logout
                </Link>
            </nav>
        </header>
    );
};

export default HeaderAdmin;
