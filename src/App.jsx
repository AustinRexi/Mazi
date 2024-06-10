import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "./views/Dashboard/Dashboard";
const App = () => {
  return (
    <Router>
      {/* <Dashboard /> */}
      <Switch>
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};

export default App;

// // import themeConfig from "./theme.cofig";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Dashboard from "./views/Dashboard/Dashboard";
// import Product from "./views/Product/Product";
// import Orders from "./views/Orders/Orders";
// import Customers from "./views/Customers/Customers";
// import CurrencyExchange from "./views/CurrencyExchange/CurrencyExchange";
// import Courier from "./views/Courier/Courier";
// import Wallet from "./views/Wallet/Wallet";
// import Support from "./views/Support/Support";
// import Settings from "./views/Settings/Settings";
// import Login from "./Login/Login";

// f

//   return (
//     <>
//       <Dashboard />
//       {/* <Login /> */}
//     </>
//   );
// }

// export default App;
