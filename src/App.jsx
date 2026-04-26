import "antd/dist/reset.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

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
import Categories from "./views/Categories/Categories";
import Blogs from "./views/Blogs/Blogs";
import BlogDetails from "./views/Blogs/BlogDetails";
import FaqCategories from "./views/FaqCategories/FaqCategories";
import FaqCategoryDetails from "./views/FaqCategories/FaqCategoryDetails";
import Faqs from "./views/Faqs/Faqs";
import FaqDetails from "./views/Faqs/FaqDetails";
import DistributionSettings from "./views/DistributionSettings/DistributionSettings";
import StoreDetails from "./views/Customers/StoreDetails";
import Settings from "./views/Settings/Settings";
import Support from "./views/Support/Support";
import Wallet from "./views/Wallet/index";
import AdminWithdrawalHistory from "./views/Wallet/AdminWithdrawalHistory";
import Expenses from "./views/Expenses";
import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
import Courier from "./views/Courier/Courier";
import CourierDetails from "./views/Courier/CourierDetails";
import Board from "./views/Dashboard/Board";
import CongratulationsCard from "./Components/Product/CongratulationsCard";

// Vendor Views
import VendorDashboard from "./vendors/dashboard";
import VendorWallet from "./vendors/wallet";
import VendorWithdrawalHistory from "./vendors/wallet/WithdrawalHistory";
import VendorSupport from "./vendors/support";
import VendorSettings from "./vendors/settings";
import VendorProduct from "./vendors/product";
import VendorDrinks from "./vendors/drinks";
import VendorOrder from "./vendors/orders";
import VendorAnalytics from "./vendors/analytics";
import VendorWishlist from "./vendors/wishlist";
import VendorReviews from "./vendors/reviews";
import HomeRoute from "./Components/protectedroute/HomeRoute";
import { AuthContext } from "./context/AuthContext";
import LandingPage from "./views/Landing/LandingPage";

function LandingRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user?.role === "vendor") return <Navigate to="/vendors/dashboard" replace />;

  return <Login />;
}

const router = createHashRouter([
  {
    path: "/",
    element: <LandingRoute />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      // 🔵 Admin Routes
      { path: "home", element: <HomeRoute /> },
      { path: "admin/dashboard", element: <Board /> },

      // { path: "", element: <Board /> },
      { path: "Product", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "Orders", element: <Orders /> },
      { path: "CurrencyExchange", element: <CurrencyExchange /> },
      { path: "Courier", element: <Courier /> },
      { path: "Courier/:id", element: <CourierDetails /> },
      { path: "Wallet", element: <Wallet /> },
      { path: "Wallet/withdrawals", element: <AdminWithdrawalHistory /> },
      { path: "Expenses", element: <Expenses /> },
      { path: "Support", element: <Support /> },
      { path: "Settings", element: <Settings /> },
      { path: "Customers", element: <Customers /> },
      { path: "Categories", element: <Categories /> },
      { path: "Blogs", element: <Blogs /> },
      { path: "Blogs/:id", element: <BlogDetails /> },
      { path: "blogs", element: <Blogs /> },
      { path: "blogs/:id", element: <BlogDetails /> },
      { path: "FaqCategories", element: <FaqCategories /> },
      { path: "FaqCategories/:id", element: <FaqCategoryDetails /> },
      { path: "faq-categories", element: <FaqCategories /> },
      { path: "faq-categories/:id", element: <FaqCategoryDetails /> },
      { path: "Faqs", element: <Faqs /> },
      { path: "Faqs/:id", element: <FaqDetails /> },
      { path: "faqs", element: <Faqs /> },
      { path: "faqs/:id", element: <FaqDetails /> },
      { path: "DistributionSettings", element: <DistributionSettings /> },
      { path: "distribution-settings", element: <DistributionSettings /> },
      { path: "Customers/store/:id", element: <StoreDetails /> },
      { path: "Congratulations", element: <CongratulationsCard /> },

      // 🟢 Vendor Routes (same layout)
      { path: "vendors/dashboard", element: <VendorDashboard /> },
      { path: "vendors/product", element: <VendorProduct /> },
      { path: "vendors/drinks", element: <VendorDrinks /> },
      { path: "vendors/orders", element: <VendorOrder /> },
      { path: "vendors/wishlist", element: <VendorWishlist /> },
      { path: "vendors/reviews", element: <VendorReviews /> },
      { path: "vendors/analytics", element: <VendorAnalytics /> },
      { path: "vendors/wallet", element: <VendorWallet /> },
      { path: "vendors/wallet/withdrawals", element: <VendorWithdrawalHistory /> },
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
