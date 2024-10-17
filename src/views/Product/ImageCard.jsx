import { Card, Row, Button, Col, Image } from "antd";
import coverimage from "../../Assets/Productimages/coverimage.svg";
import image1 from "../../Assets/Productimages/image1.svg";
import image2 from "../../Assets/Productimages/image2.svg";
import image3 from "../../Assets/Productimages/image3.svg";
import image4 from "../../Assets/Productimages/image4.svg";

const ImageCard = () => {
  const images = [coverimage, image1, image2, image3, image4];

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 190,

          marginBottom: 20,
        }}
      >
        <Button
          style={{
            border: "none",
            height: "40px",
            width: "108px",
            marginRight: 8,
            color: "#969696",
            backgroundColor: "#F8FBFB",

            gap: "8px",
          }}
        >
          &laquo; Prev
        </Button>
        <Button
          style={{
            height: "40px",
            width: "108px",
            borderRadius: "8px",
            gap: "8px",

            marginRight: 8,
            backgroundColor: " #EBF0ED",
            color: "#969696",
          }}
        >
          Next &raquo;
        </Button>
      </div>
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
