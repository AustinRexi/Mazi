import "antd/dist/reset.css";
import Dropicon from "../../utils/icons/Dropicon.svg";
import { Pagination } from "antd";
import Tabledata from "../Table/Tabledata";

const Pageignition = ({ data }) => {
  const totalItems = 12345;
  const itemsPerPage = 10;

  return (
    <div style={{ width: "100%" }}>
      <div className="page">
        <div>1-10 of {totalItems}</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Rows per page: 10</span>
            <img src={Dropicon} alt="Dropdown Icon" />
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
      <Tabledata data={data} />

      {/** Media Querie for mobile view **/}

      <style>
        {`
        @media (max-width: 540px) {
         .page {
           display: none;
         }
       }
    `}
      </style>
    </div>
  );
};

export default Pageignition;
