import React from "react";
import add from "../../../utils/icons/add.svg";
import { Card, Typography, Select, Divider, List } from "antd";
import USAflag from "../../../utils/icons/USAflag.svg";
import EuroFlag from "../../../utils/icons/Euroflag.svg";
import AustraliaFlag from "../../../utils/icons/AustraliaFlag.svg";
import NigeriaFlag from "../../../utils/icons/NigeriaFlag.svg";
import BritishFlag from "../../../utils/icons/BritishFlag.svg";
import inflow from "../../../utils/icons/inflow.svg";
import outflow from "../../../utils/icons/outflow.svg";
import greenfrequency from "../../../utils/icons/greenfrequency.svg";
import redfrequency from "../../../utils/icons/redfrequency.svg";

const ExchangeWalletCard = () => {
  const cardinfo = [
    {
      id: 1,
      flag: USAflag,
      symbol: " USD",
      name: "United States Dollar",
    },
    {
      id: 2,
      flag: EuroFlag,
      symbol: " EUR",
      name: "Euro",
    },
    {
      id: 3,
      flag: AustraliaFlag,
      symbol: "AUD",
      name: "Australian Dollar",
    },
    {
      id: 4,
      flag: BritishFlag,
      symbol: "GBP",
      name: "British Pound",
    },
    {
      id: 5,
      flag: NigeriaFlag,
      symbol: "NGN",
      name: "Nigerian Naira",
    },
  ];
  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 320,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            fontWeight: 400,
            fontSize: 15,
            color: "grey",
            marginBottom: 30,
          }}
        >
          Exchange Wallets
        </Typography>
        <img src={add} alt="" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img src={USAflag} alt="" />
        <Typography>
          US Dollars <strong>USD</strong>
        </Typography>
        <Select
          variant="borderless"
          style={{ width: "50%", maxWidth: 150, marginBottom: 10 }}
        >
          {cardinfo.map((option) => (
            <Select.Option key={option.id}>
              <img
                src={option.flag}
                style={{
                  marginRight: "8px",
                  width: "20px",
                  height: "15px",
                }}
                alt=""
              />
              {option.symbol}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Typography
        style={{
          fontSize: 30,
          margin: "0 auto",
          width: "100%",
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        US 51,768,545.99
      </Typography>

      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        <img src={inflow} alt="" />
        <img src={outflow} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: 10,
        }}
      >
        <Typography style={{ color: "green", fontSize: 20, fontWeight: 700 }}>
          +8.564
        </Typography>
        <Typography style={{ color: "red", fontSize: 20, fontWeight: 700 }}>
          -8.564
        </Typography>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        <img src={greenfrequency} alt="" />
        <img src={redfrequency} alt="" />
      </div>
    </Card>
  );
};

export default ExchangeWalletCard;
