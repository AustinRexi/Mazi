import React from 'react';
import { Row, Col, Card, Tag, Button, Tabs, Divider } from 'antd';
import { CalendarOutlined, LeftOutlined, RightOutlined, EllipsisOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const OrderDetailsHeader = () => {
   return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <h2 style={{ margin: 0 }}>Order #465765322</h2>
                  <div>

                  <Tag color="green" style={{ marginLeft: '10px' }}>Paid</Tag>
                  <Tag color="blue" style={{ marginLeft: '10px' }}>Processing</Tag>
                  </div>
                  <div>
                  <CalendarOutlined style={{ marginLeft: '10px', marginRight: '5px' }} />
                  <span>Feb. 13, 2024 at 10:15 am</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Row gutter={[16, 16]}>
      <Col>
        <Button
          type="default"
          icon={<LeftOutlined />}
          style={{
            backgroundColor: '#f5f7f7',
            color: '#8c8c8c',
            borderColor: '#f5f7f7',
            borderRadius: '8px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Previous
        </Button>
      </Col>
      <Col>
        <Button
          type="default"
          icon={<RightOutlined />}
          style={{
            backgroundColor: '#f5f7f7',
            color: '#8c8c8c',
            borderColor: '#f5f7f7',
            borderRadius: '8px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Next
        </Button>
      </Col>
    </Row>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row justify="space-between" align="middle">
              <Col xs={24} md={20}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Order Details" key="1">
                    {/* Order details content goes here */}
                  </TabPane>
                  <TabPane tab="Track Order" key="2">
                    {/* Track order content goes here */}
                  </TabPane>
                </Tabs>
              </Col>
              <Col xs={24} md={4} style={{ textAlign: 'right', marginTop: '10px' }}>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: 'white', color: 'black', borderColor: 'white', boxShadow: 'none' }}
                >
                Action
                  <EllipsisOutlined rotate={90} />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetailsHeader;