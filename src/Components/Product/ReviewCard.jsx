import { Card, Rate, Avatar, Row, Col, Space, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import options from "../../Assets/Couriericons/options.svg";
import dp from "../../Assets/Ordericons/displayimageicon.svg";

const ReviewCard = () => {
  const users = [
    {
      name: "Ibrahim Fatai",
      avatarUrl: dp,
      rating: 4,
      comment:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      likes: 1500,
      dislikes: 1500,
      replies: 14,
      date: "2023-09-01T14:12:00",
    },
    {
      name: "Ibrahim Fatai",
      avatarUrl: dp,
      rating: 5,
      comment:
        "Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
      likes: 1200,
      dislikes: 300,
      replies: 10,
      date: "2023-08-25T10:15:00",
    },
  ];

  return (
    <>
      {users.map((user, index) => (
        <Card key={index} style={{ border: "none", marginBottom: "20px" }}>
          <Row gutter={16}>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                right: 22,
              }}
              flex="auto"
            >
              <Avatar size="large" src={user.avatarUrl} />
              <strong>{user.name}</strong>
              <Rate
                defaultValue={user.rating}
                disabled
                style={{ marginLeft: 80 }}
              />
              <img src={options} alt="options" />
            </Col>
            <Col flex="auto" style={{ marginLeft: 18 }}>
              <Space direction="vertical">
                <Row justify="space-between">
                  <Space>
                    <span style={{ marginBottom: 10 }}>
                      {dayjs(user.date).format("MMMM D, YYYY")} (edited)
                    </span>
                  </Space>
                </Row>
              </Space>
              <p style={{ marginTop: "10px" }}>{user.comment}</p>
              <Row justify="start" align="middle" gutter={24}>
                <Col>
                  <Button
                    type="link"
                    icon={<LikeOutlined />}
                    style={{ color: "grey" }}
                  >
                    {user.likes > 1000
                      ? `${(user.likes / 1000).toFixed(1)}k`
                      : user.likes}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="link"
                    icon={<DislikeOutlined />}
                    style={{ color: "grey" }}
                  >
                    {user.dislikes > 1000
                      ? `${(user.dislikes / 1000).toFixed(1)}k`
                      : user.dislikes}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="link"
                    icon={<CommentOutlined />}
                    style={{ color: "grey" }}
                  >
                    ({user.replies})
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default ReviewCard;
