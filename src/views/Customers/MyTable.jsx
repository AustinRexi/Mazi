import { Table, Tag, Avatar, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMemo, useState, useEffect } from "react";

const menu = (
  record,
  activeTabKey,
  {
    onStoreView,
    onStoreApprove,
    onStoreSuspend,
    onStoreDelete,
    onUserDelete,
  }
) => (
  <Menu>
    {activeTabKey === "store" ? (
      <>
        <Menu.Item key="1" onClick={() => onStoreView?.(record)}>
          View
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onStoreApprove?.(record)}>
          Approve
        </Menu.Item>
        <Menu.Item key="3" onClick={() => onStoreSuspend?.(record)}>
          Suspend
        </Menu.Item>
        <Menu.Item key="4" onClick={() => onStoreDelete?.(record)}>
          Delete
        </Menu.Item>
      </>
    ) : (
      <Menu.Item key="1" onClick={() => onUserDelete?.(record)}>
        Delete
      </Menu.Item>
    )}
  </Menu>
);

const cellStyle = {
  fontFamily: "NeueHaasDisplayRoman",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "24px",
};

const MyTable = ({
  data,
  activeTabKey,
  loading = false,
  pagination = false,
  onTableChange,
  onStoreView,
  onStoreApprove,
  onStoreSuspend,
  onStoreDelete,
  onUserDelete,
}) => {
  const getInitials = (value) => {
    const title = String(value || "").trim();
    if (!title) {
      return "NA";
    }
    const parts = title.split(/\s+/).filter(Boolean);
    return parts
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("");
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleColumns = useMemo(() => {
    const columns = [
      {
        title: "NAME",
        dataIndex: "name",
        key: "name",
        render: (name) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={name?.icon || undefined}
              style={{ marginRight: 8, backgroundColor: name?.icon ? undefined : "#00B2A9" }}
            >
              {name?.icon ? null : getInitials(name?.title)}
            </Avatar>
            <span style={cellStyle}>{name.title}</span>
          </div>
        ),
        sorter: (a, b) => a.name.title.localeCompare(b.name.title),
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        onCell: () => ({
          style: {
            ...cellStyle,
            fontSize: isMobile ? 14 : 16,
            whiteSpace: "nowrap",
          },
        }),
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      ...(activeTabKey === "user"
        ? [
            {
              title: "PHONE",
              dataIndex: "phone",
              key: "phone",
              onCell: () => ({
                style: {
                  ...cellStyle,
                  fontSize: isMobile ? 14 : 16,
                  whiteSpace: "nowrap",
                },
              }),
              sorter: (a, b) => a.phone.localeCompare(b.phone),
            },
            {
              title: "AMOUNT SPENT",
              dataIndex: "amountSpent",
              key: "amountSpent",
              onCell: () => ({
                style: {
                  ...cellStyle,
                  fontSize: isMobile ? 14 : 16,
                  whiteSpace: "nowrap",
                },
              }),
              sorter: (a, b) => a.amountSpent.localeCompare(b.amountSpent),
            },
            {
              title: "USER POINT",
              dataIndex: "userPoint",
              key: "userPoint",
              onCell: () => ({
                style: {
                  ...cellStyle,
                  fontSize: isMobile ? 14 : 16,
                  whiteSpace: "nowrap",
                },
              }),
              sorter: (a, b) => a.userPoint.localeCompare(b.userPoint),
            },
          ]
        : [
            {
              title: "WALLET",
              dataIndex: "wallet",
              key: "wallet",
              onCell: () => ({
                style: {
                  ...cellStyle,
                  fontSize: isMobile ? 14 : 16,
                  whiteSpace: "nowrap",
                },
              }),
            },
            {
              title: "STORE",
              dataIndex: "store",
              key: "store",
              onCell: () => ({
                style: {
                  ...cellStyle,
                  fontSize: isMobile ? 14 : 16,
                  whiteSpace: "nowrap",
                },
              }),
            },
          ]),
      {
        title: "DATE JOINED",
        dataIndex: "datejoined",
        key: "datejoined",
        onCell: () => ({
          style: {
            ...cellStyle,
            fontSize: isMobile ? 14 : 16,
            whiteSpace: "nowrap",
          },
        }),
        sorter: (a, b) => new Date(a.datejoined) - new Date(b.datejoined),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        key: "status",
        onCell: () => ({
          style: {
            ...cellStyle,
            fontSize: isMobile ? 14 : 16,
            whiteSpace: "nowrap",
          },
        }),
        render: (status) => (
          <Tag
            color="green"
            style={{ borderRadius: "12px", padding: "2px 8px" }}
          >
            {status}
          </Tag>
        ),
        sorter: (a, b) => a.status.localeCompare(b.status),
      },
      {
        title: "",
        key: "action",
        onCell: () => ({
          style: {
            ...cellStyle,
            fontSize: isMobile ? 14 : 16,
            whiteSpace: "nowrap",
          },
        }),
        render: (text, record) => (
          <Dropdown
            overlay={menu(record, activeTabKey, {
              onStoreView,
              onStoreApprove,
              onStoreSuspend,
              onStoreDelete,
              onUserDelete,
            })}
            trigger={["click"]}
          >
            <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          </Dropdown>
        ),
      },
    ];
    return columns;
  }, [
    activeTabKey,
    isMobile,
    onStoreView,
    onStoreApprove,
    onStoreSuspend,
    onStoreDelete,
    onUserDelete,
  ]);

  const tableContainerStyle = {
    padding: isMobile ? 10 : 20,
    width: "100%",
    overflowX: "auto",
  };

  const tableStyle = {
    minWidth: isMobile ? "800px" : "100%",
    width: isMobile ? "auto" : "100%",
  };

  return (
    <div style={tableContainerStyle}>
      <Table
        dataSource={data}
        columns={visibleColumns}
        loading={loading}
        pagination={pagination}
        onChange={onTableChange}
        rowSelection={{
          type: "checkbox",
        }}
        style={tableStyle}
      />
    </div>
  );
};

export default MyTable;
