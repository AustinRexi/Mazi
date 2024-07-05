import Addbutton from "./Addbutton";
import Filterbutton from "./Filterbutton";
import Search from "./Search";

import { Flex } from "antd";
import Tabbutton from "./Tabbutton";
import Pageignition from "./Pageignition";
function Headers() {
  return (
    <div>
      <div>
        <Flex gap="middle" align="start" vertical>
          <Flex gap="middle" style={{ display: "flex" }}>
            <h2 style={{ marginTop: "20px" }}> Products</h2>
            <Flex
              style={{
                gap: "6px",
                padding: "2px,8px,2px,8px",
                marginLeft: "300px",
                marginTop: "18px",
                border: "1px solid #B5B6B5",
                borderRadius: "16px",
                height: "7vh",
                width: "177px",
              }}
              wrap
            >
              <Tabbutton> Food</Tabbutton>
              <Tabbutton> Groceries </Tabbutton>
            </Flex>
            <Addbutton />
            <Search />
            <Filterbutton />
          </Flex>
        </Flex>
      </div>
      <Pageignition />
    </div>
  );
}

export default Headers;
