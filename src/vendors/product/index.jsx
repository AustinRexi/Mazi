import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Alert, Button, Card, Form, InputNumber, List, message, Modal, Spin, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import ProductStatsCards from "./ProductStatsCards";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProductModal";
import {
  getVendorRestaurantScope,
  setVendorRestaurantScope,
} from "../utils/restaurantScope";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, "");

const normalizeImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://via.placeholder.com/100x100.png?text=No+Image";
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return `${STORAGE_BASE_URL}/storage/${String(imagePath).replace(/^\/+/, "")}`;
};

const normalizeFood = (food) => {
  const foodImagePaths = [
    food.food_images || food.food_image,
    food.food_images2 || food.food_image2,
    food.food_images3 || food.food_image3,
  ].filter(Boolean);

  return {
    id: `food-${food.id}`,
    resourceId: food.id,
    resourceType: "food",
    restaurantId: food.restaurant_id || food.restaurant?.id || null,
    categoryId: food.category_id || food.category?.id || null,
    name: food.food_name || food.name || "Unnamed Food",
    price: Number(food.food_price || 0),
    stock: null,
    category: food.category?.category_name || "Food",
    status: food.stock_status === "out_of_stock" ? "out-of-stock" : "in_stock",
    image: normalizeImageUrl(foodImagePaths[0]),
    images: foodImagePaths.map((path) => normalizeImageUrl(path)),
    sales: 0,
    created: food.created_at || "",
    description: food.food_description || "",
    restaurant: food.restaurant?.restaurant_name || food.restaurant?.name || "",
  };
};

const normalizeGrocery = (grocery) => ({
  id: `grocery-${grocery.id}`,
  resourceId: grocery.id,
  resourceType: "grocery",
  restaurantId: grocery.restaurant_id || grocery.restaurant?.id || null,
  categoryId: grocery.category_id || grocery.category?.id || null,
  name: grocery.groceries_name || "Unnamed Grocery",
  price: Number(grocery.groceries_price || 0),
  stock: Number(grocery.no_in_stock || 0),
  category: grocery.category?.category_name || "Groceries",
  status:
    Number(grocery.no_in_stock || 0) === 0 ? "out-of-stock" : "active",
  image: normalizeImageUrl(grocery.groceries_images),
  images: [normalizeImageUrl(grocery.groceries_images)],
  sales: 0,
  created: grocery.created_at || "",
  description: grocery.groceries_description || "",
  restaurant: grocery.restaurant?.restaurant_name || grocery.restaurant?.name || "",
});

const normalizeProductNameKey = (value) =>
  String(value || "").trim().toLowerCase();

const inferOrderItemType = (item, groupType = "") => {
  const explicit = String(item.product_type || item.type || groupType || "")
    .trim()
    .toLowerCase();

  if (explicit.includes("food")) {
    return "food";
  }
  if (explicit.includes("grocery")) {
    return "grocery";
  }
  if (explicit.includes("drink")) {
    return "drink";
  }

  if (item.food_id || item.food_name || item.food_price) {
    return "food";
  }
  if (item.grocery_id || item.groceries_id || item.groceries_name || item.groceries_price) {
    return "grocery";
  }
  if (item.drink_id || item.drink_name || item.drink_price) {
    return "drink";
  }

  return "";
};

const getOrderItemProductId = (item) =>
  item.food_id ||
  item.grocery_id ||
  item.groceries_id ||
  item.drink_id ||
  (String(item.product_type || "").toLowerCase().includes("food") ? item.product_id : null) ||
  (String(item.product_type || "").toLowerCase().includes("grocery") ? item.product_id : null) ||
  (String(item.product_type || "").toLowerCase().includes("drink") ? item.product_id : null) ||
  null;

const getOrderItemName = (item) =>
  item.name ||
  item.product_name ||
  item.food_name ||
  item.groceries_name ||
  item.drink_name ||
  "";

const parseOrderItemsForSales = (orderProduct) => {
  if (!orderProduct) {
    return [];
  }

  const addItems = (items, groupType = "") =>
    (Array.isArray(items) ? items : []).map((item) => ({
      productType: inferOrderItemType(item, groupType),
      productId: getOrderItemProductId(item),
      name: getOrderItemName(item),
      quantity: Number(item.quantity || item.qty || 1),
    }));

  if (Array.isArray(orderProduct)) {
    return addItems(orderProduct);
  }

  if (typeof orderProduct !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(orderProduct);
    if (Array.isArray(parsed)) {
      return addItems(parsed);
    }

    return [
      ...addItems(parsed.foods, "food"),
      ...addItems(parsed.groceries, "grocery"),
      ...addItems(parsed.drinks, "drink"),
    ];
  } catch {
    return [];
  }
};

const buildSalesIndex = (orders = []) => {
  const salesByTypedId = new Map();
  const salesByTypedName = new Map();

  orders.forEach((order) => {
    const orderStatus = String(order.order_status || "").toLowerCase();
    if (orderStatus === "cancelled") {
      return;
    }

    const items = parseOrderItemsForSales(order.order_product);
    items.forEach((item) => {
      const qty = Number(item.quantity || 0);
      if (!Number.isFinite(qty) || qty <= 0) {
        return;
      }

      const typeKey = String(item.productType || "").toLowerCase();
      const idKey = item.productId != null ? String(item.productId) : "";
      const nameKey = normalizeProductNameKey(item.name);

      if (typeKey && idKey) {
        const typedIdKey = `${typeKey}:${idKey}`;
        salesByTypedId.set(typedIdKey, (salesByTypedId.get(typedIdKey) || 0) + qty);
      }

      if (typeKey && nameKey) {
        const typedNameKey = `${typeKey}:${nameKey}`;
        salesByTypedName.set(
          typedNameKey,
          (salesByTypedName.get(typedNameKey) || 0) + qty
        );
      }
    });
  });

  return { salesByTypedId, salesByTypedName };
};

const getProductSales = (product, salesIndex) => {
  const typeKey = String(product.resourceType || "").toLowerCase();
  const idKey = product.resourceId != null ? String(product.resourceId) : "";
  const nameKey = normalizeProductNameKey(product.name);

  if (typeKey && idKey) {
    const byId = salesIndex.salesByTypedId.get(`${typeKey}:${idKey}`);
    if (Number.isFinite(byId)) {
      return byId;
    }
  }

  if (typeKey && nameKey) {
    const byName = salesIndex.salesByTypedName.get(`${typeKey}:${nameKey}`);
    if (Number.isFinite(byName)) {
      return byName;
    }
  }

  return 0;
};

const resizeImageTo900x600 = (file) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 900;
        canvas.height = 600;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, 900, 600);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to resize image."));
              return;
            }

            const baseName = file.name.replace(/\.[^.]+$/, "");
            resolve(
              new File([blob], `${baseName}-900x600.jpg`, {
                type: "image/jpeg",
              })
            );
          },
          "image/jpeg",
          0.9
        );
      };
      image.onerror = () => reject(new Error("Invalid image file."));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });

const VendorProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [hasRestaurantRecord, setHasRestaurantRecord] = useState(true);
  const [showRestaurantSetupModal, setShowRestaurantSetupModal] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingProduct, setCreatingProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [defaultRestaurantId, setDefaultRestaurantId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(() =>
    getVendorRestaurantScope()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLowStockModalOpen, setIsLowStockModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockSubmitting, setRestockSubmitting] = useState(false);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockForm] = Form.useForm();

  const fetchProducts = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in as a vendor to view products.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };

      const [
        foodsResponse,
        groceriesResponse,
        restaurantsResponse,
        categoriesResponse,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/vendor/foods?limit=100`, config),
        axios.get(`${API_BASE_URL}/vendor/groceries?limit=100`, config),
        axios.get(`${API_BASE_URL}/vendor/restaurants?limit=100`, config),
        axios.get(`${API_BASE_URL}/vendor/categories?all=true`, config),
      ]);
      let orderRows = [];
      try {
        const ordersResponse = await axios.get(
          `${API_BASE_URL}/vendor/orders?limit=500`,
          config
        );
        orderRows = ordersResponse.data?.data || [];
      } catch {
        orderRows = [];
      }

      const foods = (foodsResponse.data?.data || []).map(normalizeFood);
      const groceries = (groceriesResponse.data?.data || []).map(normalizeGrocery);
      const restaurants = restaurantsResponse.data?.data || [];
      const categoryRows = categoriesResponse.data?.data || [];
      const salesIndex = buildSalesIndex(orderRows);
      const mergedProducts = [...foods, ...groceries].map((product) => ({
        ...product,
        sales: getProductSales(product, salesIndex),
      }));

      setHasRestaurantRecord(restaurants.length > 0);
      setDefaultRestaurantId(restaurants[0]?.id || null);
      setSelectedRestaurantId((current) => {
        const nextValue = current || restaurants[0]?.id || null;
        if (nextValue) {
          setVendorRestaurantScope(nextValue);
        }
        return nextValue;
      });
      setRestaurants(restaurants);
      setProducts(mergedProducts);
      setCategories(
        categoryRows
          .map((row) => ({
            id: row.id,
            name: row.category_name || row.name || "",
          }))
          .filter((row) => row.id && row.name)
      );
    } catch (fetchError) {
      setError(
        fetchError.response?.data?.message || "Failed to load vendor products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const restaurantProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          !selectedRestaurantId ||
          Number(product.restaurantId) === Number(selectedRestaurantId)
      ),
    [products, selectedRestaurantId]
  );

  const filteredProducts = restaurantProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = async (payload) => {
    const token = localStorage.getItem("token");

    if (!token) {
      message.error("You need to log in as a vendor.");
      return false;
    }

    try {
      setCreatingProduct(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      if (payload.productType === "food") {
        formData.append("food_name", payload.name);
        formData.append("food_description", payload.description || "");
        formData.append("food_price", String(payload.price));
        formData.append("stock_status", payload.stockStatus || "in_stock");
        formData.append("restaurant_id", String(payload.restaurantId));
        formData.append("category_id", String(payload.categoryId));

        const [img1, img2, img3] = payload.foodImages || [];
        if (img1) {
          formData.append("food_image", img1);
        }
        if (img2) {
          formData.append("food_image2", img2);
        }
        if (img3) {
          formData.append("food_image3", img3);
        }

        await axios.post(`${API_BASE_URL}/vendor/foods`, formData, config);
      } else {
        formData.append("groceries_name", payload.name);
        formData.append("groceries_description", payload.description || "");
        formData.append("groceries_price", String(payload.price));
        formData.append("no_in_stock", String(payload.noInStock || 0));
        formData.append("restaurant_id", String(payload.restaurantId));
        formData.append("category_id", String(payload.categoryId));

        const image = (payload.groceryImage || [])[0];
        if (image) {
          formData.append("groceries_images", image);
        }

        await axios.post(`${API_BASE_URL}/vendor/groceries`, formData, config);
      }

      await fetchProducts();
      message.success("Product added successfully.");
      return true;
    } catch (createError) {
      const validationErrors = createError.response?.data?.errors;
      if (validationErrors && typeof validationErrors === "object") {
        const firstError = Object.values(validationErrors)[0];
        message.error(Array.isArray(firstError) ? firstError[0] : "Validation failed.");
      } else {
        message.error(
          createError.response?.data?.message || "Failed to add product."
        );
      }
      return false;
    } finally {
      setCreatingProduct(false);
    }
  };

  const handleDeleteProduct = (product) => {
    setProducts((current) => current.filter((item) => item.id !== product.id));
    message.success("Product removed from the list.");
  };

  const handleEditProduct = async (product, values) => {
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("You need to log in as a vendor.");
      return false;
    }

    try {
      const authHeaders = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const multipartConfig = {
        headers: {
          ...authHeaders,
          "Content-Type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("_method", "PATCH");

      if (product.resourceType === "food") {
        formData.append("food_name", values.name);
        formData.append("food_description", values.description || "");
        formData.append("food_price", String(Number(values.price)));
        formData.append(
          "stock_status",
          values.status === "out-of-stock" ? "out_of_stock" : "in_stock"
        );
        formData.append("category_id", String(values.categoryId || product.categoryId));

        const resizedFoodImages = await Promise.all(
          (values.foodImages || [])
            .map((entry) => entry?.originFileObj)
            .filter(Boolean)
            .map((file) => resizeImageTo900x600(file))
        );

        const [img1, img2, img3] = resizedFoodImages;
        if (img1) {
          formData.append("food_images", img1);
        }
        if (img2) {
          formData.append("food_image2", img2);
        }
        if (img3) {
          formData.append("food_image3", img3);
        }

        await axios.post(
          `${API_BASE_URL}/vendor/foods/${product.resourceId}`,
          formData,
          multipartConfig
        );
      } else {
        const groceryPayload = {
          groceries_name: values.name,
          groceries_description: values.description || "",
          groceries_price: Number(values.price),
          no_in_stock: Number(values.stock || 0),
          category_id: Number(values.categoryId || product.categoryId),
          restaurant_id: Number(product.restaurantId || 0) || undefined,
        };

        const groceryImage = values.groceryImage?.[0]?.originFileObj;
        if (groceryImage) {
          formData.append("groceries_name", values.name);
          formData.append("groceries_description", values.description || "");
          formData.append("groceries_price", String(Number(values.price)));
          formData.append("no_in_stock", String(Number(values.stock || 0)));
          formData.append("category_id", String(values.categoryId || product.categoryId));
          if (product.restaurantId) {
            formData.append("restaurant_id", String(product.restaurantId));
          }
          const resizedImage = await resizeImageTo900x600(groceryImage);
          formData.append("groceries_images", resizedImage);
          await axios.post(
            `${API_BASE_URL}/vendor/groceries/${product.resourceId}`,
            formData,
            multipartConfig
          );
        } else {
          await axios.patch(
            `${API_BASE_URL}/vendor/groceries/${product.resourceId}`,
            groceryPayload,
            { headers: authHeaders }
          );
        }
      }

      await fetchProducts();
      message.success("Product updated successfully.");
      return true;
    } catch (updateError) {
      const validationErrors = updateError.response?.data?.errors;
      if (validationErrors && typeof validationErrors === "object") {
        const firstError = Object.values(validationErrors)[0];
        message.error(Array.isArray(firstError) ? firstError[0] : "Validation failed.");
      } else {
        message.error(
          updateError.response?.data?.message || "Failed to update product."
        );
      }
      return false;
    }
  };

  const handleRequestOpenAddProduct = () => {
    if (!hasRestaurantRecord) {
      setShowRestaurantSetupModal(true);
      return false;
    }

    return true;
  };

  const handleOpenRestock = (product) => {
    setRestockProduct(product);
    restockForm.setFieldsValue({
      stock: Number(product.stock || 0),
    });
    setIsRestockModalOpen(true);
  };

  const handleSubmitRestock = async (values) => {
    if (!restockProduct) {
      return;
    }

    setRestockSubmitting(true);
    const ok = await handleEditProduct(restockProduct, {
      name: restockProduct.name,
      description: restockProduct.description || "",
      price: Number(restockProduct.price || 0),
      stock: Number(values.stock || 0),
      categoryId: restockProduct.categoryId,
    });
    setRestockSubmitting(false);

    if (ok) {
      setIsRestockModalOpen(false);
      setRestockProduct(null);
      restockForm.resetFields();
    }
  };

  const categoryFilterOptions = useMemo(() => {
    const namesFromProducts = restaurantProducts
      .map((item) => item.category)
      .filter(Boolean);
    const namesFromBackend = categories.map((item) => item.name);
    return Array.from(new Set([...namesFromBackend, ...namesFromProducts]));
  }, [categories, restaurantProducts]);

  const lowStockProducts = useMemo(
    () =>
      restaurantProducts.filter(
        (product) =>
          product.resourceType === "grocery" &&
          Number(product.stock || 0) > 0 &&
          Number(product.stock || 0) < 20
      ),
    [restaurantProducts]
  );

  return (
    <div style={{ padding: 24 }}>
      <ProductStatsCards
        products={restaurantProducts}
        onOpenLowStock={() => setIsLowStockModalOpen(true)}
      />
      <Card
        title="Product Inventory"
        style={{ marginTop: 24 }}
        extra={
          <AddProductModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onAddProduct={handleAddProduct}
            onRequestOpen={handleRequestOpenAddProduct}
            categories={categories}
            defaultRestaurantId={selectedRestaurantId || defaultRestaurantId}
            submitting={creatingProduct}
          />
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
        <ProductFilters
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categories={categoryFilterOptions}
        />
        <Spin spinning={loading}>
          <ProductTable
            products={filteredProducts}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
            categories={categories}
          />
        </Spin>
      </Card>

      <Modal
        open={showRestaurantSetupModal}
        closable={false}
        maskClosable={false}
        footer={null}
        title="Complete your store setup"
      >
        <p style={{ marginBottom: 16 }}>
          You do not have a restaurant record yet. Set up your restaurant in
          Settings before adding products.
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={() => setShowRestaurantSetupModal(false)}>Later</Button>
          <Button
            type="primary"
            onClick={() => {
              setShowRestaurantSetupModal(false);
              navigate("/vendors/settings");
            }}
          >
            Go to Settings
          </Button>
        </div>
      </Modal>

      <Modal
        open={isLowStockModalOpen}
        title={`Low Stock Products (${lowStockProducts.length})`}
        onCancel={() => setIsLowStockModalOpen(false)}
        footer={null}
      >
        <List
          locale={{ emptyText: "No low-stock products" }}
          dataSource={lowStockProducts}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key={`restock-${item.id}`}
                  type="primary"
                  size="small"
                  onClick={() => {
                    setIsLowStockModalOpen(false);
                    handleOpenRestock(item);
                  }}
                >
                  Edit/Increase Stock
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.name}
                description={
                  <>
                    <Tag color="orange">Stock: {item.stock}</Tag>
                    <Tag>{item.category}</Tag>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      <Modal
        open={isRestockModalOpen}
        title={restockProduct ? `Increase Stock - ${restockProduct.name}` : "Increase Stock"}
        onCancel={() => setIsRestockModalOpen(false)}
        footer={null}
      >
        <Form form={restockForm} layout="vertical" onFinish={handleSubmitRestock}>
          <Form.Item
            label="New Stock Quantity"
            name="stock"
            rules={[{ required: true, message: "Enter stock quantity" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={() => setIsRestockModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={restockSubmitting}>
              Save Stock
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorProduct;
