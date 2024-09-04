import { Twitter, Facebook, Instagram, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-700 text-white py-8">
      <div className="container mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm mb-4">We are dedicated to providing the best products and services for our customers. Your satisfaction is our top priority.</p>
            <p className="text-sm">1234 Street Name, City, Country</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2">
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Shop</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-2xl hover:text-blue-500 transition-colors duration-300">
                <Twitter />
              </a>
              <a href="#" className="text-2xl hover:text-blue-700 transition-colors duration-300">
                <Facebook />
              </a>
              <a href="#" className="text-2xl hover:text-pink-500 transition-colors duration-300">
                <Instagram />
              </a>
            </div>
          </div>

          {/* Official Store Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Official Store</h3>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <CheckCircle className="text-2xl text-green-500" />
              <p className="text-sm">Certified Official Store</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm">
          <p>&copy; 2024 My E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
