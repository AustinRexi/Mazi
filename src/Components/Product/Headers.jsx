import { useState } from "react";
import Addbutton from "./Addbutton";
import Filterbutton from "./Filterbutton";
import Search from "./Search";
import { Flex } from "antd";
import Tabbutton from "./Tabbutton";
import Pageignition from "./Pageignition";
import Fooddata from "../../Assets/Fooddata";
import Grocerydata from "../../Assets/Grocerydata";
import Restauranttypes from "../../Assets/Restauranttypes";
import Groceriescategories from "../../Assets/Groceriescategories";
import AddProduct from "../../views/Product/Addproduct";
import Bottompageignition from "./Bottompageigition";
import Tabledata from "../Table/Tabledata";

const dataRefrence = { tab1: Fooddata, tab2: Grocerydata };

function Headers() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const getPlaceholderText = () => {
    return activeTabKey === "tab1"
      ? "Search food or kitchen"
      : "Search grocery or store";
  };

  const getFilterItems = () => {
    return activeTabKey === "tab1" ? Restauranttypes : Groceriescategories;
  };

  const handleAddButtonClick = () => {
    setShowAddProduct(true);
  };

  return (
    <div style={{ background: "pink" }}>
      {showAddProduct ? (
        <AddProduct />
      ) : (
        <div>
          {!activeProduct && (
            <>
              <Flex gap="middle" align="start" vertical>
                <Flex gap="middle" style={{ display: "flex", gap: 24 }}>
                  <h2
                    style={{
                      marginTop: "20px",
                      color: "#000000",
                      fontWeight: 600,
                      fontSize: "24px",
                      lineHeight: "32px",
                      marginLeft: 25,
                    }}
                  >
                    Products
                  </h2>
                  <Flex
                    style={{
                      gap: "8px",
                      padding: "2px,8px,2px,8px",
                      marginLeft: "118px",
                      marginTop: "18px",
                      border: "1px solid #B5B6B5",
                      borderRadius: "16px",
                      height: "8vh",
                      width: "170px",
                    }}
                    wrap
                  >
                    {[
                      { id: "tab1", label: "Food" },
                      { id: "tab2", label: "Groceries" },
                    ].map(({ id, label }) => (
                      <Tabbutton
                        key={id}
                        activeTabKey={activeTabKey}
                        id={id}
                        handleClick={onTabChange}
                      >
                        {label}
                      </Tabbutton>
                    ))}
                  </Flex>
                  <Addbutton onClick={handleAddButtonClick} />
                  <Search placeholder={getPlaceholderText()} />
                  <Filterbutton data={getFilterItems()} />
                </Flex>
              </Flex>
              <Pageignition />
            </>
          )}
          <Tabledata
            setActiveProduct={setActiveProduct}
            activeProduct={activeProduct}
            data={dataRefrence[activeTabKey]}
          />
          {!activeProduct && <Bottompageignition />}
        </div>
      )}
    </div>
  );
}

export default Headers;

// import { useState } from "react";
// import Addbutton from "./Addbutton";
// import Filterbutton from "./Filterbutton";
// import Search from "./Search";
// import { Flex } from "antd";
// import Tabbutton from "./Tabbutton";
// import Pageignition from "./Pageignition";
// import Fooddata from "../../Assets/Fooddata";
// import Grocerydata from "../../Assets/Grocerydata";
// import Restauranttypes from "../../Assets/Restauranttypes";
// import Groceriescategories from "../../Assets/Groceriescategories";
// import AddProduct from "../../views/Product/Addproduct";
// import Bottompageignition from "./Bottompageigition";
// import "../../Mobile/Header.css";

// const dataRefrence = { tab1: Fooddata, tab2: Grocerydata };

// function Headers() {
//   const [activeTabKey, setActiveTabKey] = useState("tab1");
//   const [showAddProduct, setShowAddProduct] = useState(false);

//   const onTabChange = (key) => {
//     setActiveTabKey(key);
//   };

//   const getPlaceholderText = () => {
//     return activeTabKey === "tab1"
//       ? "Search food or kitchen"
//       : "Search grocery or store";
//   };

//   const getFilterItems = () => {
//     return activeTabKey === "tab1" ? Restauranttypes : Groceriescategories;
//   };

//   const handleAddButtonClick = () => {
//     setShowAddProduct(true);
//   };

//   return (
//     <div>
//       {showAddProduct ? (
//         <AddProduct />
//       ) : (
//         <div
//           className="headers-container"
//           style={{ width: "100%", padding: "20px" }}
//         >
//           {/* Desktop view */}
//           <div className="desktop-header" gap="middle" align="start" vertical>
//             <Flex
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#000000",
//                   fontWeight: 600,
//                   fontSize: "24px",
//                   lineHeight: "32px",
//                   marginBottom: 0,
//                 }}
//               >
//                 Products
//               </h2>

//               <Flex
//                 style={{ display: "flex", alignItems: "center", gap: "10px" }}
//               >
//                 <Flex
//                   style={{
//                     gap: "8px",
//                     padding: "2px 8px",
//                     border: "1px solid #B5B6B5",
//                     borderRadius: "16px",
//                     height: "8vh",
//                     width: "170px",
//                   }}
//                   wrap
//                 >
//                   {[
//                     { id: "tab1", label: "Food" },
//                     { id: "tab2", label: "Groceries" },
//                   ].map(({ id, label }) => (
//                     <Tabbutton
//                       key={id}
//                       activeTabKey={activeTabKey}
//                       id={id}
//                       handleClick={onTabChange}
//                     >
//                       {label}
//                     </Tabbutton>
//                   ))}
//                 </Flex>

//                 <Addbutton onClick={handleAddButtonClick} />
//                 <Search placeholder={getPlaceholderText()} />
//                 <Filterbutton data={getFilterItems()} />
//               </Flex>
//             </Flex>
//           </div>

//           {/* Mobile view */}
//           <div className="mobile-header" gap="middle" align="start" vertical>
//             <div
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#000000",
//                   fontWeight: 600,
//                   fontSize: "24px",
//                   lineHeight: "32px",
//                   marginBottom: 0,
//                 }}
//               >
//                 Products
//               </h2>

//               <Flex
//                 style={{
//                   gap: "8px",
//                   padding: "2px 8px",
//                   border: "1px solid #B5B6B5",
//                   borderRadius: "16px",
//                   height: "8vh",
//                   width: "170px",
//                 }}
//                 wrap
//               >
//                 {[
//                   { id: "tab1", label: "Food" },
//                   { id: "tab2", label: "Groceries" },
//                 ].map(({ id, label }) => (
//                   <Tabbutton
//                     key={id}
//                     activeTabKey={activeTabKey}
//                     id={id}
//                     handleClick={onTabChange}
//                   >
//                     {label}
//                   </Tabbutton>
//                 ))}
//               </Flex>
//             </div>

//             <Search placeholder={getPlaceholderText()} />

//             <Flex
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <Filterbutton data={getFilterItems()} />
//               <Addbutton onClick={handleAddButtonClick} />
//             </Flex>
//           </div>

//           {/* tablet (540) view */}
//           <div className="tablet-header" gap="middle" align="start" vertical>
//             <div
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#000000",
//                   fontWeight: 600,
//                   fontSize: "24px",
//                   lineHeight: "32px",
//                   marginBottom: 0,
//                 }}
//               >
//                 Products
//               </h2>
//             </div>

//             <Search placeholder={getPlaceholderText()} />

//             <Flex
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <Filterbutton data={getFilterItems()} />

//               <Flex
//                 style={{
//                   gap: "8px",
//                   padding: "2px 8px",
//                   border: "1px solid #B5B6B5",
//                   borderRadius: "16px",
//                   height: "8vh",
//                   width: "170px",
//                 }}
//                 wrap
//               >
//                 {[
//                   { id: "tab1", label: "Food" },
//                   { id: "tab2", label: "Groceries" },
//                 ].map(({ id, label }) => (
//                   <Tabbutton
//                     key={id}
//                     activeTabKey={activeTabKey}
//                     id={id}
//                     handleClick={onTabChange}
//                   >
//                     {label}
//                   </Tabbutton>
//                 ))}
//               </Flex>
//               <Addbutton onClick={handleAddButtonClick} />
//             </Flex>
//           </div>

//           {/* ipad view */}
//           <div className="ipad-header" gap="middle" align="start" vertical>
//             <div
//               gap="middle"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <h2
//                 style={{
//                   color: "#000000",
//                   fontWeight: 600,
//                   fontSize: "24px",
//                   lineHeight: "32px",
//                   marginBottom: 0,
//                 }}
//               >
//                 Products
//               </h2>
//             </div>

//             <Flex
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "20px 0 ",
//                 width: "100%",
//               }}
//             >
//               <Search placeholder={getPlaceholderText()} />

//               <Flex
//                 style={{
//                   gap: "8px",
//                   padding: "2px 8px",
//                   border: "1px solid #B5B6B5",
//                   borderRadius: "16px",
//                   height: "8vh",
//                   width: "170px",
//                 }}
//                 wrap
//               >
//                 {[
//                   { id: "tab1", label: "Food" },
//                   { id: "tab2", label: "Groceries" },
//                 ].map(({ id, label }) => (
//                   <Tabbutton
//                     key={id}
//                     activeTabKey={activeTabKey}
//                     id={id}
//                     handleClick={onTabChange}
//                   >
//                     {label}
//                   </Tabbutton>
//                 ))}
//               </Flex>
//               <Addbutton onClick={handleAddButtonClick} />
//               <Filterbutton data={getFilterItems()} />
//             </Flex>
//           </div>

//           <Pageignition
//             data={dataRefrence[activeTabKey]}
//             className="Pageignition"
//           />
//           <Bottompageignition />
//         </div>
//       )}
//       {/* Media Queries for Responsiveness */}
//       <style>
//         {`
//           @media (max-width: 540px) {
//             .buttom-page {
//               flex-wrap: wrap;
//               align-items: flex-start;
//                margin-bottom: 20px;
//             }

//             .ant-select {
//               margin-bottom: 10px;
//             }
//              .Pageignition {
//              display: none;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Headers;
