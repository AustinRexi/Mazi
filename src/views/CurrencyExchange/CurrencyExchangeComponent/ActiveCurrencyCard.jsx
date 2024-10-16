import React from "react";
import { Card, Typography, Select, Divider, List } from "antd";
import Search from "../../../Components/Product/Search";
import USAflag from "../../../utils/icons/USAflag.svg";
import EuroFlag from "../../../utils/icons/Euroflag.svg";
import AustraliaFlag from "../../../utils/icons/AustraliaFlag.svg";
import NigeriaFlag from "../../../utils/icons/NigeriaFlag.svg";
import BritishFlag from "../../../utils/icons/BritishFlag.svg";
import Convert from "../../../utils/icons/convert.svg";

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

const activeCurrencies = [
  {
    currency: "USD",
    rate: "$1.00",
    equivalent: "₦1,418.14",
    flag: BritishFlag,
    icon: Convert,
  },
  {
    currency: "EUR",
    rate: "€1.00",
    equivalent: "₦1,524.20",
    flag: EuroFlag,
    icon: Convert,
  },
  {
    currency: "AUD",
    rate: "A$1.00",
    equivalent: "₦930.53",
    flag: AustraliaFlag,
    icon: Convert,
  },
  {
    currency: "GDP",
    rate: "£1.00",
    equivalent: "₦1,770.02",
    flag: BritishFlag,
    icon: Convert,
  },
  {
    currency: "NGN",
    rate: "₦1",
    equivalent: "₦1",
    flag: NigeriaFlag,
    icon: Convert,
  },
];

export const ActiveCurrencyCard = () => (
  <Card
    style={{
      width: "100%",
      maxWidth: 320,
      margin: "0 auto",
    }}
  >
    <Typography
      style={{ fontWeight: 700, fontSize: 20, color: "grey", marginBottom: 8 }}
    >
      Active Currencies
    </Typography>
    <Search style={{ marginBottom: 20 }} />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap", // Allow wrapping for smaller screens
      }}
    >
      <Typography style={{ fontWeight: 600 }}>Currency</Typography>
      <Select variant="borderless" style={{ width: "100%", maxWidth: 150 }}>
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
    <Divider
      style={{
        border: "1px solid grey",
      }}
    />
    <List
      dataSource={activeCurrencies}
      renderItem={(currency) => (
        <List.Item
          style={{
            borderBottom: "1.5px solid grey",
            fontWeight: 700,
            color: "grey",
            gap: 4,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap", // Allow wrapping for smaller screens
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={currency.flag}
              alt=""
              style={{ width: "20px", height: "15px" }}
            />
            <span>
              {currency.currency} {currency.rate}
            </span>
          </div>

          <img
            src={currency.icon}
            alt=""
            style={{ width: "20px", height: "15px" }}
          />
          <Typography style={{ color: "grey" }}>
            {currency.equivalent}
          </Typography>
        </List.Item>
      )}
    />
  </Card>
);
