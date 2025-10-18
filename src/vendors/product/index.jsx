import { useState } from "react";
import { Card, message } from "antd";
import ProductStatsCards from "./ProductStatsCards";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import AddProductModal from "./AddProductModal";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 149.99,
    stock: 45,
    category: "Electronics",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    sales: 156,
    created: "2024-01-15",
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    stock: 23,
    category: "Wearables",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    sales: 89,
    created: "2024-01-20",
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 99.99,
    stock: 0,
    category: "Audio",
    status: "out-of-stock",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop",
    sales: 124,
    created: "2024-02-01",
  },
  {
    id: "4",
    name: "Premium Phone Case",
    price: 39.99,
    stock: 78,
    category: "Accessories",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=100&h=100&fit=crop",
    sales: 203,
    created: "2024-02-05",
  },
  {
    id: "5",
    name: "USB-C Charging Cable",
    price: 29.99,
    stock: 156,
    category: "Accessories",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=100&h=100&fit=crop",
    sales: 145,
    created: "2024-02-10",
  },
  {
    id: "6",
    name: "Wireless Mouse",
    price: 79.99,
    stock: 12,
    category: "Electronics",
    status: "inactive",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop",
    sales: 67,
    created: "2024-02-15",
  },
];

const VendorProduct = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    message.success("Product added successfully!");
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <ProductStatsCards products={products} />
      <Card
        title="Product Inventory"
        style={{ marginTop: 24 }}
        extra={
          <AddProductModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            onAddProduct={handleAddProduct}
          />
        }
      >
        <ProductFilters
          search={search}
          setSearch={setSearch}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <ProductTable products={filteredProducts} />
      </Card>
    </div>
  );
};

export default VendorProduct;
