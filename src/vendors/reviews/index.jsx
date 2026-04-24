import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Empty,
  Input,
  Rate,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { getVendorRestaurantScope } from "../utils/restaurantScope";

const { Title, Text, Paragraph } = Typography;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const ENDPOINT_CANDIDATES = [
  "/vendor/reviews",
  "/vendor/restaurants/reviews",
  "/vendor/restaurant-reviews",
];

const toSafeArray = (value) => (Array.isArray(value) ? value : []);

const resolveName = (person, fallback) => {
  if (!person || typeof person !== "object") return fallback;
  const first = String(person.firstname || person.first_name || "").trim();
  const last = String(person.lastname || person.last_name || "").trim();
  const joined = `${first} ${last}`.trim();
  return joined || String(person.name || fallback);
};

const normalizeReview = (row) => {
  const reviewer = row?.reviewer || row?.user || {};
  const restaurant = row?.restaurant || {};

  const rating = Number(row?.rating ?? 0);
  const comment = String(row?.comment || row?.message || "").trim();

  return {
    id: row?.id || `${row?.user_id || "u"}-${row?.restaurant_id || "r"}-${row?.created_at || Date.now()}`,
    rating: Number.isFinite(rating) ? rating : 0,
    comment,
    reviewerName: resolveName(reviewer, "Anonymous"),
    reviewerEmail: reviewer?.email || row?.email || "-",
    restaurantId: row?.restaurant_id || restaurant?.id || null,
    restaurantName:
      restaurant?.restaurant_name || restaurant?.name || row?.restaurant_name || "Restaurant",
    createdAt: row?.created_at || row?.updated_at || "",
  };
};

const getPayloadRows = (payload) => {
  if (Array.isArray(payload?.data?.reviews)) return payload.data.reviews;
  if (Array.isArray(payload?.reviews)) return payload.reviews;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
};

function VendorReviews() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [endpointUnavailable, setEndpointUnavailable] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  const fetchReviews = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in as a vendor to view reviews.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setEndpointUnavailable(false);

    const restaurantId = getVendorRestaurantScope();
    const params = {};
    if (restaurantId) {
      params.restaurant_id = restaurantId;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    let lastError = null;
    let resolvedRows = [];
    let endpointMatched = false;

    for (const endpoint of ENDPOINT_CANDIDATES) {
      try {
        const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
          headers,
          params,
        });
        resolvedRows = getPayloadRows(response?.data);
        endpointMatched = true;
        lastError = null;
        break;
      } catch (requestError) {
        const status = requestError?.response?.status;
        if (status === 404) {
          continue;
        }
        lastError = requestError;
        break;
      }
    }

    if (!endpointMatched && !lastError) {
      setEndpointUnavailable(true);
      setRows([]);
      setLoading(false);
      return;
    }

    if (lastError) {
      setError(
        lastError.response?.data?.message || "Failed to load vendor reviews."
      );
      setRows([]);
      setLoading(false);
      return;
    }

    setRows(toSafeArray(resolvedRows).map(normalizeReview));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const selectedRating = Number(ratingFilter);

    return rows.filter((row) => {
      const matchesRating =
        ratingFilter === "all" || Math.round(row.rating) === selectedRating;
      if (!matchesRating) return false;

      if (!query) return true;
      return (
        row.reviewerName.toLowerCase().includes(query) ||
        row.reviewerEmail.toLowerCase().includes(query) ||
        row.restaurantName.toLowerCase().includes(query) ||
        row.comment.toLowerCase().includes(query)
      );
    });
  }, [rows, searchQuery, ratingFilter]);

  const stats = useMemo(() => {
    if (!rows.length) {
      return { total: 0, average: 0, positive: 0 };
    }
    const total = rows.length;
    const sum = rows.reduce((acc, row) => acc + (row.rating || 0), 0);
    const positive = rows.filter((row) => row.rating >= 4).length;
    return { total, average: sum / total, positive };
  }, [rows]);

  const columns = [
    {
      title: "User",
      key: "reviewer",
      render: (_, record) => (
        <div>
          <Text strong>{record.reviewerName}</Text>
          <br />
          <Text type="secondary">{record.reviewerEmail}</Text>
        </div>
      ),
      width: 240,
    },
    {
      title: "Restaurant",
      dataIndex: "restaurantName",
      key: "restaurantName",
      width: 200,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 180,
      render: (value) => (
        <Space size="small">
          <Rate disabled allowHalf value={Number(value) || 0} style={{ fontSize: 14 }} />
          <Text>{Number(value || 0).toFixed(1)}</Text>
        </Space>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      render: (value) =>
        value ? (
          <Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 2, expandable: true }}>
            {value}
          </Paragraph>
        ) : (
          <Text type="secondary">No comment</Text>
        ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (value) => {
        if (!value) return "-";
        const ts = new Date(value).getTime();
        if (!Number.isFinite(ts)) return String(value);
        return new Date(ts).toLocaleDateString();
      },
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Space
          style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}
          align="start"
          wrap
        >
          <div>
            <Title level={4} style={{ marginBottom: 4 }}>
              User Reviews
            </Title>
            <Text type="secondary">
              Ratings and comments from users for your restaurant(s)
            </Text>
          </div>
          <Button icon={<ReloadOutlined />} onClick={fetchReviews} loading={loading}>
            Refresh
          </Button>
        </Space>

        <Space wrap style={{ marginBottom: 16 }}>
          <Tag color="blue">Total: {stats.total}</Tag>
          <Tag color="gold">Average: {stats.average.toFixed(1)}</Tag>
          <Tag color="green">4★+ Reviews: {stats.positive}</Tag>
        </Space>

        <Space wrap style={{ width: "100%", marginBottom: 16 }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search reviewer, email, comment..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            style={{ minWidth: 280 }}
          />
          <Select
            value={ratingFilter}
            onChange={setRatingFilter}
            style={{ width: 180 }}
            options={[
              { value: "all", label: "All ratings" },
              { value: "5", label: "5 stars" },
              { value: "4", label: "4 stars" },
              { value: "3", label: "3 stars" },
              { value: "2", label: "2 stars" },
              { value: "1", label: "1 star" },
            ]}
          />
        </Space>

        {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}
        {endpointUnavailable ? (
          <Alert
            type="info"
            showIcon
            style={{ marginBottom: 12 }}
            message="No vendor reviews endpoint is available yet."
            description="Add a backend route like GET /vendor/reviews to supply this page."
          />
        ) : null}

        {loading ? (
          <div style={{ textAlign: "center", padding: "36px 0" }}>
            <Spin tip="Loading reviews..." />
          </div>
        ) : filteredRows.length ? (
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredRows}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 980 }}
          />
        ) : (
          <Card>
            <Empty description="No reviews found." />
          </Card>
        )}
      </Card>
    </div>
  );
}

export default VendorReviews;
