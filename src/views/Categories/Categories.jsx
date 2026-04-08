import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Upload,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "../../Components/Product/Search";
import {
  createAdminCategory,
  deleteAdminCategory,
  fetchAdminCategories,
  updateAdminCategory,
} from "../../services/adminCategoryService";

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

function Categories() {
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

  const [iconFileList, setIconFileList] = useState([]);
  const [imageFileList, setImageFileList] = useState([]);

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      setLoading(true);
      setError("");

      try {
        const offset = (page - 1) * pageSize;
        const response = await fetchAdminCategories({
          limit: pageSize,
          offset,
          ...(search.trim() ? { search: search.trim() } : {}),
        });

        if (!mounted) {
          return;
        }

        setCategories(Array.isArray(response.data) ? response.data : []);
        setTotal(Number(response.pagination?.total || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load categories."
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
    setIconFileList([]);
    setImageFileList([]);
    form.resetFields();
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setIconFileList([]);
    setImageFileList([]);
    form.setFieldsValue({ category_name: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({ category_name: record.category_name || "" });

    setIconFileList(
      record.category_icon
        ? [
            {
              uid: "existing-icon",
              name: "Current Icon",
              status: "done",
              url: toAssetUrl(record.category_icon),
            },
          ]
        : []
    );

    setImageFileList(
      record.category_image
        ? [
            {
              uid: "existing-image",
              name: "Current Image",
              status: "done",
              url: toAssetUrl(record.category_image),
            },
          ]
        : []
    );

    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = new FormData();
      payload.append("category_name", values.category_name);

      const iconFile = iconFileList?.[0]?.originFileObj;
      const imageFile = imageFileList?.[0]?.originFileObj;

      if (iconFile) {
        payload.append("category_icon", iconFile);
      }
      if (imageFile) {
        payload.append("category_image", imageFile);
      }

      setSaving(true);

      if (editingCategory?.id) {
        await updateAdminCategory(editingCategory.id, payload);
        message.success("Category updated successfully.");
      } else {
        await createAdminCategory(payload);
        message.success("Category created successfully.");
      }

      closeModal();
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      if (requestError?.errorFields) {
        return;
      }

      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to save category."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record) => {
    const shouldDelete = window.confirm(
      `Delete category \"${record?.category_name || ""}\"?`
    );
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminCategory(record.id);
      message.success("Category deleted successfully.");

      const isLastItemOnPage = categories.length === 1 && page > 1;
      if (isLastItemOnPage) {
        setPage((current) => current - 1);
      } else {
        setReloadKey((current) => current + 1);
      }
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete category."
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "category_name",
        key: "category_name",
      },
      {
        title: "Icon",
        dataIndex: "category_icon",
        key: "category_icon",
        render: (value) => {
          const src = toAssetUrl(value);
          return src ? <Image src={src} alt="category-icon" width={42} /> : "N/A";
        },
      },
      {
        title: "Image",
        dataIndex: "category_image",
        key: "category_image",
        render: (value) => {
          const src = toAssetUrl(value);
          return src ? <Image src={src} alt="category-image" width={70} /> : "N/A";
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
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
    [categories]
  );

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Categories</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Search
            placeholder="Search categories"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            style={{ width: 320, height: 45, marginTop: 0 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Add Category
          </Button>
        </div>
      </div>

      {error ? <Alert type="error" message={error} showIcon style={{ marginBottom: 12 }} /> : null}

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
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingCategory ? "Update" : "Create"}
        confirmLoading={saving}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input placeholder="Enter category name" />
          </Form.Item>

          <Form.Item label="Category Icon">
            <Upload
              listType="picture"
              fileList={iconFileList}
              beforeUpload={() => false}
              maxCount={1}
              onChange={({ fileList }) => setIconFileList(fileList)}
            >
              <Button>Select Icon</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Category Image">
            <Upload
              listType="picture"
              fileList={imageFileList}
              beforeUpload={() => false}
              maxCount={1}
              onChange={({ fileList }) => setImageFileList(fileList)}
            >
              <Button>Select Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Categories;
