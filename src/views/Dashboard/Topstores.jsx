import { useEffect, useState } from "react";
import { Avatar, List, Card } from "antd";
import { fetchAdminStores } from "../../services/adminStoreService";
import {
  ADMIN_COUNTRY_SCOPE_EVENT,
  getAdminCountryScope,
} from "../../utils/adminCountryScope";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");

const resolveStoreImage = (banner) => {
  if (!banner) {
    return null;
  }

  if (/^https?:\/\//i.test(banner)) {
    return banner;
  }

  const normalized = String(banner).replace(/^\/+/, "");
  return `${API_ORIGIN}/storage/${normalized}`;
};

const Topstores = () => {
  const [stores, setStores] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(() =>
    getAdminCountryScope()
  );

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

    const loadTopStores = async () => {
      try {
        const response = await fetchAdminStores({
          per_page: 5,
          sort_by: "orders_desc",
          country: selectedCountry,
        });

        if (!isMounted) {
          return;
        }

        const topStores = Array.isArray(response?.data)
          ? response.data.slice(0, 5).map((store) => ({
              id: store.id,
              title: store.restaurant_name || "Unnamed Store",
              ordersLabel: `${Number(store.orders_count || 0).toLocaleString(
                "en-US"
              )} orders`,
              image: resolveStoreImage(store.restaurant_banner),
            }))
          : [];

        setStores(topStores);
      } catch (_) {
        if (!isMounted) {
          return;
        }

        setStores([]);
      }
    };

    loadTopStores();

    return () => {
      isMounted = false;
    };
  }, [selectedCountry]);

  return (
    <Card
      hoverable
      style={{
        width: 240,
        minHeight: "340px",
        margin: 4,
        right: "50px",
      }}
    >
      <header
        style={{
          fontWeight: 400,
          fontSize: "24px",
          lineHeight: "32px",
          marginBottom: "12px",
        }}
      >
        Top Stores
      </header>
      <List
        itemLayout="horizontal"
        dataSource={stores}
        locale={{ emptyText: "No stores found" }}
        renderItem={(item) => (
          <List.Item style={{ borderBottom: "none", padding: 4 }}>
            <List.Item.Meta
              avatar={<Avatar src={item.image}>{item.title.charAt(0)}</Avatar>}
              title={
                <span
                  style={{
                    fontFamily: "NeueHaasDisplayRoman",
                    lineHeight: "24px",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </span>
              }
              description={
                <span
                  style={{
                    fontSize: "12px",
                    lineHeight: "16px",
                    fontWeight: 500,
                    fontFamily: "NeueHaasDisplayRoman",
                    color: "#2A2F2F",
                  }}
                >
                  {item.ordersLabel}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Topstores;
