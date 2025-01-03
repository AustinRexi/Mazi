import { Row, Col } from "antd";
import { Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import cart from "../utils/icons/cart.svg";
import notification from "../utils/icons/notification.svg";
import avatar from "../utils/icons/avatar.svg";
import flag from "../utils/icons/flag.svg";
import menu from "../utils/icons/menu.svg";
import logo from "../utils/icons/logo.svg";

const Navbar = () => {
  const { Option } = Select;

  const optionsWithImages = [
    {
      value: "apple",
      label: "Apple",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "banana",
      label: "Banana",
      image: "https://via.placeholder.com/30x30",
    },
    {
      value: "Nigeria",
      label: "Nigeria",
      image: flag,
    },
  ];
  return (
    <div>
      <Row>
        <Col>
          <div
            style={{
              gap: "24px",
              width: "256px",
              background: "#white",
              height: "72px",
              display: "flex",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              marginBottom: "1px",
              marginLeft: "1px",
              border: "0px 1px 0px 0px",
              opacity: "0px",
            }}
          >
            <img src={menu} alt="" />
            <img
              src={logo}
              alt=""
              style={{ width: "57.82px", height: "40px", marginTop: 16 }}
            />
          </div>
        </Col>
        <Col span={19}>
          <div
            style={{
              background: "white",
              height: "72px",
              alignItems: "center",
              padding: 0,
              width: "auto",
            }}
          >
            <div
              style={{
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div style={{ padding: 10 }}>
                <Select
                  defaultValue="Nigeria"
                  style={{
                    width: 200,
                  }}
                >
                  {optionsWithImages.map((option) => (
                    <Option
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={option.image}
                          alt={option.label}
                          style={{
                            marginRight: "8px",
                            width: "30px",
                            height: "20px",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "NeueHaasDisplayRoman",
                            fontWeight: 500,
                            fontSize: "16px",
                            lineHeight: "24px",
                          }}
                        >
                          {option.label}
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  gap: 10,
                }}
              >
                <img src={cart} alt="" />
                <img src={notification} alt="" />
                <Button
                  type="primary"
                  style={{ height: 32, fontFamily: "roboto" }}
                >
                  Add store {<PlusOutlined />}
                </Button>
                <img src={avatar} alt="" style={{ paddingRight: "6px" }} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default Navbar;
