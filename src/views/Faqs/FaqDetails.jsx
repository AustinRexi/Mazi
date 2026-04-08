import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { fetchAdminFaqById } from "../../services/adminFaqService";

function FaqDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [faq, setFaq] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadFaq = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminFaqById(id);
        if (!mounted) {
          return;
        }
        setFaq(response);
      } catch (requestError) {
        if (!mounted) {
          return;
        }
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load FAQ details."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadFaq();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div style={{ padding: 16 }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/Faqs")}
        style={{ marginBottom: 16 }}
      >
        Back to FAQs
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", padding: "36px 0" }}>
          <Spin />
        </div>
      ) : null}

      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}

      {!loading && !error && faq ? (
        <Card title={faq?.heading || "FAQ Details"}>
          <p>
            <strong>ID:</strong> {faq?.id || "N/A"}
          </p>
          <p>
            <strong>Category:</strong> {faq?.category?.category_name || "N/A"}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {faq?.created_at ? dayjs(faq.created_at).format("MMM DD, YYYY h:mm A") : "N/A"}
          </p>
          <p>
            <strong>Updated:</strong>{" "}
            {faq?.updated_at ? dayjs(faq.updated_at).format("MMM DD, YYYY h:mm A") : "N/A"}
          </p>

          <h4 style={{ marginTop: 18 }}>Answer</h4>
          <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{faq?.body || "N/A"}</div>
        </Card>
      ) : null}
    </div>
  );
}

export default FaqDetails;
