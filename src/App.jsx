// import themeConfig from "./theme.cofig";

// import Headers from "./Components/Product/Headers";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard";
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
      {/* <Headers /> */}
      <Dashboard />
      {/* <Login /> */}
    </>
  );
}

export default App;
