import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Descriptions, Spin, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { fetchAdminUserById } from "../../services/adminUserService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const resolveProfilePic = (value) => {
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

const statusTag = (status) => {
  const value = String(status || "pending").toLowerCase();
  if (value === "approved") {
    return <Tag color="green">Approved</Tag>;
  }
  if (value === "rejected" || value === "suspended") {
    return <Tag color="red">Rejected</Tag>;
  }
  return <Tag color="gold">Pending</Tag>;
};

function CourierDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadCourier = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminUserById(id);
        if (!mounted) {
          return;
        }
        setCourier(response);
      } catch (requestError) {
        if (!mounted) {
          return;
        }
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load courier details."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCourier();

    return () => {
      mounted = false;
    };
  }, [id]);

  const fullName = useMemo(() => {
    if (!courier) {
      return "N/A";
    }

    const firstName = courier.firstname || courier.firstName || "";
    const lastName = courier.lastname || courier.lastName || "";
    return `${firstName} ${lastName}`.trim() || courier.name || "N/A";
  }, [courier]);

  return (
    <div style={{ padding: 16 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/Courier")}
        style={{ marginBottom: 16 }}
      >
        Back to Couriers
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin />
        </div>
      ) : null}

      {error ? <Alert type="error" message={error} showIcon /> : null}

      {!loading && !error && courier ? (
        <Card title="Courier Details">
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
            {resolveProfilePic(courier.profilePics) ? (
              <img
                src={resolveProfilePic(courier.profilePics)}
                alt="courier"
                style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : null}
            <div>
              <h3 style={{ margin: 0 }}>{fullName}</h3>
              <div>{statusTag(courier.status)}</div>
            </div>
          </div>

          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="ID">{courier.id ?? "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Email">{courier.email || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Phone">{courier.phone || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="User Type">{courier.usertype || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Location">{courier.location || "N/A"}</Descriptions.Item>
            <Descriptions.Item label="Wallet Amount">
              {courier.courier_wallet_amount !== undefined &&
              courier.courier_wallet_amount !== null
                ? `USDM ${Number(courier.courier_wallet_amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="User Point">
              {courier.user_point !== undefined && courier.user_point !== null
                ? Number(courier.user_point).toLocaleString("en-US")
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Date Joined">
              {courier.created_at
                ? dayjs(courier.created_at).format("MMM DD, YYYY h:mm A")
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle Type">
              {courier.courier_vehicle_type || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle Brand">
              {courier.courier_vehicle_brand || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle Color">
              {courier.courier_vehicle_color || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle Number">
              {courier.courier_vehicle_number || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle City">
              {courier.courier_vehicle_city || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : null}
    </div>
  );
}

export default CourierDetails;
