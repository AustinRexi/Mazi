import { useState } from "react";
import {
  Button,
  Input,
  Table,
  Modal,
  Form,
  Select,
  Popconfirm,
  Badge,
  Card,
  notification,
} from "antd";
import {
  SearchOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  MailOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";

// Configure notification to show in top-right
notification.config({
  placement: "topRight",
});

const ROLES = ["Admin", "Manager", "Customer", "Support"];
const STATUSES = ["Active", "Inactive"];

const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-10",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Manager",
    status: "Active",
    createdAt: "2024-02-20",
    lastLogin: "2024-03-09",
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: "Customer",
    status: "Active",
    createdAt: "2024-03-01",
    lastLogin: "2024-03-08",
  },
  {
    id: "4",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Support",
    status: "Inactive",
    createdAt: "2024-01-10",
    lastLogin: "2024-02-28",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    role: "Customer",
    status: "Active",
    createdAt: "2024-03-05",
    lastLogin: "2024-03-07",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (values) => {
    const newUser = {
      ...values,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    notification.success({
      message: "Success",
      description: "User added successfully",
    });
    form.resetFields();
  };

  const handleEditUser = (values) => {
    setUsers(
      users.map((user) =>
        user.id === editingUser.id ? { ...editingUser, ...values } : user
      )
    );
    setEditingUser(null);
    notification.success({
      message: "Success",
      description: "User updated successfully",
    });
    form.resetFields();
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    notification.success({
      message: "Success",
      description: "User deleted successfully",
    });
  };

  const getRoleBadgeStatus = (role) => {
    switch (role) {
      case "Admin":
        return "error";
      case "Manager":
        return "default";
      case "Support":
        return "processing";
      case "Customer":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusBadgeStatus = (status) => {
    return status === "Active" ? "success" : "default";
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(0, 90, 255, 0.1)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserOutlined style={{ color: "#005AFF" }} />
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div
              style={{
                fontSize: "12px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <MailOutlined style={{ fontSize: "12px" }} />
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Badge
          status={getRoleBadgeStatus(role)}
          text={
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <LockOutlined style={{ fontSize: "12px" }} />
              {role}
            </span>
          }
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Badge status={getStatusBadgeStatus(status)} text={status} />
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "Never"),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
        >
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue(record);
            }}
          />
          <Popconfirm
            title={`Delete ${record.name}`}
            description="Are you sure you want to delete this user? This action cannot be undone."
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1>User Management</h1>
          <p style={{ color: "#666" }}>
            Manage users, assign roles, and control access
          </p>
        </div>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add User
        </Button>
      </div>

      <Card style={{ marginBottom: "24px" }}>
        <div style={{ padding: "16px" }}>
          <h3>Users Overview</h3>
          <p style={{ color: "#666" }}>
            {users.length} total users •{" "}
            {users.filter((u) => u.status === "Active").length} active
          </p>
        </div>
        <div style={{ padding: "16px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <Input
              placeholder="Search users by name or email..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1 }}
            />
            <Select
              value={selectedRole}
              onChange={setSelectedRole}
              style={{ width: "180px" }}
            >
              <Select.Option value="all">All Roles</Select.Option>
              {ROLES.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Wrapper for horizontal scrolling */}
          <div
            style={{
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            <Table
              columns={columns}
              dataSource={filteredUsers}
              rowKey="id"
              pagination={false}
              scroll={{ x: 800 }} // Minimum width for table content
            />
          </div>
        </div>
      </Card>

      <Modal
        title={editingUser ? "Edit User" : "Add New User"}
        open={isAddModalOpen || !!editingUser}
        onCancel={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          onFinish={editingUser ? handleEditUser : handleAddUser}
          layout="vertical"
          initialValues={editingUser || { role: "Customer", status: "Active" }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter full name" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select>
              {ROLES.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              {STATUSES.map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingUser(null);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Save Changes" : "Add User"}
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Add CSS for responsive table scrolling */}
      <style>{`
        @media (max-width: 768px) {
          .ant-table {
            min-width: 800px; /* Ensure table doesn't shrink below this width */
          }
          .ant-table-content {
            overflow-x: auto; /* Enable horizontal scrolling */
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
