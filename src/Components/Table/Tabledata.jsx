import { Table } from "antd";
import data from "../../Assets/Fooddata";
const columns = [
  {
    title: "ITEMS",
    dataIndex: "items",
    render: (items) => (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "max-content",
          height: "72px",
        }}
      >
        <img
          src={items.icon}
          alt="icon"
          style={{
            width: "max-content",
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
            width: "50%",
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
// const data = [
//   {
//     key: "1",
//     items: "John Brown",
//     rating: 98,
//     store: 60,
//     subcategory: 70,
//     dateadded: "Feb 13 2024",
//     quantity: "134",
//     amount: "#28,900",
//   },
//   {
//     key: "2",
//     items: "Jim Green",
//     rating: 98,
//     store: 66,
//     subcategory: 89,
//     dateadded: "Feb 13 2024",
//     quantity: "134",
//     amount: "#28,900",
//   },
//   {
//     key: "3",
//     items: "Joe Black",
//     rating: 98,
//     store: 90,
//     subcategory: 70,
//     dateadded: "Feb 13 2024",
//     quantity: "134",
//     amount: "#28,900",
//   },
//   {
//     key: "4",
//     items: "Jim Red",
//     rating: 88,
//     store: 99,
//     subcategory: 89,
//     dateadded: "Feb 13 2024",
//     quantity: "134",
//     amount: "#28,900",
//   },
// ];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const Tabledata = () => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    style={{
      width: "max-content",
      height: "5px",
      borderRadius: "8px",
      justify: "space-between",
      border: "0px 0px 1px 0px",
      boxshadow: "0px 4px 8px 0px #AAAAAA14",
    }}
  />
);
export default Tabledata;
