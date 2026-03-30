const KEY_BASE = "vendor_selected_restaurant_id";

const getScopedKey = () => {
  const token = localStorage.getItem("token") || "";
  const scope = token ? token.slice(-16) : "guest";
  return `${KEY_BASE}_${scope}`;
};

export const getVendorRestaurantScope = () => {
  const raw = localStorage.getItem(getScopedKey());
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : null;
};

export const setVendorRestaurantScope = (restaurantId) => {
  const key = getScopedKey();
  const id = Number(restaurantId);

  if (!Number.isFinite(id) || id <= 0) {
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key, String(id));
};
