import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom'; // Pastikan import Link jika menggunakan react-router-dom
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token'); // Ambil token
  if(token&&jwtDecode(token).role !== 'admin'){
    console.log('anda bukan admin');
  }else {
  // location.href ='/admin';
  navigate("/admin");
  console.log('anda admin');
  }
  return (
     <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-8">
          {/* Section for Main Video and Text */}
          <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 mt-10">
            <video 
              src="https://www.dior.com/couture/var/dior/storage/original/video/a0a9b890dd8ab61a46ab8cc989d6f37c.mp4" 
              className="w-full h-96 object-cover mt-10" 
              autoPlay
              loop 
              muted
            >
              Your browser does not support the video tag.
            </video>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Our Latest Products</h2>
              <p className="text-gray-700 mb-4">
                Explore our latest collection of products that are designed to meet all your needs. From electronics to fashion, we have everything you need in one place.
              </p>
            </div>
          </section>

          {/* Section for Displaying Products */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M0446CRIWM928_E01?$default_GHC_870$&crop=403,196,1194,1750&bfc=on&qlt=85" 
                alt="Product 1" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <p className="text-gray-700 mb-2">Christian Dior</p>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M1365UBOLM900_E01?$default_GHC_870$&crop=276,464,1418,1380&bfc=on&qlt=85" 
                alt="Product 2" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <p className="text-gray-700 mb-2">Christian Dior</p>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M0456VDDSM928_E01?$default_GHC_870$&crop=378,275,1165,1646&bfc=on&qlt=85" 
                alt="Product 3" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <p className="text-gray-700 mb-2">Christian Dior</p>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>

              </div>
            </div>
          </section>

          {/* Section for Side-by-Side Large Images */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-10">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-fw24-women/folder-push-edito_1850-x-2000/m0455vddsm928/44222991-1-eng-GB/m0455vddsm928_1440_1200.jpg?imwidth=640" 
                alt="Large Image 1" 
                className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://www.dior.com/couture/var/dior/storage/images/pushs-editos/folder-fw24-women/folder-push-editos-w0-crops/m1364utzqm928/44228375-1-eng-GB/m1364utzqm928_1440_1200.jpg?imwidth=640" 
                alt="Large Image 2" 
                className="w-full h-96 object-cover cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
            </div>
          </section>
          
          {/* Section for Displaying More Products */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M1364UBNTM39U_E01?$default_GHC_870$&crop=308,636,1386,1175&bfc=on&qlt=85" 
                alt="Product 1" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>

              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M2271UDCEM49E_E01?$default_GHC$&crop=536,301,900,1465&bfc=on&qlt=85" 
                alt="Product 2" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>

              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://assets.christiandior.com/is/image/diorprod/M1325CETJM46I_E01?$default_GHC_870$&crop=337,430,1238,1361&bfc=on&qlt=85" 
                alt="Product 3" 
                className="w-full h-80 object-cover p-4 cursor-pointer transition-transform duration-300 hover:transform hover:scale-110" 
              />
              <div className="p-4 flex flex-col justify-between items-center">
                <h3 className="text-lg font-semibold text-center text-white bg-stone-500 rounded-full inline-block px-3 py-1 mb-2">Best Seller</h3>
                <Link to="/product" className="text-blue-600 hover:underline">Shop now</Link>

              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
