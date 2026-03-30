import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  Typography,
  Tag,
} from "antd";
import {
  AppstoreOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { formatVendorMoney, useVendorCurrencyCode } from "../utils/currency";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

const { Title, Text } = Typography;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

const normalizeDrink = (drink, fallbackRestaurant = null) => ({
  id: `drink-${drink.id}`,
  resourceId: drink.id,
  name: drink.drink_name || "Unnamed Drink",
  price: Number(drink.drink_price || 0),
  stock: Number(drink.no_in_stock || 0),
  restaurantId: drink.restaurant_id || drink.restaurant?.id || fallbackRestaurant?.id || null,
  restaurantName:
    drink.restaurant?.restaurant_name ||
    drink.restaurant?.name ||
    fallbackRestaurant?.restaurant_name ||
    fallbackRestaurant?.name ||
    "-",
  createdAt: drink.created_at || "",
});

const getStockStatusTag = (stock) => {
  const qty = Number(stock || 0);
  if (qty === 0) {
    return <Tag color="red">Out of Stock</Tag>;
  }
  if (qty < 20) {
    return <Tag color="orange">Low Stock</Tag>;
  }
  return <Tag color="green">In Stock</Tag>;
};

function VendorDrinks() {
  const currencyCode = useVendorCurrencyCode();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [drinks, setDrinks] = useState([]);
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [defaultRestaurantId, setDefaultRestaurantId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() =>
    getVendorRestaurantScope()
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDrink, setEditingDrink] = useState(null);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const fetchDrinks = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to log in as a vendor to view drinks.");
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };

    try {
      setLoading(true);
      setError("");

      const restaurantsResponse = await axios.get(
        `${API_BASE_URL}/vendor/restaurants?limit=100`,
        config
      );
      const restaurantRows = restaurantsResponse.data?.data || [];
      setRestaurants(restaurantRows);
      setDefaultRestaurantId(restaurantRows[0]?.id || null);
      setSelectedRestaurantId((current) => {
        const nextValue = current || restaurantRows[0]?.id || null;
        if (nextValue) {
          setVendorRestaurantScope(nextValue);
        }
        return nextValue;
      });

      try {
        const drinksResponse = await axios.get(
          `${API_BASE_URL}/vendor/drinks?limit=100`,
          config
        );
        const drinkRows = drinksResponse.data?.data || [];
        setDrinks(drinkRows.map((row) => normalizeDrink(row)));
      } catch {
        const fallback = restaurantRows.flatMap((restaurant) =>
          (restaurant.drinks || []).map((drink) =>
            normalizeDrink(drink, restaurant)
          )
        );
        setDrinks(fallback);
      }
    } catch (fetchError) {
      setError(fetchError.response?.data?.message || "Failed to load drinks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrinks();
  }, [fetchDrinks]);

  const handleCreateDrink = async (values) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    const restaurantId = values.restaurantId || selectedRestaurantId || defaultRestaurantId;
    if (!restaurantId) {
      message.error("Restaurant is required.");
      return;
    }

    try {
      setCreating(true);
      await axios.post(
        `${API_BASE_URL}/vendor/drinks`,
        {
          drink_name: values.name,
          drink_price: Number(values.price),
          no_in_stock: Number(values.stock || 0),
          restaurant_id: Number(restaurantId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      message.success("Drink added successfully.");
      setIsAddModalOpen(false);
      form.resetFields();
      await fetchDrinks();
    } catch (createError) {
      message.error(
        createError.response?.data?.message || "Failed to add drink."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleOpenEdit = (record) => {
    setEditingDrink(record);
    editForm.setFieldsValue({
      name: record.name,
      price: Number(record.price || 0),
      stock: Number(record.stock || 0),
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateDrink = async (values) => {
    if (!editingDrink) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    try {
      setUpdating(true);
      await axios.patch(
        `${API_BASE_URL}/vendor/drinks/${editingDrink.resourceId}`,
        {
          drink_name: values.name,
          drink_price: Number(values.price),
          no_in_stock: Number(values.stock || 0),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      message.success("Drink updated successfully.");
      setIsEditModalOpen(false);
      setEditingDrink(null);
      editForm.resetFields();
      await fetchDrinks();
    } catch (updateError) {
      message.error(
        updateError.response?.data?.message || "Failed to update drink."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteDrink = (record) => {
    Modal.confirm({
      title: "Delete drink?",
      content: `${record.name} will be permanently removed.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        const token = localStorage.getItem("token");
        if (!token) {
          message.error("You need to log in as a vendor.");
          return;
        }
        try {
          setDeletingId(record.resourceId);
          await axios.delete(`${API_BASE_URL}/vendor/drinks/${record.resourceId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          message.success("Drink deleted successfully.");
          await fetchDrinks();
        } catch (deleteError) {
          message.error(
            deleteError.response?.data?.message || "Failed to delete drink."
          );
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const columns = [
    {
      title: "Drink",
      dataIndex: "name",
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => formatVendorMoney(price, currencyCode),
    },
    {
      title: "In Stock",
      dataIndex: "stock",
    },
    {
      title: "Stock Status",
      dataIndex: "stock",
      render: (stock) => getStockStatusTag(stock),
    },
    {
      title: "Restaurant",
      dataIndex: "restaurantName",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (value) =>
        value
          ? new Date(value).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "-",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            loading={deletingId === record.resourceId}
            onClick={() => handleDeleteDrink(record)}
          />
        </Space>
      ),
    },
  ];

  const restaurantDrinks = useMemo(
    () =>
      drinks.filter(
        (drink) =>
          !selectedRestaurantId ||
          Number(drink.restaurantId) === Number(selectedRestaurantId)
      ),
    [drinks, selectedRestaurantId]
  );

  const totalDrinks = restaurantDrinks.length;
  const totalValue = restaurantDrinks.reduce(
    (sum, drink) => sum + Number(drink.price || 0) * Number(drink.stock || 0),
    0
  );
  const lowStockCount = restaurantDrinks.filter(
    (drink) => Number(drink.stock || 0) > 0 && Number(drink.stock || 0) < 20
  ).length;
  const outOfStockCount = restaurantDrinks.filter(
    (drink) => Number(drink.stock || 0) === 0
  ).length;
  const filteredDrinks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return restaurantDrinks.filter((drink) => {
      if (!query) {
        return true;
      }
      return String(drink.name || "").toLowerCase().includes(query);
    });
  }, [restaurantDrinks, search]);

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space direction="vertical">
              <Space align="center">
                <AppstoreOutlined style={{ color: "#1890ff" }} />
                <Text>Total Drinks</Text>
              </Space>
              <Title level={3}>{totalDrinks}</Title>
              <Text type="secondary">All drinks</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space direction="vertical">
              <Space align="center">
                <DollarOutlined style={{ color: "#52c41a" }} />
                <Text>Total Value</Text>
              </Space>
              <Title level={3}>{formatVendorMoney(totalValue, currencyCode)}</Title>
              <Text type="secondary">Inventory value</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space direction="vertical">
              <Space align="center">
                <WarningOutlined style={{ color: "#faad14" }} />
                <Text>Low Stock</Text>
              </Space>
              <Title level={3}>{lowStockCount}</Title>
              <Text type="secondary">Need restock</Text>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Space direction="vertical">
              <Space align="center">
                <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
                <Text>Out of Stock</Text>
              </Space>
              <Title level={3}>{outOfStockCount}</Title>
              <Text type="secondary">Unavailable</Text>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        title={<Title level={4} style={{ margin: 0 }}>Drinks</Title>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            Add Drink
          </Button>
        }
      >
        {error ? (
          <Alert
            type="error"
            showIcon
            message={error}
            style={{ marginBottom: 16 }}
          />
        ) : null}

        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search drinks by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ marginBottom: 16, maxWidth: 360 }}
        />

        <Spin spinning={loading}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredDrinks}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </Card>

      <Modal
        open={isAddModalOpen}
        title="Add Drink"
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateDrink}>
          <Form.Item
            label="Drink Name"
            name="name"
            rules={[{ required: true, message: "Enter drink name" }]}
          >
            <Input placeholder="Enter drink name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock"
            rules={[{ required: true, message: "Enter stock quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={creating}>
              Save Drink
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        open={isEditModalOpen}
        title="Edit Drink"
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateDrink}>
          <Form.Item
            label="Drink Name"
            name="name"
            rules={[{ required: true, message: "Enter drink name" }]}
          >
            <Input placeholder="Enter drink name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter price" }]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock"
            rules={[{ required: true, message: "Enter stock quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={updating}>
              Save Changes
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

export default VendorDrinks;
