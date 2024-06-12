import Navbar from "../../Layout/Navbar";
import Sidebar from "../../Layout/Sidebar";
<<<<<<< HEAD
// import Board from "../Dashboard/Board";
=======
import Board from "../Dashboard/Board";
import CurrencyExchange from "../CurrencyExchange/CurrencyExchange";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> d7c284d9d7560ef4ce5d70dc8470352a8308ca6a

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
