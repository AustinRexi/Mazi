import Navbar from "../../Layout/Navbar";
import Sidebar from "../../Layout/Sidebar";
import Board from "../Dashboard/Board";
import CurrencyExchange from "../CurrencyExchange/CurrencyExchange";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Dashboard = () => {
  return (
    <BrowserRouter>
      <div>
        {/* <Board /> */}
        <Navbar />
        <Sidebar />
      </div>
      <div style={{}}>
        <Routes>
          <Route path="Board" element={<Board />}></Route>
          <Route path="CurrencyExchange" element={<CurrencyExchange />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Dashboard;
