import { Card, Row, Col, Image } from "antd";
import coverimage from "../../Assets/Productimages/coverimage.svg";
import image1 from "../../Assets/Productimages/image1.svg";
import image2 from "../../Assets/Productimages/image2.svg";
import image3 from "../../Assets/Productimages/image3.svg";
import image4 from "../../Assets/Productimages/image4.svg";

const ImageCard = () => {
  const images = [
    { src: coverimage, alt: "Jollof Rice Cover" },
    { src: image1, alt: "Jollof Rice Thumbnail 1" },
    { src: image2, alt: "Jollof Rice Thumbnail 2" },
    { src: image3, alt: "Jollof Rice Thumbnail 3" },
    { src: image4, alt: "Jollof Rice Thumbnail 4" },
  ];

  return (
    <Card
      style={{ width: "100%", maxWidth: 490 }} // Responsive width
      cover={<Image alt={images[0].alt} src={images[0].src} />}
    >
      <Row gutter={[16, 16]}>
        {images.slice(1).map((image, index) => (
          <Col xs={6} md={6} lg={6} key={image.src}>
            {" "}
            {/* Use src as key for uniqueness */}
            <Image
              width="100%" // Responsive width
              style={{ maxWidth: 96 }} // Cap width for consistency
              src={image.src}
              alt={image.alt}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ImageCard;
