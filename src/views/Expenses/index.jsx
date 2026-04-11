import { useEffect, useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  createAdminExpense,
  deleteAdminExpense,
  fetchAdminExpenseById,
  fetchAdminExpenses,
  updateAdminExpense,
} from "../../services/adminExpenseService";
import { convertAdminCurrency } from "../../services/adminCurrencyService";
import { fetchAdminCountries } from "../../services/adminStoreService";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "../../utils/adminCountryScope";
import {
  formatAdminMoney,
  getCurrencyCodeForCountry,
  useAdminCountryCurrency,
} from "../../utils/adminCurrency";

const EXPENSE_CURRENCY_OPTIONS = [
  { label: "$ USD", value: "USD" },
  { label: "₦ NGN", value: "NGN" },
  { label: "R ZAR", value: "ZAR" },
];

const convertUsdAmount = async (amount, toCurrencyCode) => {
  const normalizedTarget = String(toCurrencyCode || "USD").toUpperCase();
  const numericAmount = Number(amount || 0);

  if (normalizedTarget === "USD") {
    return numericAmount;
  }

  try {
    const converted = await convertAdminCurrency({
      amount: numericAmount,
      from: "USD",
      to: normalizedTarget,
    });
    return Number(converted?.amount || 0);
  } catch (_) {
    const converted = await convertAdminCurrency({
      amount: numericAmount,
      from: "USD",
      to: normalizedTarget,
    });
    return Number(converted?.amount || 0);
  }
};

const ExpensePage = () => {
  const { country: scopedCountry } = useAdminCountryCurrency();
  const [expenses, setExpenses] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [convertedAmounts, setConvertedAmounts] = useState({});
  const [totalSpentCurrency, setTotalSpentCurrency] = useState("NGN");
  const [selectedCountry, setSelectedCountry] = useState(() =>
    getAdminCountryScope()
  );
  const [form] = Form.useForm();

  useEffect(() => {
    setSelectedCountry(scopedCountry || getAdminCountryScope());
  }, [scopedCountry]);

  useEffect(() => {
    const handleCountryChange = (event) => {
      setSelectedCountry(event.detail?.country || getAdminCountryScope());
    };

    window.addEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
    return () =>
      window.removeEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadCountries = async () => {
      try {
        const countries = await fetchAdminCountries();
        if (!mounted) {
          return;
        }

        const nextOptions = Array.from(
          new Set([getAdminCountryScope(), ...countries.filter(Boolean)])
        );
        setCountryOptions(nextOptions);
      } catch (_) {
        if (mounted) {
          setCountryOptions([getAdminCountryScope()]);
        }
      }
    };

    loadCountries();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadExpenses = async () => {
      setLoading(true);

      try {
        const response = await fetchAdminExpenses({
          q: search.trim() || undefined,
          page,
          per_page: pageSize,
          country: selectedCountry || undefined,
        });

        if (!mounted) {
          return;
        }

        const rows = Array.isArray(response?.data) ? response.data : [];
        setExpenses(rows);
        setTotal(Number(response?.total || rows.length || 0));
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        message.error(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load expenses."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadExpenses();

    return () => {
      mounted = false;
    };
  }, [page, pageSize, reloadKey, search, selectedCountry]);

  useEffect(() => {
    const tableCurrencyCode = getCurrencyCodeForCountry(selectedCountry);
    setTotalSpentCurrency(tableCurrencyCode);
  }, [selectedCountry]);

  useEffect(() => {
    let mounted = true;

    const loadConvertedAmounts = async () => {
      if (!expenses.length) {
        setConvertedAmounts({});
        return;
      }

      try {
        const entries = await Promise.all(
          expenses.map(async (expense) => {
            const targetCurrency = getCurrencyCodeForCountry(expense?.country);
            const amount = Number(expense?.amount || 0);

            try {
              const convertedAmount = await convertUsdAmount(amount, targetCurrency);
              return [expense.id, convertedAmount];
            } catch (_) {
              return [expense.id, amount];
            }
          })
        );

        if (!mounted) {
          return;
        }

        setConvertedAmounts(Object.fromEntries(entries));
      } catch (_) {
        if (!mounted) {
          return;
        }

        setConvertedAmounts({});
      }
    };

    loadConvertedAmounts();

    return () => {
      mounted = false;
    };
  }, [expenses]);

  useEffect(() => {
    const tableCurrencyCode = getCurrencyCodeForCountry(selectedCountry);
    const totalForView = expenses.reduce((sum, expense) => {
      const converted = convertedAmounts[expense?.id];
      if (Number.isFinite(converted)) {
        return sum + Number(converted);
      }

      return sum + Number(expense?.amount || 0);
    }, 0);

    setTotalSpentCurrency(tableCurrencyCode);
    setTotalSpent(totalForView);
  }, [convertedAmounts, expenses, selectedCountry]);

  const openCreateModal = () => {
    setEditingExpense(null);
    form.resetFields();
    form.setFieldsValue({
      expense_date: dayjs(),
      currency: "USD",
      country: selectedCountry || getAdminCountryScope(),
    });
    setFormModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditingExpense(record);
    form.setFieldsValue({
      title: record?.title || "",
      category: record?.category || "",
      amount: Number(record?.amount || 0),
      currency: record?.currency || "USD",
      country: record?.country || selectedCountry || getAdminCountryScope(),
      description: record?.description || "",
      expense_date: record?.expense_date ? dayjs(record.expense_date) : dayjs(),
    });
    setFormModalOpen(true);
  };

  const handleView = async (record) => {
    setViewModalOpen(true);
    setViewLoading(true);

    try {
      const response = await fetchAdminExpenseById(record.id);
      setSelectedExpense(response || record);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to load expense details."
      );
      setSelectedExpense(record);
    } finally {
      setViewLoading(false);
    }
  };

  const handleDelete = async (record) => {
    try {
      await deleteAdminExpense(record.id);
      message.success("Expense deleted successfully.");
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete expense."
      );
    }
  };

  const handleSubmit = async (values) => {
    setSaveLoading(true);

    const payload = {
      title: values.title.trim(),
      category: values.category?.trim() || "",
      amount: Number(values.amount || 0),
      currency: values.currency,
      country: values.country,
      description: values.description?.trim() || "",
      expense_date: values.expense_date.format("YYYY-MM-DD"),
    };

    try {
      if (editingExpense?.id) {
        await updateAdminExpense(editingExpense.id, payload);
        message.success("Expense updated successfully.");
      } else {
        await createAdminExpense(payload);
        message.success("Expense created successfully.");
      }

      setFormModalOpen(false);
      form.resetFields();
      setEditingExpense(null);
      setReloadKey((current) => current + 1);
    } catch (requestError) {
      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to save expense."
      );
    } finally {
      setSaveLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (value) => value || "N/A",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value) => <Tag>{value || "Uncategorized"}</Tag>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value, record) => {
        const tableRowCurrency = getCurrencyCodeForCountry(record?.country);
        return `${formatAdminMoney(
          convertedAmounts[record.id] ?? value,
          tableRowCurrency
        )} (${formatAdminMoney(value, "USD")})`;
      },
    },
    {
      title: "Date",
      dataIndex: "expense_date",
      key: "expense_date",
      render: (value) => (value ? dayjs(value).format("MMM DD, YYYY") : "N/A"),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (value) => value || "N/A",
    },
    {
      title: "Created By",
      key: "admin",
      render: (_, record) =>
        record?.admin
          ? `${record.admin.firstName || ""} ${record.admin.lastName || ""}`.trim() ||
            record.admin.email
          : "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record)}>
            View
          </Button>
          <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title={`Delete ${record?.title || "expense"}?`}
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
      ),
    },
  ];

  return (
    <div style={{ padding: 8 }}>
      <Card style={{ marginBottom: 12 }}>
        <Space wrap style={{ width: "100%", justifyContent: "space-between" }}>
          <Space wrap>
            <Input
              placeholder="Search expenses"
              prefix={<SearchOutlined />}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              style={{ width: 280 }}
            />
            <Tag color="blue">Total in view: {expenses.length}</Tag>
            <Tag color="green">
              Spent in view: {formatAdminMoney(totalSpent, totalSpentCurrency)}
            </Tag>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Add Expense
          </Button>
        </Space>
      </Card>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={expenses}
        columns={columns}
        scroll={{ x: 1100 }}
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
        title={editingExpense ? "Edit Expense" : "Add Expense"}
        open={formModalOpen}
        onCancel={() => {
          setFormModalOpen(false);
          setEditingExpense(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingExpense ? "Update" : "Create"}
        confirmLoading={saveLoading}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            expense_date: dayjs(),
            currency: "USD",
            country: selectedCountry || getAdminCountryScope(),
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Enter expense title." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Enter expense amount." }]}
          >
            <InputNumber min={0} precision={2} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Select currency." }]}
          >
            <Select options={EXPENSE_CURRENCY_OPTIONS} />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Select country." }]}
          >
            <Select
              options={countryOptions.map((country) => ({
                label: country,
                value: country,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Expense Date"
            name="expense_date"
            rules={[{ required: true, message: "Select expense date." }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Expense Details"
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
          <Descriptions.Item label="Title">
            {selectedExpense?.title || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {selectedExpense?.category || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Amount">
            {formatAdminMoney(
              convertedAmounts[selectedExpense?.id] ?? selectedExpense?.amount,
              getCurrencyCodeForCountry(selectedExpense?.country)
            )}{" "}
            ({formatAdminMoney(selectedExpense?.amount, "USD")})
          </Descriptions.Item>
          <Descriptions.Item label="Currency">
            {selectedExpense?.currency || "USD"}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {selectedExpense?.country || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Expense Date">
            {selectedExpense?.expense_date
              ? dayjs(selectedExpense.expense_date).format("MMM DD, YYYY")
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {selectedExpense?.description || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Created By">
            {selectedExpense?.admin
              ? `${selectedExpense.admin.firstName || ""} ${
                  selectedExpense.admin.lastName || ""
                }`.trim() || selectedExpense.admin.email
              : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {selectedExpense?.created_at
              ? dayjs(selectedExpense.created_at).format("MMM DD, YYYY h:mm A")
              : "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </div>
  );
};

export default ExpensePage;
