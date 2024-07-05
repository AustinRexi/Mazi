import Addbutton from "./Addbutton";
import Filterbutton from "./Filterbutton";
import Search from "./Search";

import { Flex } from "antd";
import Tabbutton from "./Tabbutton";
function Headers() {
  return (
    <div>
      <div>
        <Flex gap="middle" align="start" vertical style={{ width: "auto" }}>
          <Flex gap="small">
            <h2> Products</h2>
            <Flex
              style={{
                gap: "8px",
                padding: "2px,8px,2px,8px",
                marginLeft: "36px",
                marginTop: "18px",
                border: "1px solid #B5B6B5",
                borderRadius: "16px",
                height: "7vh",
                width: "auto",
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
    </div>
  );
}

export default Headers;
