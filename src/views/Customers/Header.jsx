import { useMemo, useState } from "react";
import dayjs from "dayjs";
import Dropicon from "../../utils/icons/Dropicon.svg";
import { Pagination } from "antd";
import MyTable from "./MyTable";
import Search from "../../Components/Product/Search";
import ActionButton from "./ActionButton";
import Filterbutton from "../../Components/Product/Filterbutton";
import Tabbutton from "../../Components/Product/Tabbutton";
import { Flex } from "antd";
import Bottompageignition from "../../Components/Product/Bottompageigition";
import user from "./User";
import store from "./stores";

const dataReference = { user: user, store: store };

function Header() {
  const [activeTabKey, setActiveTabKey] = useState("user");
  const totalItems = 12345;
  const itemsPerPage = 10;

  const onTabChange = (tab) => {
    setActiveTabKey(tab);
  };

  const presets = useMemo(
    () => [
      { label: "Today", value: dayjs() },
      { label: "Three Months", value: dayjs().subtract(3, "month") },
      { label: "Six Months", value: dayjs().subtract(6, "month") },
      { label: "One Year", value: dayjs().subtract(1, "year") },
    ],
    []
  );

  const getPlaceholderText = "Search Users or Stores";

  return (
    <div style={{ padding: 10 }}>
      <div style={{ display: "flex", gap: 30 }}>
        <h2
          style={{
            marginTop: "20px",
            color: "#000000",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            marginLeft: 20,
          }}
        >
          Customers
        </h2>
        <Search
          placeholder={getPlaceholderText}
          style={{
            marginLeft: "42px",
            width: "531px",
            height: "45px",
            borderRadius: "16px",
            border: "1px solid #B5C3C3",
            padding: "0 16px",
          }}
        />
        <ActionButton />
        <Filterbutton data={presets} />
      </div>

      <Flex
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "18px",
          marginLeft: "18px",
          gap: "20px",
        }}
      >
        <Flex
          style={{
            gap: "20px",
            padding: "2px 8px",
            border: "1px solid #B5B6B5",
            borderRadius: "16px",
            height: "8vh",
            width: "170px",
            marginLeft: 4,
            justifyContent: "center",
            alignItems: "center",
          }}
          wrap
        >
          {[
            { id: "user", label: "Users" },
            { id: "store", label: "Stores" },
          ].map(({ id, label }) => (
            <Tabbutton
              key={id}
              activeTabKey={activeTabKey}
              id={id}
              handleClick={() => onTabChange(id)}
            >
              {label}
            </Tabbutton>
          ))}
        </Flex>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "4px" }}>
            Rows per page: 10
            <img src={Dropicon} style={{ marginBottom: "5px" }} />
          </div>
          <div>
            <Pagination
              total={totalItems}
              defaultPageSize={itemsPerPage}
              showSizeChanger={false}
              showQuickJumper={false}
              simple
            />
          </div>
        </div>
      </Flex>

      {/* MyTable receives active data based on activeTabKey */}
      <MyTable activeTabKey={activeTabKey} data={dataReference[activeTabKey]} />
      <Bottompageignition />
    </div>
  );
}

export default Header;
