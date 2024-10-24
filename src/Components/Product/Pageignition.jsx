import "antd/dist/reset.css";
import Dropicon from "../../utils/icons/Dropicon.svg";
import { Pagination } from "antd";
<<<<<<< HEAD
import "antd/dist/reset.css";
=======
import Tabledata from "../Table/Tabledata";
>>>>>>> dev-meg

const Pageignition = () => {
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
<<<<<<< HEAD
=======
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
>>>>>>> dev-meg
    </div>
  );
};

export default Pageignition;
