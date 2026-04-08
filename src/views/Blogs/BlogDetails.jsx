import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Image, Spin, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { fetchAdminBlogById } from "../../services/adminBlogService";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const toAssetUrl = (value) => {
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

function BlogDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blog, setBlog] = useState(location?.state?.blog || null);

  useEffect(() => {
    let mounted = true;

    const loadBlog = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminBlogById(id);
        if (!mounted) {
          return;
        }

        setBlog(response);
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        if (!location?.state?.blog) {
          setError(
            requestError?.response?.data?.message ||
              requestError?.message ||
              "Failed to load blog details."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      mounted = false;
    };
  }, [id]);

  const publishedTag = useMemo(() => {
    if (!blog) {
      return null;
    }

    return blog.is_published ? (
      <Tag color="green">Published</Tag>
    ) : (
      <Tag color="gold">Draft</Tag>
    );
  }, [blog]);

  return (
    <div style={{ padding: 16 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/blogs")}
        style={{ marginBottom: 16 }}
      >
        Back to Blogs
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", padding: "36px 0" }}>
          <Spin />
        </div>
      ) : null}

      {error ? <Alert type="error" showIcon message={error} /> : null}

      {!loading && !error && blog ? (
        <Card title={blog.title || "Blog Details"} extra={publishedTag}>
          <div style={{ marginBottom: 12, color: "#667085" }}>
            Created: {blog.created_at ? dayjs(blog.created_at).format("MMM DD, YYYY h:mm A") : "N/A"}
            {" | "}
            Updated: {blog.updated_at ? dayjs(blog.updated_at).format("MMM DD, YYYY h:mm A") : "N/A"}
          </div>

          {blog.feature_image ? (
            <div style={{ marginBottom: 16 }}>
              <Image
                src={toAssetUrl(blog.feature_image)}
                alt="feature-image"
                style={{ maxHeight: 320, borderRadius: 8 }}
              />
            </div>
          ) : null}

          <div
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.7,
              color: "#1D2939",
              fontSize: 15,
            }}
          >
            {blog.body || "N/A"}
          </div>
        </Card>
      ) : null}

      {!loading && !error && !blog ? (
        <Alert
          type="warning"
          showIcon
          message="Blog details are not available for this record."
        />
      ) : null}
    </div>
  );
}

export default BlogDetails;
