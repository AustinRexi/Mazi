import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Card, Col, Row, Image, Button, Typography, Divider } from "antd";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import OrderDetailsHeader from "./OrderDetailsHeader";

const { Title, Text } = Typography;

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const Wallet = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.3792, 6.5244], // Longitude and Latitude of Lagos, Nigeria
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat([3.3792, 6.5244]).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <OrderDetailsHeader />
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <div
              ref={mapContainer}
              style={{ width: "100%", height: "400px" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Order Progress">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <EnvironmentOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Ink Shop Groceries
                </Title>
                <Text>Courier has confirmed and picked up product</Text>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <EnvironmentOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Azaman Store
                </Title>
                <Text>Courier picking product</Text>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <EnvironmentOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Usman Salawatu
                </Title>
              </div>
            </div>
          </Card>
          <Card title="Courier" style={{ marginTop: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Image
                src="path/to/courier-image.png"
                alt="Courier"
                width={50}
                height={50}
                style={{ borderRadius: "50%", marginRight: "10px" }}
              />
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Tiamiyu Wasiu
                </Title>
                <Text>4.8 (196)</Text>
              </div>
            </div>
            <Divider />
            <div style={{ marginBottom: "10px" }}>
              <MailOutlined style={{ marginRight: "10px" }} />
              <Text>tiamiyu.wo@gmail.com</Text>
              <br />
              <PhoneOutlined style={{ marginRight: "10px" }} />
              <Text>08160178711</Text>
              <br />
              <Button type="primary" style={{ marginRight: "10px" }}>
                Message
              </Button>
              <Button type="default">Call</Button>
            </div>
            <Divider />
            <div style={{ marginBottom: "10px" }}>
              <Text>Vehicle: Toyota Corolla</Text>
              <br />
              <Text>Color: Brown</Text>
              <br />
              <Text>Vehicle No: 5JYU78</Text>
            </div>
            <Divider />
            <div>
              <Text>Delivery Address: 17 Simbiat Abiola Way, Ikeja, Lagos</Text>
              <br />
              <Text>
                Additional Info: Street Opposite Access Bank beside the yellow
                mall.
              </Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Wallet;
