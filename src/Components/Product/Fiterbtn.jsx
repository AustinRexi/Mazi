// import { Button, ConfigProvider, Tooltip } from "antd";
// import Filter from "../../views/Product/Filter";

// const text = <Filter />;

// const Fiterbtn = () => {
//   return (
//     <ConfigProvider
//       button={{
//         style: {
//           margin: 4,
//         },
//       }}
//     >
//       <div className="demo">
//         <div
//           style={{
//             clear: "both",
//             whiteSpace: "wrap",
//           }}
//         >
//           <Tooltip placement="bottomRight" title={text}>
//             <Button>BR</Button>
//           </Tooltip>
//         </div>
//       </div>
//     </ConfigProvider>
//   );
// };
// export default Fiterbtn;

import Filter from "../../views/Product/Filter";
import { Tooltip, Button } from "antd";

const text = <Filter />;

const Filterbtn = () => {
  return (
    <div style={{ position: "absolute", top: "60px", right: "200px" }}>
      <Tooltip
        title={text}
        placement="bottom"
        color="white"
        arrowPointAtCenter
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.9}
        style={{ border: "none" }}
      >
        <Button type="primary">Hover me</Button>
      </Tooltip>
    </div>
  );
};

export default Filterbtn;
