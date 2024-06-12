import Addbutton from "./Addbutton";
import Filterbutton from "./Filterbutton";
import Search from "./Search";

import { Flex } from "antd";
import Tabbutton from "./Tabbutton";
function Headers() {
  return (
    <div>
      <div>
        <Flex gap="middle" align="start" vertical>
          <Flex gap="small">
            <h2> Products</h2>
            <Flex
              style={{
                padding: 0,
                marginLeft: "36px",
                marginTop: "18px",
                border: "1px solid black",
                borderRadius: "16px",
                height: "5vh",
              }}
              wrap
            >
              <Tabbutton />
              <Tabbutton />
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
