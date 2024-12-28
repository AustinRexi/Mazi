import { Row, Col, Avatar, Typography, Dropdown, Menu, Flex } from "antd";
import line from "../../Assets/Lineicons/seperatorlineicon.svg";
import conversion from "../../Assets/Lineicons/conversionlineicon.svg";
import success from "../../Assets/Lineicons/successicon.svg";
import option from "../../Assets/Couriericons/options.svg";
const { Text } = Typography;

const Transaction = ({ data }) => {
  const menu = (
    <Menu
      items={[
        { key: "1", label: "View details" },
        { key: "2", label: "Share receipt" },
        { key: "3", label: "Download receipt" },
      ]}
    />
  );

  const processedData = data.map((item) => ({
    ...item,
    details: item.details.map((detail) => ({
      ...detail,
      totalAmount: detail.amountUSD * detail.exchangeRate,
    })),
  }));

  return (
    <div>
      {processedData.map((item, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "NeueHaasDisplayRoman",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
              textAlign: "left",
              marginBottom: 6,
            }}
          >
            {item.date}
          </Text>
          {item.details.map((detail, detailIndex) => (
            <div
              key={detailIndex}
              style={{
                marginTop: 8,
                border: "1px solid #f0f0f0",
                borderRadius: 4,
                padding: 4,
                backgroundColor: "#fff",
                maxWidth: 700,
                maxHeight: 72,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Row
                gutter={[16, 16]}
                style={{ justifyContent: "flex-start", alignContent: "center" }}
              >
                <Col span={6}>
                  <section style={{ marginTop: "10px" }}>
                    {" "}
                    <Avatar src={detail.icon} size={32} />{" "}
                    <span
                      style={{
                        fontFamily: "NeueHaasDisplayRoman",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        textAlign: "left",

                        color: " #171717",
                      }}
                    >
                      {" "}
                      {detail.name}
                    </span>
                  </section>
                </Col>
                <Col>
                  <Flex style={{ gap: 8 }}>
                    {" "}
                    <img src={line} alt="..." />
                    <div
                      style={{
                        display: "grid",
                        margin: 2,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#545E5E",
                        }}
                      >
                        USD
                      </Text>
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#121515",
                        }}
                      >
                        ${detail.amountUSD}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        justifyItems: "center",
                        alignItems: "center",
                        margin: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          textAlign: "left",
                          color: "#696969",
                        }}
                      >
                        USD 1
                      </Text>
                      <img src={conversion} alt="..." />
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "20px",
                          textAlign: "left",
                          color: "#696969",
                        }}
                      >
                        NGN {detail.exchangeRate}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        margin: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#545E5E",
                        }}
                      >
                        NGN
                      </Text>
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 600,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#515251",
                        }}
                      >
                        #{detail.totalAmount}
                      </Text>
                    </div>
                    <img src={line} alt="..." />
                  </Flex>
                </Col>
                <Col>
                  <div
                    style={{
                      display: "grid",
                      margin: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "NeueHaasDisplayRoman",
                        fontSize: "16px",
                        fontWeight: 500,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#545E5E",
                      }}
                    >
                      Fee
                    </Text>
                    <Text
                      style={{
                        fontFamily: "NeueHaasDisplayRoman",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "24px",
                        textAlign: "left",
                        color: "#121515",
                      }}
                    >
                      {detail.fee}
                    </Text>
                  </div>
                </Col>
                <Col>
                  <Flex style={{ gap: 8 }}>
                    <img src={line} alt="..." />
                    <div
                      style={{
                        display: "grid",
                        margin: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#545E5E",
                        }}
                      >
                        <img src={success} alt=".." /> Status
                      </Text>
                      <Text
                        style={{
                          fontFamily: "NeueHaasDisplayRoman",
                          fontSize: "16px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          textAlign: "left",
                          color: "#22BB5F",
                        }}
                      >
                        {detail.status}
                      </Text>
                    </div>
                  </Flex>
                </Col>
                <Col>
                  {" "}
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottom"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "16px",
                      fontFamily: "NeueHaasDisplayThin",
                      color: " #1D1D1D)",
                    }}
                  >
                    <img
                      src={option}
                      alt="options"
                      style={{
                        top: 20,
                        cursor: "pointer",
                      }}
                    />
                  </Dropdown>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Transaction;
