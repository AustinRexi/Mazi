import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Chat from "./Components/Courier/Chat";

// import Courier from "./views/Courier/Courier";

// import CourierCard from "./Components/Courier/CourierCard";

// import UserCard from "./Components/Courier/UserCard";

//Default Home
import Layout from "./Layout/Layout";

// //Navigations from sidebar
import Board from "./views/Dashboard/Board";
import Product from "./views/Product/Product";
import Orders from "./views/Orders/Orders";
import Customers from "./views/Customers/Customers";
import Settings from "./views/Settings/Settings";
import Support from "./views/Support/Support";
import Wallet from "./views/Wallet/Wallet";
import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
import Courier from "./views/Courier/Courier";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "Board",
        element: <Board />,
      },
      {
        path: "Products",
        element: <Product />,
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
    ],
  },
]);

export default function App() {
  return (
    <>
      {/* <Chat /> */}
      {/* <ProfileCard /> */}
      {/* <Courier /> */}
      {/* <CourierCard /> */}
      {/* <UserCard /> */}
      <RouterProvider router={router} />;
    </>
  );
}
