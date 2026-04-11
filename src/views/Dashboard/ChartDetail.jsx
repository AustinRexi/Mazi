import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import listIcon1 from "../../utils/icons/listIcon1.svg";
import listIcon2 from "../../utils/icons/listIcon2.svg";
import Chart from "../../views/Dashboard/Chart";
import Card2 from "./Card2";
import Topstores from "./Topstores";
import { fetchAdminOrderCards } from "../../services/adminOrderService";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "../../utils/adminCountryScope";

const formatNaira = (amount) =>
  `N${Number(amount || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const ChartDetail = ({ dateRange, onDateRangeChange }) => {
  const [selectedCountry, setSelectedCountry] = useState(() =>
    getAdminCountryScope()
  );
  const [salesReport, setSalesReport] = useState({
    range: "12m",
    summary: {
      revenue: 0,
      orders: 0,
    },
    chart: {
      labels: [],
      revenue: [],
      orders: [],
    },
  });

  useEffect(() => {
    const handleCountryChange = (event) => {
      setSelectedCountry(event.detail?.country || getAdminCountryScope());
    };

    window.addEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
    return () =>
      window.removeEventListener(ADMIN_COUNTRY_SCOPE_EVENT, handleCountryChange);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadSalesSummary = async () => {
      try {
        const response = await fetchAdminOrderCards({
          per_page: 1,
          date_from: dateRange?.[0]?.format("YYYY-MM-DD"),
          date_to: dateRange?.[1]?.format("YYYY-MM-DD"),
          country: selectedCountry,
        });

        if (!isMounted) {
          return;
        }

        setSalesReport(
          response?.sales_report || {
            range: "12m",
            summary: {
              revenue: 0,
              orders: 0,
            },
            chart: {
              labels: [],
              revenue: [],
              orders: [],
            },
          }
        );
      } catch (_) {
        if (!isMounted) {
          return;
        }

        setSalesReport({
          range: "12m",
          summary: {
            revenue: 0,
            orders: 0,
          },
          chart: {
            labels: [],
            revenue: [],
            orders: [],
          },
        });
      }
    };

    loadSalesSummary();

    return () => {
      isMounted = false;
    };
  }, [dateRange, selectedCountry]);

  const items = [
    {
      icon: listIcon1,
      detail: "Total Revenue",
      total: formatNaira(salesReport.summary.revenue),
    },
    {
      icon: listIcon2,
      detail: "Total order",
      total: Number(salesReport.summary.orders || 0).toLocaleString("en-US"),
    },
  ];

  return (
    <div
      style={{
        marginLeft: "14px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Row gutter={[0, 16]}>
        <Col xs={0} md={21} lg={21}>
          {" "}
          <Card
            hoverable
            style={{
              gap: "24px",
              height: "340px",
              display: "flex",

              width: "90%",
              justifyContent: "space-between",
              background: "#FFFFFF",
              borderRadius: "8px",
              border: "1px solid #DEEAEA",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div
                style={{
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "92%",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "24px",
                      fontWeight: 400,
                      lineHeight: "32px",
                      marginBottom: "10px",
                    }}
                  >
                    Sales Report
                  </h5>

                  <nav
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "13px",
                      marginLeft: "10px",
                    }}
                  >
                    {items.map((list) => (
                      <div
                        key={list.detail}
                        style={{
                          fontFamily: "NeueHaasDisplayLight",
                          fontSize: "16px",
                          display: "flex",
                          gap: "5px",
                          fontWeight: 500,
                          lineHeight: "24px",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#055961",
                        }}
                      >
                        <img src={list.icon} alt={list.detail} />
                        <h6 style={{ marginTop: 3 }}>{list.detail}</h6>
                      </div>
                    ))}
                  </nav>
                </div>

                <Chart chartData={salesReport.chart} />
              </div>
              <Card2
                data={items}
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
              />
            </div>
          </Card>
        </Col>
        <Col xs={9} md={14} lg={0}></Col>
        <Col span={2}>
          <Topstores dateRange={dateRange} />
        </Col>
      </Row>
    </div>
  );
};

export default ChartDetail;
