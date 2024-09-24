import { Card, Row, Col, Image } from "antd";
import coverimage from "../../Assets/Productimages/coverimage.svg";
import image1 from "../../Assets/Productimages/image1.svg";
import image2 from "../../Assets/Productimages/image2.svg";
import image3 from "../../Assets/Productimages/image3.svg";
import image4 from "../../Assets/Productimages/image4.svg";
const ImageCard = () => {
  const images = [coverimage, image1, image2, image3, image4];
  return (
    <Card
      style={{ width: 500 }}
      cover={<Image alt="Jollof Rice" src={images[0]} />}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Image width={100} src={images[1]} alt="Jollof Rice Thumbnail 1" />
        </Col>
        <Col span={6}>
          <Image width={100} src={images[2]} alt="Jollof Rice Thumbnail 2" />
        </Col>
        <Col span={6}>
          <Image width={100} src={images[3]} alt="Jollof Rice Thumbnail 3" />
        </Col>
        <Col span={6}>
          <Image width={100} src={images[4]} alt="Jollof Rice Thumbnail 4" />
        </Col>
      </Row>
    </Card>
  );
};

export default ImageCard;
