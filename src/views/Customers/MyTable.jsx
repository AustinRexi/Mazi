import { Table, Tag, Avatar, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useMemo, useState, useEffect } from "react";

const handleDelete = (record) => {
  console.log("Delete action for", record);
};

const menu = (record) => (
  <Menu>
    <Menu.Item key="1" onClick={() => handleDelete(record)}>
      Delete
    </Menu.Item>
  </Menu>
);

const cellStyle = {
  fontFamily: "NeueHaasDisplayRoman",
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "24px",
};

const MyTable = ({ data, activeTabKey }) => {
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
            <Avatar src={name.icon} style={{ marginRight: 8 }} />
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
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          </Dropdown>
        ),
      },
    ];
    return columns;
  }, [activeTabKey, isMobile]);

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
        pagination={false}
        rowSelection={{
          type: "checkbox",
        }}
        style={tableStyle}
      />
    </div>
  );
};

export default MyTable;
