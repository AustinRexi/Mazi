import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert, Avatar, Button, Card, Table, Tag } from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchAdminFaqCategoryById } from "../../services/adminFaqCategoryService";

function FaqCategoryDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState(location?.state?.category || null);

  useEffect(() => {
    let mounted = true;

    const loadCategory = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminFaqCategoryById(id);
        if (!mounted) {
          return;
        }
        setCategory(response);
      } catch (requestError) {
        if (!mounted) {
          return;
        }
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load FAQ category details."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCategory();
    return () => {
      mounted = false;
    };
  }, [id]);

  const getAvatarProps = (icon, name) => {
    const iconValue = String(icon || "").trim();
    if (/^https?:\/\//i.test(iconValue)) {
      return { src: iconValue };
    }

    const fallbackText = String(name || iconValue || "N/A").trim();
    return {
      icon: !fallbackText ? <UserOutlined /> : null,
      children: fallbackText ? fallbackText.charAt(0).toUpperCase() : null,
    };
  };

  return (
    <div style={{ padding: 16 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/FaqCategories")}
        style={{ marginBottom: 16 }}
      >
        Back to FAQ Categories
      </Button>

      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}

      {category ? (
        <Card title={category?.category_name || "FAQ Category Details"} loading={loading}>
          <p>
            <strong>ID:</strong> {category?.id || "N/A"}
          </p>
          <p>
            <strong>Icon:</strong>{" "}
            <Avatar
              {...getAvatarProps(category?.category_icon, category?.category_name)}
              style={{ verticalAlign: "middle" }}
            />
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {category?.category_status ? (
              <Tag color="green">Active</Tag>
            ) : (
              <Tag color="gold">Inactive</Tag>
            )}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {category?.created_at
              ? dayjs(category.created_at).format("MMM DD, YYYY h:mm A")
              : "N/A"}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {category?.updated_at
              ? dayjs(category.updated_at).format("MMM DD, YYYY h:mm A")
              : "N/A"}
          </p>

          <h4 style={{ marginTop: 20 }}>FAQs</h4>
          <Table
            rowKey="id"
            dataSource={Array.isArray(category?.faqs) ? category.faqs : []}
            pagination={false}
            columns={[
              { title: "ID", dataIndex: "id", key: "id" },
              { title: "Heading", dataIndex: "heading", key: "heading", render: (v) => v || "N/A" },
              {
                title: "Body",
                dataIndex: "body",
                key: "body",
                render: (value) => {
                  if (!value) {
                    return "N/A";
                  }
                  const text = String(value);
                  return text.length > 120 ? `${text.slice(0, 120)}...` : text;
                },
              },
            ]}
          />
        </Card>
      ) : null}
    </div>
  );
}

export default FaqCategoryDetails;
