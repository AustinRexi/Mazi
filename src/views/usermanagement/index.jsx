import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  StopOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  createAdminAccount,
  deleteAdminAccount,
  fetchAdminAccountById,
  fetchAdminAccounts,
  fetchAdminRoles,
  updateAdminAccountStatus,
} from "../../services/adminManagementService";

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

const formatName = (record) => {
  const first =
    record?.firstname || record?.firstName || record?.first_name || "";
  const last = record?.lastname || record?.lastName || record?.last_name || "";
  const full = `${first} ${last}`.trim();
  return full || "N/A";
};

const statusTag = (value) => {
  const status = String(value || "pending").toLowerCase();
  if (status === "approved") {
    return <Tag color="green">Approved</Tag>;
  }
  if (status === "rejected") {
    return <Tag color="red">Rejected</Tag>;
  }
  return <Tag color="gold">Pending</Tag>;
};

const formatRole = (record) => {
  if (record?.role?.name) {
    return record.role.name;
  }
  if (record?.role_id) {
    return `Role ID: ${record.role_id}`;
  }
  return "N/A";
};

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm] = Form.useForm();

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetchAdminAccounts({
          q: search.trim() || undefined,
          role_id: roleFilter !== "all" ? Number(roleFilter) : undefined,
          status: statusFilter !== "all" ? statusFilter : undefined,
          per_page: pageSize,
          page,
        });

        if (!mounted) {
          return;
        }

        const rows = Array.isArray(response?.data) ? response.data : [];
        setUsers(rows);
        setTotal(Number(response?.total || rows.length || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }
        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load users."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();
    return () => {
      mounted = false;
    };
  }, [search, page, pageSize, reloadKey, statusFilter, roleFilter]);

  useEffect(() => {
    let mounted = true;

    const loadRoles = async () => {
      try {
        const response = await fetchAdminRoles();
        if (!mounted) {
          return;
        }
        setRoles(response);
      } catch (_) {
        if (!mounted) {
          return;
        }
        setRoles([]);
      }
    };

    loadRoles();
    return () => {
      mounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const approved = users.filter(
      (item) => String(item?.status || "").toLowerCase() === "approved"
    ).length;
    const pending = users.filter(
      (item) => String(item?.status || "").toLowerCase() === "pending"
    ).length;
    const rejected = users.filter(
      (item) => String(item?.status || "").toLowerCase() === "rejected"
    ).length;
    return { approved, pending, rejected };
  }, [users]);

  const handleView = async (record) => {
    if (!record?.id) {
      message.error("User ID is missing.");
      return;
    }

    setViewModalOpen(true);
    setViewLoading(true);
    setSelectedUser(null);

    try {
      const response = await fetchAdminAccountById(record.id);
      setSelectedUser(response || record);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to load user details."
      );
      setSelectedUser(record);
    } finally {
      setViewLoading(false);
    }
  };

  const handleStatusUpdate = async (record, nextStatus) => {
    try {
      await updateAdminAccountStatus(record.id, nextStatus);
      message.success(`User ${nextStatus} successfully.`);
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to update user status."
      );
    }
  };

  const handleDelete = async (record) => {
    try {
      await deleteAdminAccount(record.id);
      message.success("User deleted successfully.");
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete user."
      );
    }
  };

  const handleCreateAdmin = async (values) => {
    setCreateLoading(true);

    try {
      await createAdminAccount({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
        role_id: Number(values.role_id),
        status: values.status,
      });
      message.success("Admin user created successfully.");
      setCreateModalOpen(false);
      createForm.resetFields();
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to create admin user."
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => formatName(record),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value) => value || "N/A",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (value) => value || "N/A",
    },
    {
      title: "Type",
      dataIndex: "usertype",
      key: "usertype",
      render: (value) => <Tag>{String(value || "N/A").toUpperCase()}</Tag>,
    },
    {
      title: "Roles",
      key: "roles",
      render: (_, record) => formatRole(record),
      sorter: (a, b) => {
        const roleA = String(a?.role?.name || a?.role_id || "").toLowerCase();
        const roleB = String(b?.role?.name || b?.role_id || "").toLowerCase();
        return roleA.localeCompare(roleB);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value) => statusTag(value),
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (value) =>
        value ? dayjs(value).format("MMM DD, YYYY h:mm A") : "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const currentStatus = String(record?.status || "").toLowerCase();
        const canApprove = currentStatus !== "approved";
        const canSuspend = currentStatus !== "rejected";

        return (
          <Space>
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
              View
            </Button>

            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              disabled={!canApprove}
              onClick={() => handleStatusUpdate(record, "approved")}
            >
              Approve
            </Button>

            <Button
              danger
              icon={<StopOutlined />}
              disabled={!canSuspend}
              onClick={() => handleStatusUpdate(record, "rejected")}
            >
              Suspend
            </Button>

            <Popconfirm
              title={`Delete ${formatName(record)}?`}
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record)}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const roleOptions = useMemo(
    () => [
      { label: "All Roles", value: "all" },
      ...roles.map((role) => ({
        label: role?.name || `Role ${role?.id}`,
        value: String(role?.id),
      })),
    ],
    [roles]
  );

  return (
    <div style={{ padding: 8 }}>
      <Card style={{ marginBottom: 12 }}>
        <Space size={24} wrap>
          <Badge status="success" text={`Approved: ${summary.approved}`} />
          <Badge status="warning" text={`Pending: ${summary.pending}`} />
          <Badge status="error" text={`Rejected: ${summary.rejected}`} />
          <span>Total in view: {users.length}</span>
        </Space>
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Space wrap style={{ width: "100%", justifyContent: "space-between" }}>
          <Space wrap>
            <Input
              placeholder="Search by name, email, phone"
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              style={{ width: 280 }}
            />

            <Select
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value);
                setPage(1);
              }}
              style={{ width: 170 }}
              options={roleOptions}
            />

            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 160 }}
              options={STATUS_OPTIONS}
            />
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
          >
            Add User
          </Button>
        </Space>
      </Card>

      {error ? (
        <Card style={{ marginBottom: 12 }}>
          <span style={{ color: "#d4380d" }}>{error}</span>
        </Card>
      ) : null}

      <Table
        rowKey="id"
        loading={loading}
        dataSource={users}
        columns={columns}
        scroll={{ x: 1200 }}
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
        title="Add Admin User"
        open={createModalOpen}
        onCancel={() => {
          setCreateModalOpen(false);
          createForm.resetFields();
        }}
        onOk={() => createForm.submit()}
        okText="Create"
        confirmLoading={createLoading}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreateAdmin}
          initialValues={{ status: "approved" }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Enter first name." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Enter last name." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Enter email address." },
              { type: "email", message: "Enter a valid email address." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Enter phone number." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Enter password." },
              { min: 6, message: "Password must be at least 6 characters." },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role_id"
            rules={[{ required: true, message: "Select a role." }]}
          >
            <Select
              options={roles.map((role) => ({
                label: role?.name || `Role ${role?.id}`,
                value: String(role?.id),
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Select a status." }]}
          >
            <Select options={STATUS_OPTIONS.filter((item) => item.value !== "all")} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="User Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        confirmLoading={viewLoading}
      >
        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="ID">{selectedUser?.id || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Name">
            {selectedUser ? formatName(selectedUser) : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{selectedUser?.email || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Phone">{selectedUser?.phone || "N/A"}</Descriptions.Item>
          <Descriptions.Item label="Admin Type">
            {selectedUser?.usertype || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {selectedUser ? statusTag(selectedUser?.status) : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Roles">
            {formatRole(selectedUser)}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {selectedUser?.created_at
              ? dayjs(selectedUser.created_at).format("MMM DD, YYYY h:mm A")
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
}

export default UserManagement;
