// import themeConfig from "./theme.cofig";
import "./App.css";
import Product from "./views/Product/Product";

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
      <Product />
    </>
  );
}

export default App;
