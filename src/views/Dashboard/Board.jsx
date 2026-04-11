import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Typography, Row, Col } from "antd";
import Calender from "./Calender";
import ChartDetail from "./ChartDetail";
import Cardcomponent from "./Cardcomponent";
import waveIcon from "../../utils/icons/emoji-wave.svg";
import { fetchAdminUsers } from "../../services/adminUserService";
import { fetchAdminOrderCards } from "../../services/adminOrderService";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "../../utils/adminCountryScope";

const { Title } = Typography;

const Board = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalWalletAmount, setTotalWalletAmount] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(() =>
    getAdminCountryScope()
  );
  const [productBreakdown, setProductBreakdown] = useState({
    foods: 0,
    groceries: 0,
    drinks: 0,
  });
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(11, "month").startOf("month"),
    dayjs().endOf("month"),
  ]);

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

    const loadDashboardSummary = async () => {
        const loadUsers = async () => {
          try {
            return await fetchAdminUsers({
              usertype: "",
              per_page: 1,
              page: 1,
              country: selectedCountry,
              date_from: dateRange?.[0]?.format("YYYY-MM-DD"),
              date_to: dateRange?.[1]?.format("YYYY-MM-DD"),
            });
          } catch (_) {
            return fetchAdminUsers({
              usertype: "",
              per_page: 1,
              page: 1,
              date_from: dateRange?.[0]?.format("YYYY-MM-DD"),
              date_to: dateRange?.[1]?.format("YYYY-MM-DD"),
            });
          }
        };

      const [usersResult, ordersResult] = await Promise.allSettled([
        loadUsers(),
        fetchAdminOrderCards({
          per_page: 1,
          country: selectedCountry,
          date_from: dateRange?.[0]?.format("YYYY-MM-DD"),
          date_to: dateRange?.[1]?.format("YYYY-MM-DD"),
        }),
      ]);

      if (!isMounted) {
        return;
      }

      const usersResponse =
        usersResult.status === "fulfilled" ? usersResult.value : null;
      const ordersResponse =
        ordersResult.status === "fulfilled" ? ordersResult.value : null;

      setTotalUsers(Number(usersResponse?.total || 0));
      setTotalWalletAmount(Number(ordersResponse?.wallet?.total_amount || 0));
      setGrossProfit(Number(ordersResponse?.gross_profit || 0));
      setTotalProducts(Number(ordersResponse?.total_products || 0));
      setProductBreakdown({
        foods: Number(ordersResponse?.product_breakdown?.foods || 0),
        groceries: Number(ordersResponse?.product_breakdown?.groceries || 0),
        drinks: Number(ordersResponse?.product_breakdown?.drinks || 0),
      });
    };

    loadDashboardSummary().catch(() => {
      if (!isMounted) {
        return;
      }

      setTotalUsers(0);
      setTotalWalletAmount(0);
      setGrossProfit(0);
      setTotalProducts(0);
      setProductBreakdown({
        foods: 0,
        groceries: 0,
        drinks: 0,
      });
    });

    return () => {
      isMounted = false;
    };
  }, [dateRange, selectedCountry]);

  return (
    <section
      style={{
        backgroundColor: "#F8FBFB",
      }}
    >
      <Row gutter={[30, 20]} style={{ padding: 10 }}>
        <Col xs={24} md={19} lg={19}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginLeft: 10,
            }}
          >
            <Title
              level={5}
              style={{
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "32px",
                fontFamily: "NeueHaasDisplayBold",
                whiteSpace: "nowrap",
              }}
            >
              Hello Tunde
            </Title>
            <img
              style={{ marginBottom: "6px" }}
              src={waveIcon}
              alt="wave icon"
            />
          </div>
        </Col>
        <Col xs={10} md={5}>
          <Calender
            isRange
            needConfirm
            value={dateRange}
            onChange={(value) => {
              if (!value || value.length !== 2) {
                setDateRange([
                  dayjs().subtract(11, "month").startOf("month"),
                  dayjs().endOf("month"),
                ]);
                return;
              }

              setDateRange(value);
            }}
          />
        </Col>
      </Row>
      <div style={{ marginRight: 50 }}>
        <Cardcomponent
          totalUsers={totalUsers}
          totalWalletAmount={totalWalletAmount}
          grossProfit={grossProfit}
          totalProducts={totalProducts}
          productBreakdown={productBreakdown}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        {" "}
        <ChartDetail
          dateRange={dateRange}
          onDateRangeChange={(value) => {
            if (!value || value.length !== 2) {
              setDateRange([
                dayjs().subtract(11, "month").startOf("month"),
                dayjs().endOf("month"),
              ]);
              return;
            }
            setDateRange(value);
          }}
        />
      </div>
    </section>
  );
};

export default Board;
