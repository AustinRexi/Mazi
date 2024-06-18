import { Input } from "antd";

import Line from "../../Assets/Lineicons/Line.svg";
import Searchicon from "../../Assets/Lineicons/Searchicon.svg";
function Search() {
  return (
    <div>
      <Input
        status=""
        prefix={
          <span>
            <img
              src={Searchicon}
              alt="Searchicon"
              style={{
                width: "7vh",
                height: 24,
                marginTop: "4px",
                border: "1px  #B5C3C3",
              }}
            />
            <img
              src={Line}
              alt="Line Icon"
              style={{
                width: 16,
                height: 20,
                marginTop: "4px",
              }}
            />
          </span>
        }
        placeholder="Search food or kitchen"
        style={{ marginTop: "15px", marginLeft: "15px", borderRadius: "8px" }}
      />
    </div>
  );
}

export default Search;
