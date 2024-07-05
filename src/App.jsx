// import themeConfig from "./theme.cofig";
import "./App.css";
// import Uploadimage from "./views/Product/Uploadimage";
// import Tabswitch from "./views/Product/Tabswitch";
// import Pageignition from "./Components/Product/Pageignition";
import Addproduct from "./views/Product/Addproduct";
// import Tabledata from "./Components/Table/Tabledata";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Headers from "./Components/Product/Headers";
// import Board from "./views/Dashboard/Board";

// import Dashboard from "./views/Dashboard/Dashboard";
// import Filter from "./views/Product/Filter";
// import Product from "./views/Product/Product";
// import Orders from "./views/Orders/Orders";
// import Customers from "./views/Customers/Customers";
// import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
// import Courier from "./views/Courier/Courier";
// import Wallet from "./views/Wallet/Wallet";
// import Support from "./views/Support/Support";
// import Settings from "./views/Settings/Settings";

// import Login from "./Login/Login";

function App() {
  // const theme = themeConfig.token;
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "Dashboard",
  //         element: <Dashboard />,
  //       },
  //       {
  //         path: "Products",
  //         element: <Product />,
  //       },
  //       {
  //         path: "Orders",
  //         element: <Orders />,
  //       },
  //       {
  //         path: "Customers",
  //         element: <Customers />,
  //       },
  //       {
  //         path: "Currency Exchange",
  //         element: <CurrencyExchange />,
  //       },
  //       {
  //         path: "Courier",
  //         element: <Courier />,
  //       },
  //       {
  //         path: "Wallet",
  //         element: <Wallet />,
  //       },
  //       {
  //         path: "Support",
  //         element: <Support />,
  //       },
  //       {
  //         path: "Settings",
  //         element: <Settings />,
  //       },
  //     ],
  //   },
  // ]);

  return (
    <>
      {/* <Uploadimage /> */}
      {/* <Settings /> */}
      {/* <Tabswitch /> */}
      {/* <Pageignition /> */}
      <Addproduct />
      {/* <Filter /> */}
      {/* <Tabledata /> */}
      {/* <Headers /> */}
      {/* <Dashboard /> */}
      {/* <Login /> */}
    </>
  );
}

export default App;
