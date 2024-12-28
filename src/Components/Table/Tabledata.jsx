import { Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import OptionDetails from "../../views/Product/OptionDetails";

const Tabledata = (props) => {
  const handleMoreClick = (product) => {
    props.setActiveProduct(product);
  };

  // Define the common cell style
  const cellStyle = {
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "24px",
    fontFamily: "NeueHaasDisplayRoman",
  };

  const columns = [
    {
      title: "ITEMS",
      dataIndex: "items",
      render: (items) => (
        <span
          style={{
            display: "flex",
            gap: "8px",
            width: "256px",
            height: "70px",
          }}
        >
          <img
            src={items.icon}
            alt="icon"
            style={{
              width: "90px",
              marginRight: "4px",
              height: "75px",
              borderRadius: "6px",
            }}
          />
          <div style={{ ...cellStyle, fontSize: "16px", marginTop: "14px" }}>
            {items.description}
          </div>
        </span>
      ),
      sorter: (a, b) => a.items.description.localeCompare(b.items.description),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "RATING",
      dataIndex: "rating",
      render: (rating) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          <img
            src={rating.icon}
            alt="star icon"
            style={{ width: "16px", height: "16px", marginRight: "4px" }}
          />
          <div style={cellStyle}>{rating.ratings}</div>
        </span>
      ),
      sorter: (a, b) => a.rating.ratings.localeCompare(b.rating.ratings),
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "STORE",
      dataIndex: "store",
      render: (store) => <div style={cellStyle}>{store}</div>,
      sorter: (a, b) => a.store - b.store,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "SUB CATEGORY",
      dataIndex: "subcategory",
      render: (subcategory) => <div style={cellStyle}>{subcategory}</div>,
      sorter: (a, b) => a.subcategory - b.subcategory,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateadded",
      render: (dateadded) => <div style={cellStyle}>{dateadded}</div>,
      sorter: (a, b) => a.dateadded - b.dateadded,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      render: (quantity) => <div style={cellStyle}>{quantity}</div>,
      sorter: (a, b) => a.quantity - b.quantity,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
          width: "80px",
        },
      }),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (amount) => <div style={cellStyle}>{amount}</div>,
      sorter: (a, b) => a.amount - b.amount,
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
    },
    {
      title: "",
      key: "action",
      onHeaderCell: () => ({
        style: {
          backgroundColor: "#ECECEC",
        },
      }),
      render: (item) => (
        <MoreOutlined
          style={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => handleMoreClick(item)}
        />
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return props.activeProduct ? (
    <OptionDetails activeProduct={props.activeProduct} />
  ) : (
    <Table
      columns={columns}
      dataSource={props.data}
      onChange={onChange}
      pagination={false}
      style={{
        width: "1050px",
        borderRadius: "8px",
        border: "0px 0px 1px 0px",
        boxShadow: "0px 4px 8px 0px #AAAAAA14",
        margin: 10,
      }}
    />
  );
};

export default Tabledata;
