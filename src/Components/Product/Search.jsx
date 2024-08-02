import { Input } from "antd";
import Line from "../../Assets/Lineicons/Line.svg";
import Searchicon from "../../Assets/Lineicons/Searchicon.svg";

function Search({ placeholder }) {
  return (
    <div>
      <Input
        style={{
          height: 55,
          marginTop: "15px",
          marginLeft: "15px",
          borderRadius: "16px",
        }}
        status=""
        prefix={
          <span>
            <img
              src={Searchicon}
              alt="Searchicon"
              style={{
                width: "5vh",
                height: 24,
                marginTop: "4px",
                border: "1px  #B5C3C3",
              }}
            />
            <img
              src={Line}
              alt="Line Icon"
              style={{
                width: 10,
                height: 20,
                marginTop: "4px",
              }}
            />
          </span>
        }
        placeholder={placeholder}
      />
    </div>
  );
}

export default Search;
