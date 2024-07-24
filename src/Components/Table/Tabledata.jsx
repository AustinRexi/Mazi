import { Table } from "antd";

const columns = [
  {
    title: "ITEMS",
    dataIndex: "items",
    render: (items) => (
      <span
        style={{
          display: "flex",
          // alignItems: "center",
          gap: "20px",
          width: "338px",
          height: "85px",
        }}
      >
        <img
          src={items.icon}
          alt="icon"
          style={{
            width: "112px",
            marginRight: "8px",
            height: "72px",
            borderRadius: "6px",
          }}
        />
        <div
          style={{
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            whiteSpace: "normal",
            wordBreak: "break-word",
          }}
        >
          {items.description}
        </div>
      </span>
    ),
    sorter: (a, b) => a.items.description.localeCompare(b.items.description),
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
        <div>{rating.ratings}</div>
      </span>
    ),
    sorter: (a, b) => a.rating.ratings.localeCompare(b.rating.ratings),
  },
  {
    title: "STORE",
    dataIndex: "store",
    sorter: {
      compare: (a, b) => a.store - b.store,
      multiple: 2,
    },
  },
  {
    title: "SUB CATEGORY",
    dataIndex: "subcategory",
    sorter: {
      compare: (a, b) => a.subcategory - b.subcategory,
      multiple: 1,
    },
  },
  {
    title: "DATE ADDED",
    dataIndex: "dateadded",
    sorter: {
      compare: (a, b) => a.dateadded - b.dateadded,
      multiple: 1,
    },
  },
  {
    title: "QUANTITY",
    dataIndex: "quantity",
    sorter: {
      compare: (a, b) => a.quantity - b.quantity,
      multiple: 1,
    },
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 1,
    },
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Tabledata = (props) => (
  <Table
    columns={columns}
    s
    dataSource={props.data}
    onChange={onChange}
    style={{
      width: "1280px",
      height: "5px",
      borderRadius: "8px",
      justify: "space-between",
      border: "0px 0px 1px 0px",
      boxshadow: "0px 4px 8px 0px #AAAAAA14",
    }}
  />
);
export default Tabledata;
