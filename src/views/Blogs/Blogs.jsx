import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Switch,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import Search from "../../Components/Product/Search";
import {
  createAdminBlog,
  deleteAdminBlog,
  fetchAdminBlogs,
  updateAdminBlog,
} from "../../services/adminBlogService";

const { TextArea } = Input;

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

function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [featureImageFileList, setFeatureImageFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    let mounted = true;

    const loadBlogs = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminBlogs({
          per_page: pageSize,
          page,
          ...(search.trim() ? { search: search.trim() } : {}),
        });

        if (!mounted) {
          return;
        }

        setBlogs(Array.isArray(response?.data) ? response.data : []);
        setTotal(Number(response?.total || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load blogs."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadBlogs();

    return () => {
      mounted = false;
    };
  }, [page, pageSize, search, reloadKey]);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
    setFeatureImageFileList([]);
    form.resetFields();
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setFeatureImageFileList([]);
    form.setFieldsValue({
      title: "",
      body: "",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingBlog(record);
    form.setFieldsValue({
      title: record.title || "",
      body: record.body || "",
      is_published: Boolean(record.is_published),
    });

    setFeatureImageFileList(
      record.feature_image
        ? [
            {
              uid: "existing-feature-image",
              name: "Current Feature Image",
              status: "done",
              url: toAssetUrl(record.feature_image),
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

      payload.append("title", values.title);
      payload.append("body", values.body);
      payload.append("is_published", values.is_published ? "1" : "0");

      const imageFile = featureImageFileList?.[0]?.originFileObj;
      if (imageFile) {
        payload.append("feature_image", imageFile);
      } else if (editingBlog?.feature_image) {
        payload.append("feature_image_path", editingBlog.feature_image);
      }

      setSaving(true);

      if (editingBlog?.id) {
        await updateAdminBlog(editingBlog.id, payload);
        message.success("Blog updated successfully.");
      } else {
        await createAdminBlog(payload);
        message.success("Blog created successfully.");
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
          "Failed to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record) => {
    const shouldDelete = window.confirm(`Delete blog \"${record?.title || ""}\"?`);
    if (!shouldDelete) {
      return;
    }

    try {
      await deleteAdminBlog(record.id);
      message.success("Blog deleted successfully.");

      if (blogs.length === 1 && page > 1) {
        setPage((current) => current - 1);
      } else {
        setReloadKey((current) => current + 1);
      }
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete blog."
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Feature Image",
        dataIndex: "feature_image",
        key: "feature_image",
        render: (value) => {
          const src = toAssetUrl(value);
          return src ? <Image src={src} alt="feature-image" width={72} /> : "N/A";
        },
      },
      {
        title: "Published",
        dataIndex: "is_published",
        key: "is_published",
        render: (value) =>
          value ? <Tag color="green">Published</Tag> : <Tag color="gold">Draft</Tag>,
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={() => {
                if (!record?.id) {
                  message.error("Blog ID is missing.");
                  return;
                }
                navigate(`/blogs/${record.id}`, { state: { blog: record } });
              }}
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
    [blogs]
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
        <h2 style={{ margin: 0 }}>Blogs</h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Search
            placeholder="Search blogs"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            style={{ width: 320, height: 45, marginTop: 0 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Add Blog
          </Button>
        </div>
      </div>

      {error ? <Alert type="error" message={error} showIcon style={{ marginBottom: 12 }} /> : null}

      <Table
        rowKey="id"
        loading={loading}
        dataSource={blogs}
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
        title={editingBlog ? "Edit Blog" : "Add Blog"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingBlog ? "Update" : "Create"}
        confirmLoading={saving}
        width={700}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: "Body is required" }]}
          >
            <TextArea rows={7} placeholder="Enter blog content" />
          </Form.Item>

          <Form.Item name="is_published" label="Published" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Feature Image">
            <Upload
              listType="picture"
              fileList={featureImageFileList}
              beforeUpload={() => false}
              maxCount={1}
              onChange={({ fileList }) => setFeatureImageFileList(fileList)}
            >
              <Button>Select Feature Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Blogs;
