import { Row, Col, Typography, Card, Select, Avatar, Divider } from "antd";
import usd from "../../Assets/currencyexchangeicon/usaicon.svg";
import eur from "../../Assets/currencyexchangeicon/euricon.svg";
import gdp from "../../Assets/currencyexchangeicon/gdpicon.svg";
import aud from "../../Assets/currencyexchangeicon/audicon.svg";
import ngn from "../../Assets/currencyexchangeicon/nairaicon.svg";
import exchangeicon from "../../Assets/currencyexchangeicon/exchangeicon.svg";
import Search from "../../Components/Product/Search";
const { Text } = Typography;
function ActiveCurrency() {
  const getPlaceholderText = "Search currency";
  const { Option } = Select;

  const optionsWithImages = [
    {
      value: "United States Dollar",
      label: "USD",
      image: usd,
      targetedcurrency: "#1,418.14",
      sourcecurrency: "$1.00",
    },
    {
      value: "Euro",
      label: "EUR",
      image: eur,
      targetedcurrency: "#1,524.20",
      sourcecurrency: "€1.00",
    },

    {
      value: "Australlian Dollar",
      label: "AUD",
      image: aud,
      targetedcurrency: "#930.53",
      sourcecurrency: "A$1.00",
    },
    {
      value: "British Pounds",
      label: "GDP",
      image: gdp,
      targetedcurrency: "#1,770.02",
      sourcecurrency: "£1.00",
    },
    {
      value: "Nigerian Naira",
      label: "NGN",
      image: ngn,
      targetedcurrency: "#1",
      sourcecurrency: "#1",
    },
  ];
  return (
    <Card
      style={{
        width: "300px",
        height: "450px",
        padding: "26px",
        gap: 20,
        borderRadius: " 12px ",
        border: "1px solid #DEEAEA",
        marginTop: 20,
      }}
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <Row gutter={[6, 6]}>
        <Col span={24}>
          <Text
            style={{
              fontFamily: "NeueHaasDisplayRoman",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "24px",
              textAlign: "left",
              color: "#545E5E",
            }}
          >
            Active Currencies
          </Text>
        </Col>
        <Col span={18}>
          <Search
            placeholder={getPlaceholderText}
            style={{
              width: "248px",
              height: "49px",
              padding: " 16px",
              borderRadius: "16px",
              border: "1px solid #B5C3C3",
              marginBottom: 20,
            }}
          />
        </Col>
        <Col span={12}>
          <Text
            style={{
              fontFamily: "NeueHaasDisplayRoman",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "28px",
            }}
          >
            Currency
          </Text>{" "}
        </Col>
        <Col span={12}>
          <div style={{ marginLeft: 6 }}>
            <Select
              variant="borderless"
              defaultValue="NGN"
              style={{ width: "90%" }}
              dropdownRender={(menu) => <div>{menu}</div>}
            >
              {optionsWithImages.map((option) => (
                <Option
                  key={option.value}
                  value={option.label}
                  label={option.value}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={option.image}
                      alt={option.label}
                      style={{ width: 20, height: 20 }}
                    />
                    <span
                      style={{
                        fontFamily: "NeueHaasDisplayRoman",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "20px",
                        textAlign: "center",
                      }}
                    >
                      {option.label}
                    </span>
                    {/* <span>{option.value}</span> */}
                  </div>
                </Option>
              ))}
            </Select>
          </div>
        </Col>

        <Col span={24}>
          {optionsWithImages.map((item, i) => (
            <Row key={i} gutter={[8, 12]}>
              <Divider style={{ margin: 6, padding: 0 }} />
              <Col span={13}>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                  }}
                >
                  <img src={item.image} alt="..." />{" "}
                  <Text
                    style={{
                      fontFamily: "NeueHaasDisplayRoman",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "19.2px",
                      textAlign: "center",
                      color: "#545E5E",
                      marginLeft: 4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </Text>{" "}
                  <Text
                    style={{
                      fontFamily: "NeueHaasDisplayRoman",
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "19.2px",
                      textAlign: "center",
                      color: "#545E5E",
                      marginLeft: 2,
                    }}
                  >
                    {item.sourcecurrency}
                  </Text>
                </span>
              </Col>
              <Col span={3}>
                <Avatar size={26} src={exchangeicon} alt="..." />
              </Col>
              <Col span={8}>
                <Text
                  style={{
                    fontFamily: "NeueHaasDisplayRoman",
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    color: "#515251",
                    float: "right",
                  }}
                >
                  {item.targetedcurrency}
                </Text>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Card>
  );
}

export default ActiveCurrency;
