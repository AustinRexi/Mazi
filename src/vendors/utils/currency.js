import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const CURRENCY_CACHE_KEY = "vendor_currency_code";

const normalizeCurrencyCode = (value) => String(value || "").trim().toUpperCase();

const getCurrencyCodeFromDraft = () => {
  const token = localStorage.getItem("token") || "";
  const storageScope = token ? token.slice(-16) : "guest";
  const draftKey = `vendor_store_settings_draft_${storageScope}`;
  try {
    const draft = JSON.parse(localStorage.getItem(draftKey) || "{}");
    return normalizeCurrencyCode(draft.storeCurrency);
  } catch {
    return "";
  }
};

const getStoredCurrencyCode = () =>
  normalizeCurrencyCode(
    getCurrencyCodeFromDraft() || localStorage.getItem(CURRENCY_CACHE_KEY)
  );

export const formatVendorMoney = (amount, currencyCode = "") => {
  const numeric = Number(amount || 0);
  const safe = Number.isFinite(numeric) ? numeric : 0;
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const formatted = safe.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (!normalizedCode) {
    return `$${formatted}`;
  }

  return `${normalizedCode} ${formatted}`;
};

export const useVendorCurrencyCode = () => {
  const [currencyCode, setCurrencyCode] = useState(getStoredCurrencyCode());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    if (currencyCode) {
      return;
    }

    let cancelled = false;
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/vendor/restaurants?limit=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const restaurant = (response.data?.data || [])[0];
        const nextCode = normalizeCurrencyCode(restaurant?.restaurant_currency);
        if (!cancelled && nextCode) {
          localStorage.setItem(CURRENCY_CACHE_KEY, nextCode);
          setCurrencyCode(nextCode);
        }
      } catch {
        // Keep fallback behavior when currency fetch fails.
      }
    };

    fetchCurrency();
    return () => {
      cancelled = true;
    };
  }, [currencyCode]);

  return currencyCode;
};
