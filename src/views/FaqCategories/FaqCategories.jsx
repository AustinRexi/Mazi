import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Avatar, Button, Form, Input, Modal, Space, Switch, Table, Tag, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import Search from "../../Components/Product/Search";
import {
  deleteAdminFaqCategory,
  fetchAdminFaqCategories,
  updateAdminFaqCategory,
} from "../../services/adminFaqCategoryService";

function FaqCategories() {
  const navigate = useNavigate();
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
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminFaqCategories({
          per_page: pageSize,
          page,
          ...(search.trim() ? { search: search.trim() } : {}),
        });

        if (!mounted) {
          return;
        }

        setCategories(Array.isArray(response?.data) ? response.data : []);
        setTotal(Number(response?.total || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load FAQ categories."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCategories();
    return () => {
      mounted = false;
    };
  }, [page, pageSize, search, reloadKey]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const openEditModal = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({
      category_name: record?.category_name || "",
      category_icon: record?.category_icon || "",
      category_status: Boolean(record?.category_status),
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingCategory?.id) {
      return;
    }

    try {
      const values = await form.validateFields();
      setSaving(true);

      await updateAdminFaqCategory(editingCategory.id, {
        category_name: values.category_name,
        category_icon: values.category_icon || null,
        category_status: values.category_status ? 1 : 0,
      });

      message.success("FAQ category updated successfully.");
      closeModal();
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      if (requestError?.errorFields) {
        return;
      }

      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to update FAQ category."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record) => {
    const shouldDelete = window.confirm(
      `Delete FAQ category "${record?.category_name || ""}"?`
    );

    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminFaqCategory(record.id);
      message.success("FAQ category deleted successfully.");

      if (categories.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        setReloadKey((current) => current + 1);
      }
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete FAQ category."
      );
    }
  };

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

  const columns = useMemo(
    () => [
      {
        title: "Category Name",
        dataIndex: "category_name",
        key: "category_name",
        render: (value) => value || "N/A",
      },
      {
        title: "Icon",
        dataIndex: "category_icon",
        key: "category_icon",
        render: (value, record) => <Avatar {...getAvatarProps(value, record?.category_name)} />,
      },
      {
        title: "Status",
        dataIndex: "category_status",
        key: "category_status",
        render: (value) =>
          value ? <Tag color="green">Active</Tag> : <Tag color="gold">Inactive</Tag>,
      },
      {
        title: "FAQs",
        key: "faqs_count",
        render: (_, record) => Number(record?.faqs?.length || 0),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                navigate(`/faq-categories/${record.id}`, { state: { category: record } })
              }
            >
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
    []
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
        <h2 style={{ margin: 0 }}>FAQ Categories</h2>
        <Search
          placeholder="Search FAQ categories"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          style={{ width: 320, height: 45, marginTop: 0 }}
        />
      </div>

      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}

      <Table
        rowKey="id"
        loading={loading}
        dataSource={categories}
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
        title="Edit FAQ Category"
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText="Update"
        confirmLoading={saving}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[{ required: true, message: "Category name is required." }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item label="Category Icon" name="category_icon">
            <Input placeholder="Enter icon value" />
          </Form.Item>

          <Form.Item label="Category Status" name="category_status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FaqCategories;
