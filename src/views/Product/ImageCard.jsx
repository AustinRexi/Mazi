import { Card, Row, Col, Image } from "antd";
import coverimage from "../../Assets/Productimages/coverimage.svg";
import image1 from "../../Assets/Productimages/image1.svg";
import image2 from "../../Assets/Productimages/image2.svg";
import image3 from "../../Assets/Productimages/image3.svg";
import image4 from "../../Assets/Productimages/image4.svg";
import PrevandNext from "../../Components/shared/PrevandNext";

const ImageCard = () => {
  const images = [coverimage, image1, image2, image3, image4];

  return (
    <>
      <Row gutter={[50, 20]} style={{ marginBottom: "10px" }}>
        <Col span={12}></Col>
        <Col span={12}>
          <PrevandNext />
        </Col>
      </Row>
      <Card
        style={{ width: 500 }}
        cover={<Image alt="Jollof Rice" src={images[0]} />}
      >
        <Row gutter={16}>
          {images.slice(1).map((image, index) => (
            <Col span={6} key={index}>
              <Image
                width={100}
                src={image}
                alt={`Jollof Rice Thumbnail ${index + 1}`}
              />
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default ImageCard;
