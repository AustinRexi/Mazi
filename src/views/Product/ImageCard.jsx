import { Card, Row, Col, Image } from "antd";
import coverimage from "../../Assets/Productimages/coverimage.svg";
import image1 from "../../Assets/Productimages/image1.svg";
import image2 from "../../Assets/Productimages/image2.svg";
import image3 from "../../Assets/Productimages/image3.svg";
import image4 from "../../Assets/Productimages/image4.svg";

const ImageCard = () => {
  const images = [coverimage, image1, image2, image3, image4];

  return (
    <>
      <Card
        style={{ width: 490 }}
        cover={<Image alt="Jollof Rice" src={images[0]} />}
      >
        <Row gutter={16}>
          {images.slice(1).map((image, index) => (
            <Col xs={5} md={6} lg={6} key={index}>
              <Image
                width={96}
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
