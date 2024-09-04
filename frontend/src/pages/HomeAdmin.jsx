import { BarChart, User, ShoppingCart, Settings } from "lucide-react";
import HeaderAdmin from "../components/HeaderAdmin";

function HomeAdmin() {
  return (
    <>
    <HeaderAdmin/>
    <div className=" mt-10 min-h-screen bg-stone-100">
      
      <main className="p-10">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-cyan-700   p-6 rounded-lg shadow-lg flex items-center">
            <User className="w-12 h-12 text-white-500" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-700">Users</h2>
              <p className="text-white-500">1,200 Registered</p>
            </div>
          </div>
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg flex items-center">
            <ShoppingCart className="w-12 h-12 text-green-500" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-700">Orders</h2>
              <p className="text-white500">500 Completed</p>
            </div>
          </div>
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg flex items-center">
            <BarChart className="w-12 h-12 text-orange-500" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-700">Sales</h2>
              <p className="text-white-500">$35,000 This Month</p>
            </div>
          </div>
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg flex items-center">
            <Settings className="w-12 h-12 text-red-500" />
            <div className="ml-4">
              <h2 className="text-lg font-bold text-gray-700">Settings</h2>
              <p className="text-white-500">Manage Site</p>
            </div>
          </div>
        </div>

      

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-700">Recent Orders</h3>
            <ul className="mt-4 space-y-2">
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Order #1024 - $250 - Completed
              </li>
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Order #1025 - $150 - Pending
              </li>
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Order #1026 - $350 - Shipped
              </li>
            </ul>
          </div>
          <div className="bg-cyan-700 p-6 rounded-lg shadow-lg">
            <h3 className=" text-lg font-bold text-gray-700">Support Tickets</h3>
            <ul className="mt-4 space-y-2">
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Ticket #453 - Issue with Payment
              </li>
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Ticket #454 - Unable to Login
              </li>
              <li className="p-2 bg-gray-100 rounded-lg shadow-sm">
                Ticket #455 - Bug in Checkout
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    </>

  );
}    

export default HomeAdmin;
