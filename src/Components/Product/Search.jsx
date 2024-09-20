import { Input } from "antd";
import Line from "../../Assets/Lineicons/Line.svg";
import Searchicon from "../../Assets/Lineicons/Searchicon.svg";

function Search({ placeholder, style }) {
  return (
    <Input
      style={{
        height: "40px",
        borderRadius: "12px",
        ...style,
      }}
      prefix={
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={Searchicon}
            alt="Searchicon"
            style={{
              width: "22px",
              height: "24px",
              margin: "4px",
            }}
          />
          <img
            src={Line}
            alt="Line Icon"
            style={{
              width: "5px",
              height: "20px",
              margin: "4px",
            }}
          />
        </span>
      }
      placeholder={placeholder}
    />
  );
}

export default Search;
