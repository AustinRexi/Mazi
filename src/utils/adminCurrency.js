import { useEffect, useState } from "react";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "./adminCountryScope";

const COUNTRY_TO_CURRENCY = {
  Nigeria: "NGN",
  Ghana: "GHS",
  Kenya: "KES",
  SouthAfrica: "ZAR",
  "South Africa": "ZAR",
  UnitedStates: "USD",
  "United States": "USD",
  USA: "USD",
  Canada: "CAD",
  UK: "GBP",
  "United Kingdom": "GBP",
  France: "EUR",
  Germany: "EUR",
  Italy: "EUR",
  Spain: "EUR",
};

export const getCurrencyCodeForCountry = (country) => {
  const normalized = String(country || "").trim();
  if (!normalized) {
    return "NGN";
  }

  return (
    COUNTRY_TO_CURRENCY[normalized] ||
    COUNTRY_TO_CURRENCY[normalized.replace(/\s+/g, "")] ||
    "NGN"
  );
};

export const formatAdminMoney = (amount, currencyCode = "NGN") => {
  const normalizedCode = String(currencyCode || "NGN").toUpperCase();
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: normalizedCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  } catch (_) {
    return `${normalizedCode} ${Number(amount || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

export const useAdminCountryCurrency = () => {
  const [country, setCountry] = useState(() => getAdminCountryScope());

  useEffect(() => {
    const handleCountryChange = (event) => {
      setCountry(event.detail?.country || getAdminCountryScope());
    };

    window.addEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
    return () =>
      window.removeEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
  }, []);

  return {
    country,
    currencyCode: getCurrencyCodeForCountry(country),
  };
};
