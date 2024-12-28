import Dropicon from "../../utils/icons/Dropicon.svg";
import { Pagination } from "antd";
import "antd/dist/reset.css";

const Pageignition = () => {
  const totalItems = 12345;
  const itemsPerPage = 10;
  const items = `1-10 of ${totalItems}`;
  return (
    <div style={{ marginLeft: "4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Aeonik",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "16px",
          color: "#687182",
          padding: 25,
        }}
      >
        <div>{items}</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "4px" }}>
            Rows per page: 10
            <img
              src={Dropicon}
              style={{ marginBottom: "5px", marginLeft: "2px" }}
            />
          </div>
          <div>
            <Pagination
              total={totalItems}
              defaultPageSize={itemsPerPage}
              showSizeChanger={false}
              showQuickJumper={false}
              simple
              style={{ margin: 4 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pageignition;
