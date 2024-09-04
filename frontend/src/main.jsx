import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Product from "./pages/Product.jsx";
import Orders from "./pages/OrdersAdmin.jsx";
import AdminProduct from "./pages/AdminProduct.jsx";
import Loading from "./pages/Loading.jsx";
import OrdersAdmin from "./pages/OrdersAdmin.jsx";
import HomeAdmin from "./pages/HomeAdmin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
     
      {
        path: "/order",
        element: <Orders/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },{
        path:"/admin",
        element:<HomeAdmin/>,
      },
      {
        path:"/productsAdmin",
        element:<AdminProduct/>,
      },{
        path:"/loading",
        element:<Loading/>
      },{
        path:"/Orders",
        element:<OrdersAdmin/>
      },{
        
          path:"/homeAdmin",
          element:<HomeAdmin/>
        
      }

    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
