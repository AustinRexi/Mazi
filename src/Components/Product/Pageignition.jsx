import "antd/dist/reset.css"; // Import Ant Design styles
import Dropicon from "../../utils/icons/Dropicon.svg";
import { Pagination } from "antd";
import "antd/dist/reset.css";

const Pageignition = () => {
  const totalItems = 12345;
  const itemsPerPage = 10;

  return (
    <div style={{ marginLeft: "4px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "Aeonik",
          fontWeight: 400,
          lineHeight: "16px",
          color: "#687182",
          padding: 25,
        }}
      >
        <div>
          1-10 of {} {totalItems}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "8px" }}>
            Rows per page: 10
            <img
              src={Dropicon}
              style={{ marginBottom: "5px", marginLeft: "4px" }}
            />
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
      </div>
    </div>
  );
};

export default Pageignition;
