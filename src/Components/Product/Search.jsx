import { Input } from "antd";
import Line from "../../Assets/Lineicons/Line.svg";
import Searchicon from "../../Assets/Lineicons/Searchicon.svg";

function Search({ placeholder, style }) {
  return (
    <div>
      <Input
        style={{
          height: "55px",
          marginTop: "15px",
          // marginLeft: "15px",
          borderRadius: "16px",
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
                marginTop: "4px",
              }}
            />
            <img
              src={Line}
              alt="Line Icon"
              style={{
                width: "10px",
                height: "20px",
                marginTop: "4px",
              }}
            />
          </span>
        }
        placeholder={placeholder}
      />
      <style>
        {`
          .ant-input::placeholder {
            font-weight: 500;
font-size: 16px;
font-weight: 500;
line-height: 20px;
text-align: left;
color: #838D8D;

} `}
      </style>
    </div>
  );
}

export default Search;
