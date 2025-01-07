import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Layout from "./Layout/Layout";
import AddProduct from "./views/Product/Addproduct";
import Board from "./views/Dashboard/Board";
import Product from "./views/Product/Product";
import Orders from "./views/Orders/Order";
import Customers from "./views/Customers/Customers";
import Settings from "./views/Settings/Settings";
import Support from "./views/Support/Support";
import Wallet from "./views/Wallet/Wallet";
import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
import Courier from "./views/Courier/Courier";
import CongratulationsCard from "./Components/Product/CongratulationsCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Board />,
      },
      {
        path: "Product",
        element: <Product />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "Orders",
        element: <Orders />,
      },
      {
        path: "CurrencyExchange",
        element: <CurrencyExchange />,
      },
      {
        path: "Courier",
        element: <Courier />,
      },
      {
        path: "Wallet",
        element: <Wallet />,
      },
      {
        path: "Support",
        element: <Support />,
      },
      {
        path: "Settings",
        element: <Settings />,
      },
      {
        path: "Customers",
        element: <Customers />,
      },
      {
        path: "Congratulations",
        element: <CongratulationsCard />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
