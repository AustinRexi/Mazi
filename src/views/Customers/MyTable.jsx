import { Table, Tag, Avatar, Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import { useMemo } from "react";

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

const MyTable = ({ data, activeTabKey }) => {
  const visibleColumns = useMemo(() => {
    const columns = [
      {
        title: "NAME",
        dataIndex: "name",
        key: "name",
        render: (name) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={name.icon} style={{ marginRight: 8 }} />
            <span>{name.title}</span>
          </div>
        ),
        sorter: (a, b) => a.name.title.localeCompare(b.name.title),
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },

      ...(activeTabKey === "user"
        ? [
            {
              title: "PHONE",
              dataIndex: "phone",
              key: "phone",
              sorter: (a, b) => a.phone.localeCompare(b.phone),
            },
            {
              title: "AMOUNT SPENT",
              dataIndex: "amountSpent",
              key: "amountSpent",
              sorter: (a, b) => a.amountSpent.localeCompare(b.amountSpent),
            },
          ]
        : [
            {
              title: "WALLET",
              dataIndex: "wallet",
              key: "wallet",
            },
            {
              title: "STORE",
              dataIndex: "store",
              key: "store",
            },
          ]),

      {
        title: "DATE JOINED",
        dataIndex: "datejoined",
        key: "datejoined",
        sorter: (a, b) => new Date(a.datejoined) - new Date(b.datejoined),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        key: "status",
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
        render: (text, record) => (
          <Dropdown overlay={menu(record)} trigger={["click"]}>
            <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          </Dropdown>
        ),
      },
    ];
    return columns;
  }, [activeTabKey]);

  return (
    <Table
      dataSource={data}
      columns={visibleColumns}
      pagination={false}
      rowSelection={{
        type: "checkbox",
      }}
      style={{ padding: 20 }}
    />
  );
};

export default MyTable;
