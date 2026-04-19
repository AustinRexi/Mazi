import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Alert, Card, Spin, Table, Typography } from "antd";

const { Title, Text } = Typography;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const getResponseRows = (response) => {
  const payload = response?.data;
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  if (Array.isArray(payload)) {
    return payload;
  }
  return [];
};

const inferProductType = (entry) => {
  if (entry?.food || entry?.food_id) {
    return "Food";
  }
  if (entry?.grocery || entry?.grocery_id || entry?.groceries_id) {
    return "Grocery";
  }
  if (entry?.drink || entry?.drink_id) {
    return "Drink";
  }

  const explicitType = String(entry?.product_type || entry?.type || "")
    .trim()
    .toLowerCase();

  if (explicitType.includes("food")) {
    return "Food";
  }
  if (explicitType.includes("grocery")) {
    return "Grocery";
  }
  if (explicitType.includes("drink")) {
    return "Drink";
  }

  return "Product";
};

const normalizeWishlistItem = (entry) => {
  const product = entry?.product || entry?.food || entry?.grocery || entry?.drink || {};
  const user = entry?.user || entry?.buyer || {};
  const restaurant = entry?.restaurant || product?.restaurant || {};

  const productName =
    product?.food_name ||
    product?.groceries_name ||
    product?.drink_name ||
    product?.name ||
    entry?.product_name ||
    entry?.food_name ||
    entry?.groceries_name ||
    entry?.drink_name ||
    "Unnamed Product";

  const customerName =
    user?.name ||
    [user?.firstname, user?.lastname].filter(Boolean).join(" ") ||
    entry?.user_name ||
    `User #${entry?.user_id || "-"}`;

  const customerEmail = user?.email || entry?.user_email || "-";

  const restaurantId =
    entry?.restaurant_id ||
    restaurant?.id ||
    product?.restaurant_id ||
    null;

  const restaurantName =
    restaurant?.restaurant_name ||
    restaurant?.name ||
    entry?.restaurant_name ||
    `Restaurant #${restaurantId || "-"}`;

  return {
    id:
      entry?.id ||
      `${entry?.user_id || "u"}-${entry?.product_id || product?.id || "p"}-${
        entry?.created_at || Date.now()
      }`,
    productName,
    productType: inferProductType(entry),
    customerName,
    customerEmail,
    restaurantId,
    restaurantName,
    createdAt: entry?.created_at || entry?.updated_at || "",
  };
};

function VendorWishlist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);

  const fetchWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in as a vendor to view wishlists.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      const endpointCandidates = [
        `${API_BASE_URL}/vendor/wishlists`,
        `${API_BASE_URL}/vendor/product-wishlists`,
        `${API_BASE_URL}/vendor/wishlist`,
      ];

      const query = new URLSearchParams();
      query.set("limit", "500");

      let wishlistRows = [];
      let lastError = null;

      for (const endpoint of endpointCandidates) {
        try {
          const response = await axios.get(`${endpoint}?${query.toString()}`, config);
          wishlistRows = getResponseRows(response);
          lastError = null;
          break;
        } catch (requestError) {
          const status = requestError?.response?.status;
          if (status === 404) {
            // Keep trying fallback endpoints for backward compatibility.
            continue;
          }
          lastError = requestError;
          break;
        }
      }

      if (lastError) {
        throw lastError;
      }

      setRows(wishlistRows.map(normalizeWishlistItem));
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message ||
          "Failed to load wishlist."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (value) => <Text strong>{value}</Text>,
    },
    {
      title: "Type",
      dataIndex: "productType",
      key: "productType",
      width: 120,
    },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div>
          <Text>{record.customerName}</Text>
          <br />
          <Text type="secondary">{record.customerEmail}</Text>
        </div>
      ),
    },
    {
      title: "Restaurant",
      dataIndex: "restaurantName",
      key: "restaurantName",
      width: 220,
    },
    {
      title: "Added",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 190,
      render: (value) => {
        if (!value) {
          return "-";
        }
        const timestamp = new Date(value).getTime();
        if (!Number.isFinite(timestamp)) {
          return String(value);
        }
        return new Date(timestamp).toLocaleString();
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Title level={4} style={{ marginBottom: 4 }}>
              Product Wishlist
            </Title>
            <Text type="secondary">
              Wishlist entries for this vendor
            </Text>
          </div>
        </div>

        {error ? (
          <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />
        ) : null}

        <Spin spinning={loading}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={rows}
            bordered
            locale={{ emptyText: "No wishlist entries found." }}
            pagination={{ pageSize: 10, showSizeChanger: false }}
            scroll={{ x: 980 }}
          />
        </Spin>
      </Card>
    </div>
  );
}

export default VendorWishlist;
