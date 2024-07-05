import { useState } from "react";
import { Tabs } from "antd";
import Tabledata from "../../Components/Table/Tabledata";
import fooddata from "../../Assets/Fooddata";
import grocerydata from "../../Assets/Grocerydata";

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
    <Tabs activeKey={activeTabKey} onChange={onTabChange}>
      {tabList.map((tab) => (
        <TabPane tab={tab.tab} key={tab.key}>
          {contentList[tab.key]}
        </TabPane>
      ))}
    </Tabs>
  );
}

export default Tabswitch;
