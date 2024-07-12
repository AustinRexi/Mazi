import { useState } from "react";
import { Tabs } from "antd";
import Tabledata from "../../Components/Table/Tabledata";
import fooddata from "../../Assets/Fooddata";
import grocerydata from "../../Assets/Grocerydata";
import Pageignition from "../../Components/Product/Pageignition";
import { Flex } from "antd";
import Addbutton from "../../Components/Product/Addbutton";
import Search from "../../Components/Product/Search";
import Filterbutton from "../../Components/Product/Filterbutton";

const { TabPane } = Tabs;

const tabList = [
  {
    key: "tab1",
    tab: "Food",
  },
  {
    key: "tab2",
    tab: "Groceries",
  },
];

const contentList = {
  tab1: <Tabledata data={fooddata} />,
  tab2: <Tabledata data={grocerydata} />,
};

function Tabswitch() {
  const [activeTabKey, setActiveTabKey] = useState("tab1");

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div>
      <Flex
        style={{
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <Tabs
          activeKey={activeTabKey}
          onChange={onTabChange}
          style={{
            gap: "4px",
            padding: "2px 8px",
            marginTop: "18px",
            border: "1px solid #B5B6B5",
            borderRadius: "16px",
            height: "8vh",
            width: "178px",
          }}
        >
          {tabList.map((tab) => (
            <TabPane tab={tab.tab} key={tab.key} style={{ width: "185vh" }}>
              <Pageignition />
              {contentList[tab.key]}
            </TabPane>
          ))}
        </Tabs>
        <Flex style={{ gap: "16px", marginRight: "10px" }}>
          <Addbutton />
          <Search />
          <Filterbutton />
        </Flex>
      </Flex>
    </div>
  );
}

export default Tabswitch;
