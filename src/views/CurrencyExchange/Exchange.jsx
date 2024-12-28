import { Row, Col, Typography, Flex, Card, Avatar } from "antd";
import addicon from "../../Assets/currencyexchangeicon/addicon.svg";
import usicon from "../../Assets/currencyexchangeicon/usicon.svg";
import downicon from "../../Assets/currencyexchangeicon/downicon.svg";
import inflow from "../../Assets/currencyexchangeicon/inflowicon.svg";
import outflow from "../../Assets/currencyexchangeicon/outflowicon.svg";
import inflowrate from "../../Assets/currencyexchangeicon/inflowrateicon.svg";
import outflowrate from "../../Assets/currencyexchangeicon/outflowrateicon.svg";
import inflowwave from "../../Assets/currencyexchangeicon/inflowwaveicon.svg";
import outflowwave from "../../Assets/currencyexchangeicon/outflowwaveicon.svg";
const { Text } = Typography;
function Exchange() {
  return (
    <Card
      style={{
        width: "300px",
        height: "358px",
        padding: "24px",
        gap: 20,
        borderRadius: " 12px ",
        border: "1px solid #DEEAEA",
        marginTop: 28,
      }}
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <Row
        gutter={[16, 18]}
        style={{ justifyItems: "flex-start", alignItems: "center" }}
      >
        <Col span={18}>
          <Text
            style={{
              fontFamily: "NeueHaasDisplayRoman",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "19.2px",
              textAlign: "left",
              color: "#545E5E",
              whiteSpace: "nowrap",
            }}
          >
            Exchange Wallets
          </Text>
        </Col>
        <Col span={6}>
          {" "}
          <img src={addicon} alt="add.." />{" "}
        </Col>

        <Col span={19}>
          <span style={{ marginLeft: 20 }}>
            <img src={usicon} alt=".." />
            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "19.2px",
                textAlign: "left",
                whiteSpace: "nowrap",
                marginLeft: 8,
              }}
            >
              US Dollars <strong>USD</strong>
            </Text>
          </span>
        </Col>
        <Col span={5}>
          {" "}
          <img src={downicon} alt=".." />{" "}
        </Col>
        <Col span={24}>
          <Flex
            style={{
              justifyContent: "center",
              alignContent: "center",
              gap: 4,
              marginLeft: 8,
            }}
          >
            {" "}
            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
                textAlign: "left",
              }}
            >
              USD
            </Text>{" "}
            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "28px",
                fontWeight: 600,
                lineHeight: "30.4px",
              }}
            >
              51,768,545.99
            </Text>{" "}
          </Flex>
        </Col>

        <Col span={12}>
          <Flex
            style={{
              width: "125px",
              height: "46px",
              padding: "8px 24px",
              gap: 6,
              borderRadius: "8px",
              border: "1px solid #DEEAEA",
              backgroundColor: "#DEEAEA",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Avatar src={inflow} alt=".." size={32} />

            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "19.2px",
                color: " #545E5E",
                marginTop: 6,
              }}
            >
              {" "}
              Inflow
            </Text>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex
            style={{
              width: "128px",
              height: "46px",
              padding: "8px 20px",
              gap: 6,
              borderRadius: "8px",
              border: "1px solid #DEEAEA",
              backgroundColor: "#DEEAEA",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Avatar src={outflow} alt=".." size={32} />

            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "19.2px",
                color: " #545E5E",
                marginTop: 6,
              }}
            >
              Outflow
            </Text>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex
            style={{
              width: "128px",
              height: "20px",
              gap: 6,
              justifyContent: "center",
              alignContent: "center",
              marginTop: 6,
            }}
          >
            <img src={inflowrate} alt=".." />

            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "16.8px",
                marginTop: 3,
              }}
            >
              USD
            </Text>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex
            style={{
              width: "128px",
              height: "20px",
              gap: 6,
              justifyContent: "center",
              alignContent: "center",
              marginTop: 6,
            }}
          >
            <img src={outflowrate} alt=".." />

            <Text
              style={{
                fontFamily: "NeueHaasDisplayRoman",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "16.8px",
                marginTop: 3,
              }}
            >
              USD
            </Text>
          </Flex>
        </Col>

        <Col span={12}>
          {" "}
          <img
            src={inflowwave}
            alt="..."
            style={{ width: "125px", marginTop: 6 }}
          />{" "}
        </Col>
        <Col span={12}>
          {" "}
          <img
            src={outflowwave}
            alt="..."
            style={{ width: "125px", marginTop: 6 }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default Exchange;
