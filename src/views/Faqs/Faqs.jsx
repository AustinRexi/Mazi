import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Form, Input, Modal, Select, Space, Table, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "../../Components/Product/Search";
import {
  createAdminFaq,
  deleteAdminFaq,
  fetchAdminFaqs,
  updateAdminFaq,
} from "../../services/adminFaqService";
import { fetchAdminFaqCategories } from "../../services/adminFaqCategoryService";

const { TextArea } = Input;

function Faqs() {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    let mounted = true;

    const loadFaqs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminFaqs({
          per_page: pageSize,
          page,
          ...(search.trim() ? { search: search.trim() } : {}),
        });

        if (!mounted) {
          return;
        }

        setFaqs(Array.isArray(response?.data) ? response.data : []);
        setTotal(Number(response?.total || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load FAQs."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadFaqs();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, search, reloadKey]);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        const response = await fetchAdminFaqCategories({ per_page: 200, page: 1 });
        if (!mounted) {
          return;
        }
        setCategories(Array.isArray(response?.data) ? response.data : []);
      } catch (_) {
        if (!mounted) {
          return;
        }
        setCategories([]);
      }
    };

    loadCategories();
    return () => {
      mounted = false;
    };
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    form.resetFields();
  };

  const openCreateModal = () => {
    setEditingFaq(null);
    form.setFieldsValue({
      faq_category_id: undefined,
      heading: "",
      body: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingFaq(record);
    form.setFieldsValue({
      faq_category_id: record?.faq_category_id,
      heading: record?.heading || "",
      body: record?.body || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);
      const payload = {
        faq_category_id: Number(values.faq_category_id),
        heading: values.heading,
        body: values.body,
      };

      if (editingFaq?.id) {
        await updateAdminFaq(editingFaq.id, payload);
        message.success("FAQ updated successfully.");
      } else {
        await createAdminFaq(payload);
        message.success("FAQ created successfully.");
      }

      closeModal();
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      if (requestError?.errorFields) {
        return;
      }

      message.error(
        requestError?.response?.data?.message || requestError?.message || "Failed to update FAQ."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record) => {
    const shouldDelete = window.confirm(`Delete FAQ "${record?.heading || ""}"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminFaq(record.id);
      message.success("FAQ deleted successfully.");

      if (faqs.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        setReloadKey((current) => current + 1);
      }
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message || requestError?.message || "Failed to delete FAQ."
      );
    }
  };

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        label: category?.category_name || `Category ${category?.id}`,
        value: category?.id,
      })),
    [categories]
  );

  const columns = useMemo(
    () => [
      {
        title: "Heading",
        dataIndex: "heading",
        key: "heading",
        render: (value) => value || "N/A",
      },
      {
        title: "Category",
        key: "category",
        render: (_, record) => record?.category?.category_name || "N/A",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button icon={<EyeOutlined />} onClick={() => navigate(`/faqs/${record.id}`)}>
              View
            </Button>
            <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
              Edit
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [navigate]
  );

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ margin: 0 }}>FAQs</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Search
            placeholder="Search FAQs"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            style={{ width: 320, height: 45, marginTop: 0 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Add FAQ
          </Button>
        </div>
      </div>

      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}

      <Table
        rowKey="id"
        loading={loading}
        dataSource={faqs}
        columns={columns}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
          onChange: (nextPage, nextSize) => {
            if (nextSize !== pageSize) {
              setPageSize(nextSize);
              setPage(1);
              return;
            }
            setPage(nextPage);
          },
        }}
      />

      <Modal
        title={editingFaq ? "Edit FAQ" : "Add FAQ"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingFaq ? "Update" : "Create"}
        confirmLoading={saving}
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="faq_category_id"
            label="Category"
            rules={[{ required: true, message: "Category is required." }]}
          >
            <Select options={categoryOptions} placeholder="Select category" />
          </Form.Item>

          <Form.Item
            name="heading"
            label="Heading"
            rules={[{ required: true, message: "Heading is required." }]}
          >
            <Input placeholder="Enter heading" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Body is required." }]}
          >
            <TextArea rows={6} placeholder="Enter answer body" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Faqs;
