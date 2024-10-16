import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Ensure Layout is imported
import Board from "./views/Dashboard/Board";
import Product from "./views/Product/Product";
import Orders from "./views/Orders/Orders";
import Customers from "./views/Customers/Customers";
import Settings from "./views/Settings/Settings";
import Support from "./views/Support/Support";
import Wallet from "./views/Wallet/Wallet";
import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
import Courier from "./views/Courier/Courier";
import MainLayout from "./Layout/Layout";
import AuthLayout from "./Layout/AuthLayout";
import { OrderDetails } from "./views/Orders/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "Board", element: <Board /> },
      { path: "Products", element: <Product /> },

      {
        path: "Orders",
        element: <Orders />,
        children: [{ path: "details", element: <OrderDetails /> }],
      },

      { path: "CurrencyExchange", element: <CurrencyExchange /> },
      { path: "Courier", element: <Courier /> },
      { path: "Wallet", element: <Wallet /> },
      { path: "Support", element: <Support /> },
      { path: "Settings", element: <Settings /> },
      { path: "Customers", element: <Customers /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}
