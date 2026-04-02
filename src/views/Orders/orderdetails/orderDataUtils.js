export const parseOrderItems = (orderProduct) => {
  if (!orderProduct) {
    return [];
  }

  let payload = orderProduct;
  if (typeof orderProduct === "string") {
    try {
      payload = JSON.parse(orderProduct);
    } catch {
      return [];
    }
  }

  const normalizeItem = (item) => ({
    name:
      item?.name ||
      item?.product_name ||
      item?.food_name ||
      item?.groceries_name ||
      item?.drink_name ||
      "Product",
    quantity: Number(item?.quantity || item?.qty || 1),
    price: Number(
      item?.price ||
        item?.unit_price ||
        item?.food_price ||
        item?.groceries_price ||
        item?.drink_price ||
        0
    ),
  });

  if (Array.isArray(payload)) {
    return payload.filter(Boolean).map(normalizeItem);
  }

  const groups = ["foods", "groceries", "drinks", "products", "items"];
  const items = [];
  groups.forEach((key) => {
    if (Array.isArray(payload?.[key])) {
      payload[key].forEach((item) => items.push(normalizeItem(item)));
    }
  });

  return items;
};

export const formatNaira = (value) => {
  const amount = Number(value || 0);
  return `N${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const deriveInitials = (name = "") => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return "NA";
  }
  return parts
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
};
