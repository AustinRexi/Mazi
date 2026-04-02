import "antd/dist/reset.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

// Components
import ProtectedRoute from "./Components/protectedroute/ProtectedRoute";
import Layout from "./Layout/Layout";

// Views (Admin)
import Login from "./views/Login/Login";
import AdminLogin from "./views/Login/AdminLogin";
import AddProduct from "./views/Product/Addproduct";
import Product from "./views/Product/Product";
import Orders from "./views/Orders/Order";
import Customers from "./views/Customers/Customers";
import Settings from "./views/Settings/Settings";
import Support from "./views/Support/Support";
import Wallet from "./views/Wallet/index";
import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
import Courier from "./views/Courier/Courier";
import Board from "./views/Dashboard/Board";
import CongratulationsCard from "./Components/Product/CongratulationsCard";

// Vendor Views
import VendorDashboard from "./vendors/dashboard";
import VendorWallet from "./vendors/wallet";
import VendorSupport from "./vendors/support";
import VendorSettings from "./vendors/settings";
import VendorProduct from "./vendors/product";
import VendorDrinks from "./vendors/drinks";
import VendorOrder from "./vendors/orders";
import VendorAnalytics from "./vendors/analytics";
import VendorWishlist from "./vendors/wishlist";
import HomeRoute from "./Components/protectedroute/HomeRoute";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      // 🔵 Admin Routes
      { path: "", element: <HomeRoute /> },
      { path: "admin/dashboard", element: <Board /> },

      // { path: "", element: <Board /> },
      { path: "Product", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "Orders", element: <Orders /> },
      { path: "CurrencyExchange", element: <CurrencyExchange /> },
      { path: "Courier", element: <Courier /> },
      { path: "Wallet", element: <Wallet /> },
      { path: "Support", element: <Support /> },
      { path: "Settings", element: <Settings /> },
      { path: "Customers", element: <Customers /> },
      { path: "Congratulations", element: <CongratulationsCard /> },

      // 🟢 Vendor Routes (same layout)
      { path: "vendors/dashboard", element: <VendorDashboard /> },
      { path: "vendors/product", element: <VendorProduct /> },
      { path: "vendors/drinks", element: <VendorDrinks /> },
      { path: "vendors/orders", element: <VendorOrder /> },
      { path: "vendors/wishlist", element: <VendorWishlist /> },
      { path: "vendors/analytics", element: <VendorAnalytics /> },
      { path: "vendors/wallet", element: <VendorWallet /> },
      { path: "vendors/support", element: <VendorSupport /> },
      { path: "vendors/settings", element: <VendorSettings /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
