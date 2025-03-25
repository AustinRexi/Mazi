import Transactions from "./Transanctions";
import { Row, Col, Typography, Flex } from "antd";
import Search from "../../Components/Product/Search";
import FilteredItems from "../Customers/FilteredItems";
import Bottompageignition from "../../Components/Product/Bottompageigition";
import displaypicture from "../Customers/icons/dp.svg";
import Exchange from "./Exchange";
import ActiveCurrency from "./ActiveCurrency";
const { Text } = Typography;
function CurrencyExchange() {
  const getPlaceholderText = "Search name";

  const data = [
    {
      date: "Saturday, Dec. 21, 2023",
      details: [
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
      ],
    },
    {
      date: "Saturday, Dec. 21, 2023",
      details: [
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
      ],
    },
    {
      date: "Saturday, Dec. 21, 2023",
      details: [
        {
          name: "Tiamiyu Wasiu",
          amountUSD: 256,
          exchangeRate: 1418.14,
          fee: "$4",
          icon: displaypicture,
          status: "Successful",
        },
      ],
    },
  ];

  return (
    <div style={{ padding: 20, backgroundColor: "#F8FBFB" }}>
      <Row gutter={[0, 14]}>
        <Col lg={17}>
          <Row
            gutter={[0, 16]}
            style={{
              justifyItems: "flex-start",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Col lg={11}>
              {" "}
              <h5
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  lineHeight: "32px",
                  textAlign: "left",
                  marginTop: 6,
                  marginBottom: 8,
                }}
              >
                Currency Exchange
              </h5>
            </Col>
            <Col lg={12}>
              <Flex style={{ marginBottom: 8, marginLeft: 17 }}>
                <Search
                  placeholder={getPlaceholderText}
                  style={{
                    width: "210px",
                    height: "40px",
                    padding: "10px",
                    borderRadius: "16px ",
                    border: "1px solid #B5C3C3",
                  }}
                />
                <FilteredItems
                  style={{ width: 110, height: 40, borderRadius: 10 }}
                />
              </Flex>
            </Col>
            <Col lg={14}>
              <Text
                style={{
                  fontFamily: "NeueHaasDisplayRoman",
                  fontSize: "22px",
                  fontWeight: 500,
                  lineHeight: "32px",
                  textAlign: "left",
                }}
              >
                Recent Transactions
              </Text>
            </Col>
            <Col xs={24} lg={10}>
              <section style={{ marginLeft: { xs: 0, lg: 22 } }}>
                <Bottompageignition isVisible={false} />
              </section>
            </Col>
            <Col md={24} lg={24}>
              <Transactions data={data} />
            </Col>
          </Row>
          <Col xs={24} lg={24}>
            {" "}
            <Bottompageignition isVisible={true} />
          </Col>
        </Col>
        <Col lg={7}>
          <Row gutter={[10, 10]}>
            <Col md={13} lg={24}>
              {" "}
              <Exchange />
            </Col>
            <Col md={10} lg={24}>
              {" "}
              <ActiveCurrency />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CurrencyExchange;
