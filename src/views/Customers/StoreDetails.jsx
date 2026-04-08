import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Descriptions, Divider, Spin, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { fetchAdminStoreById } from "../../services/adminStoreService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const resolveMedia = (value) => {
  if (!value) {
    return null;
  }

  const raw = String(value).trim();
  if (!raw) {
    return null;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  return `${STORAGE_BASE_URL}/storage/${raw.replace(/^\/+/, "")}`;
};

const formatUsdm = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "N/A";
  }

  return `USDM ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatLabel = (key) =>
  String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const renderSettings = (settings) => {
  const entries = Object.entries(settings || {});
  if (!entries.length) {
    return <div>N/A</div>;
  }

  return (
    <Descriptions bordered size="small" column={1}>
      {entries.map(([key, value]) => (
        <Descriptions.Item key={key} label={formatLabel(key)}>
          {typeof value === "boolean" ? (value ? "Enabled" : "Disabled") : String(value ?? "N/A")}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

function StoreDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadDetails = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminStoreById(id);
        if (!mounted) {
          return;
        }
        setDetails(response);
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load store details."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      mounted = false;
    };
  }, [id]);

  const restaurant = details?.restaurant || null;
  const vendor = details?.vendor || null;

  const vendorName = useMemo(() => {
    const firstName = vendor?.firstname || "";
    const lastName = vendor?.lastname || "";
    return `${firstName} ${lastName}`.trim() || "N/A";
  }, [vendor]);

  return (
    <div style={{ padding: 16 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/Customers")}
        style={{ marginBottom: 16 }}
      >
        Back to Customers
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin />
        </div>
      ) : null}

      {error ? <Alert type="error" message={error} showIcon /> : null}

      {!loading && !error && details ? (
        <>
          <Card title="Vendor Details" style={{ marginBottom: 16 }}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Vendor Name">{vendorName}</Descriptions.Item>
              <Descriptions.Item label="Vendor Email">{vendor?.email || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Vendor Phone">{vendor?.phone || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Vendor Status">
                <Tag color={String(vendor?.status || "pending").toLowerCase() === "approved" ? "green" : "gold"}>
                  {String(vendor?.status || "pending").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Vendor Wallet">
                {formatUsdm(vendor?.wallet_amount)}
              </Descriptions.Item>
              <Descriptions.Item label="Vendor Joined">
                {vendor?.created_at
                  ? dayjs(vendor.created_at).format("MMM DD, YYYY h:mm A")
                  : "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Restaurant Details" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              {restaurant?.restaurant_logo ? (
                <img
                  src={resolveMedia(restaurant.restaurant_logo)}
                  alt="restaurant-logo"
                  style={{ width: 90, height: 90, borderRadius: 8, objectFit: "cover" }}
                />
              ) : null}
              {restaurant?.restaurant_banner ? (
                <img
                  src={resolveMedia(restaurant.restaurant_banner)}
                  alt="restaurant-banner"
                  style={{ width: 200, height: 90, borderRadius: 8, objectFit: "cover" }}
                />
              ) : null}
            </div>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Restaurant Name">
                {restaurant?.restaurant_name || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Restaurant Email">
                {restaurant?.restaurant_email || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Restaurant Phone">
                {restaurant?.restaurant_phone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Restaurant Address">
                {restaurant?.restaurant_address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Open/Close Hours">
                {restaurant?.restaurant_open_close_hr || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {restaurant?.restaurant_country || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {restaurant?.restaurant_currency || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Restaurant Notification Settings" style={{ marginBottom: 16 }}>
            {renderSettings(details?.restaurant_notification_settings)}
          </Card>

          <Card title="Restaurant Business Settings">
            {renderSettings(details?.restaurant_business_settings)}
          </Card>

          <Divider />

          <Card title="Inventory Summary">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Foods">
                {Array.isArray(restaurant?.foods) ? restaurant.foods.length : 0}
              </Descriptions.Item>
              <Descriptions.Item label="Drinks">
                {Array.isArray(restaurant?.drinks) ? restaurant.drinks.length : 0}
              </Descriptions.Item>
              <Descriptions.Item label="Groceries">
                {Array.isArray(restaurant?.groceries) ? restaurant.groceries.length : 0}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      ) : null}
    </div>
  );
}

export default StoreDetails;
