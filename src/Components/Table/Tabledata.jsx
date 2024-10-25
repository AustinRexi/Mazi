
import { Table } from "antd";
 import { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import OptionDetails from "../../views/Product/OptionDetails";

const Tabledata = (props) => {
  const [showOptionDetails, setShowOptionDetails] = useState(false);

   const handleMoreClick = (product) => {
     setShowOptionDetails(true);
    console.log(product, "product");

    props.setActiveProduct(product);
  };

  const columns = [
    {
      title: "ITEMS",
      dataIndex: "items",
      render: (items) => (
        <span
          style={{
            display: "flex",
            gap: "15px",
            width: "250px",
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
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
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
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "STORE",
      dataIndex: "store",
      sorter: {
        compare: (a, b) => a.store - b.store,
        multiple: 2,
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "SUB CATEGORY",
      dataIndex: "subcategory",
      sorter: {
        compare: (a, b) => a.subcategory - b.subcategory,
        multiple: 1,
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "DATE ADDED",
      dataIndex: "dateadded",
      sorter: {
        compare: (a, b) => a.dateadded - b.dateadded,
        multiple: 1,
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 1,
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      sorter: {
        compare: (a, b) => a.amount - b.amount,
        multiple: 1,
      },
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
    },
    {
      title: "",
      key: "action",
      onHeaderCell: () => {
        return {
          style: {
            backgroundColor: "#ECECEC",
          },
        };
      },
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

  // Render only OptionDetails if showOptionDetails is true
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
        margin: 16,
      }}
    />
  );
};

// const Tabledata = (props) => (
  
//   <div style={{ overflowX: "auto" }}>
//   <Table
//     columns={columns}
//     dataSource={props.data}
//     onChange={onChange}
//     pagination={false}
//     style={{
//       width: "100%",
//       borderRadius: "8px",
//       border: "0px 0px 1px 0px",
//       boxShadow: "0px 4px 8px 0px #AAAAAA14",
//     }}
//   />

//   {/* <style>
//     {`
//       @media (max-width: 1280px) {
     
//         .ant-table-cell {
//           white-space: nowrap;
//         }
//       }

//        @media (max-width: 768px) {
         
//        }
//     `}
//   </style> */}
// </div>

// );

export default Tabledata;




// import { Table } from "antd";

// const columns = [
//   {
//     title: "ITEMS",
//     dataIndex: "items",
//     render: (items) => (
//       <span
//         style={{
//           display: "flex",
//           gap: "10px",
//           width: "100%",
//           height: "85px",
//         }}
//       >
//         <img
//           src={items.icon}
//           alt="icon"
//           style={{
//             height: "72px",
//             borderRadius: "6px",
//             flexShrink: 0,
//           }}
//         />
//         <div
//           style={{
//             fontWeight: 500,
//             fontSize: "16px",
//             lineHeight: "24px",
//             whiteSpace: "normal",
//             flexGrow: 1, 
//           }}
//         >
//           {items.description}
//         </div>
//       </span>
//     ),
//     sorter: (a, b) => a.items.description.localeCompare(b.items.description),
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
         
//         },
//       };
//     },
//   },
//   {
//     title: "RATING",
//     dataIndex: "rating",
//     render: (rating) => (
//       <span style={{ display: "flex", alignItems: "center" }}>
//         <img
//           src={rating.icon}
//           alt="star icon"
//           style={{ width: "16px", height: "16px",}}
//         />
//         <div>{rating.ratings}</div>
//       </span>
//     ),
//     sorter: (a, b) => a.rating.ratings.localeCompare(b.rating.ratings),
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
         
//         },
//       };
//     },
//   },
//   {
//     title: "STORE",
//     dataIndex: "store",
//     render: (store) => (
//       <div style={{ textAlign: "center" }}>{store}</div>
//     ),
//     sorter: {
//       compare: (a, b) => a.store - b.store,
//       multiple: 2,
//     },
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
//         },
//       };
//     },
//   },
//   {
//     title: "SUB CATEGORY",
//     dataIndex: "subcategory",
//     render: (subcategory) => (
//       <div style={{ textAlign: "center" }}>{subcategory}</div>
//     ),
//     sorter: {
//       compare: (a, b) => a.subcategory - b.subcategory,
//       multiple: 1,
//     },
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
//           textAlign: "center",
//         },
//       };
//     },
//   },
//   {
//     title: "DATE ADDED",
//     dataIndex: "dateadded",
//     render: (dateadded) => (
//       <div style={{ textAlign: "center" }}>{dateadded}</div>
//     ),
//     sorter: {
//       compare: (a, b) => a.dateadded - b.dateadded,
//       multiple: 1,
//     },
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
//         },
//       };
//     },
//   },
//   {
//     title: "QUANTITY",
//     dataIndex: "quantity",
//     render: (quantity) => (
//       <div style={{ textAlign: "center" }}>{quantity}</div>
//     ),
//     sorter: {
//       compare: (a, b) => a.quantity - b.quantity,
//       multiple: 1,
//     },
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
//         },
//       };
//     },
//   },
//   {
//     title: "AMOUNT",
//     dataIndex: "amount",
//     render: (amount) => (
//       <div style={{ textAlign: "center" }}>{amount}</div>
//     ),
//     sorter: {
//       compare: (a, b) => a.amount - b.amount,
//       multiple: 1,
//     },
//     onHeaderCell: () => {
//       return {
//         style: {
//           backgroundColor: "#ECECEC",
//         },
//       };
//     },
//   },
// ];

// const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
// };

// const Tabledata = (props) => (
  
//   <div style={{ overflowX: "auto" }}>
//   <Table
//     columns={columns}
//     dataSource={props.data}
//     onChange={onChange}
//     pagination={false}
//     style={{
//       width: "100%",
//       borderRadius: "8px",
//       border: "0px 0px 1px 0px",
//       boxShadow: "0px 4px 8px 0px #AAAAAA14",
      
//     }}
//   />
//   {/* Media Query for Mobile */}
//   <style>
//       {`
//         @media (max-width: 1280px) {
//           .ant-table-cell {
//             white-space: nowrap;
//             overflow-wrap: break-word;
//           }

//           .ant-table-row > td {
//             vertical-align: middle; 
//           }
//         }
//       `}
//     </style>

//     <style>
//       {`
//         /* Mobile-specific styling */
        
//         @media (max-width: 912px) {
//             .ant-table {
//             min-width: 920px; 
//           }

//           .ant-table-thead > tr > th {
//             font-size: 12px;
//             padding: 8px;
//           }

//           .ant-table-cell > div {
//             text-align: center; 
//           }

//           :where(.css-dev-only-do-not-override-1k4ieme).ant-table-wrapper .ant-table-column-title {
//            position: relative;
//            z-index: 1;
//            flex: 0;
//            }
        
//       `}
//     </style>
// </div>

// );

// export default Tabledata;
