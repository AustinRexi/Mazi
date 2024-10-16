import React from "react";
import ExchangeWalletCard from "./CurrencyExchangeComponent/ExchangeWalletCard";
import CurrencyHeader from "./CurrencyExchangeComponent/CurrencyHeader";
import { ActiveCurrencyCard } from "./CurrencyExchangeComponent/ActiveCurrencyCard";
import CurrencyTable from "./CurrencyExchangeComponent/CurrencyTable";

const CurrencyExchange = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ flex: "0 0 60%" }}>
          {" "}
          {/* Set flex to cover 70% */}
          <CurrencyHeader />
          <CurrencyTable />
        </div>

        <div
          style={{
            flex: "0 0 40%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {" "}
          {/* Set flex to cover 30% */}
          <ExchangeWalletCard />
          <ActiveCurrencyCard />
        </div>
      </div>
    </>
  );
};

export default CurrencyExchange;
