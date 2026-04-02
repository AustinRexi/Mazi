import { useEffect, useMemo, useState } from "react";
import { Button, DatePicker, Select, Space } from "antd";
import dayjs from "dayjs";
import Filterbutton from "../../Components/Product/Filterbutton";

const DEFAULT_FILTERS = {
  status: "all",
  sortBy: "date-desc",
  joinedDate: null,
};

const FILTER_CONFIG = {
  user: {
    statusLabel: "User Status",
    statusOptions: [
      { label: "All Statuses", value: "all" },
      { label: "Approved", value: "approved" },
      { label: "Pending", value: "pending" },
      { label: "Rejected", value: "rejected" },
      { label: "Suspended", value: "suspended" },
      { label: "Verified", value: "verified" },
    ],
    sortOptions: [
      { label: "Newest Joined", value: "date-desc" },
      { label: "Oldest Joined", value: "date-asc" },
      { label: "Name A-Z", value: "name-asc" },
      { label: "Name Z-A", value: "name-desc" },
      { label: "Email A-Z", value: "email-asc" },
      { label: "Email Z-A", value: "email-desc" },
      { label: "Highest Spend", value: "amount-desc" },
      { label: "Lowest Spend", value: "amount-asc" },
    ],
  },
  store: {
    statusLabel: "Store Status",
    statusOptions: [
      { label: "All Statuses", value: "all" },
      { label: "Approved", value: "approved" },
      { label: "Pending", value: "pending" },
      { label: "Rejected", value: "rejected" },
      { label: "Suspended", value: "suspended" },
      { label: "Verified", value: "verified" },
    ],
    sortOptions: [
      { label: "Newest Joined", value: "date-desc" },
      { label: "Oldest Joined", value: "date-asc" },
      { label: "Vendor Name A-Z", value: "name-asc" },
      { label: "Vendor Name Z-A", value: "name-desc" },
      { label: "Store A-Z", value: "store-asc" },
      { label: "Store Z-A", value: "store-desc" },
      { label: "Wallet High-Low", value: "wallet-desc" },
      { label: "Wallet Low-High", value: "wallet-asc" },
    ],
  },
};

const panelStyle = {
  width: 320,
  padding: 16,
  background: "#FFFFFF",
  borderRadius: 16,
  boxShadow: "0 12px 32px rgba(18, 21, 21, 0.12)",
};

const labelStyle = {
  display: "block",
  marginBottom: 6,
  color: "#121515",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "NeueHaasDisplayRoman",
};

function FilteredItems({
  activeTabKey = "user",
  filters = DEFAULT_FILTERS,
  onFilterApply,
  style,
}) {
  const [draftFilters, setDraftFilters] = useState(filters);

  useEffect(() => {
    setDraftFilters(filters);
  }, [filters]);

  const config = FILTER_CONFIG[activeTabKey] || FILTER_CONFIG.user;

  const overlay = useMemo(
    () => (
      <div style={panelStyle}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>{config.statusLabel}</label>
          <Select
            value={draftFilters.status}
            onChange={(value) =>
              setDraftFilters((current) => ({ ...current, status: value }))
            }
            options={config.statusOptions}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Sort By</label>
          <Select
            value={draftFilters.sortBy}
            onChange={(value) =>
              setDraftFilters((current) => ({ ...current, sortBy: value }))
            }
            options={config.sortOptions}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Joined Date</label>
          <DatePicker
            value={draftFilters.joinedDate ? dayjs(draftFilters.joinedDate) : null}
            onChange={(value) =>
              setDraftFilters((current) => ({
                ...current,
                joinedDate: value ? value.format("YYYY-MM-DD") : null,
              }))
            }
            style={{ width: "100%" }}
            allowClear
          />
        </div>

        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              setDraftFilters(DEFAULT_FILTERS);
              onFilterApply?.(DEFAULT_FILTERS);
            }}
          >
            Reset
          </Button>
          <Button type="primary" onClick={() => onFilterApply?.(draftFilters)}>
            Apply
          </Button>
        </Space>
      </div>
    ),
    [config, draftFilters, onFilterApply]
  );

  return <Filterbutton overlay={overlay} style={{ ...style }} />;
}

export default FilteredItems;
