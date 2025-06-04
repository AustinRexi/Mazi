import { useState, useEffect } from "react";
import { Carousel } from "antd";
import Search from "../../Components/Product/Search";
import dayjs from "dayjs";
import Addbutton from "../../Components/Product/Addbutton";
import Calender from "../Dashboard/Calender";
import data from "../../Components/CourierandOrder/data";
import CourierCard from "../../Components/Courier/CourierCard";
import courierdata from "../../Components/Courier/courierdata";
import UserCard from "../../Components/Courier/UserCard";
import { useNavigate } from "react-router-dom";

const getUserCardGridStyles = (width) => {
  const baseStyles = {
    width: "100%",
    maxWidth: "1030px",
    margin: "14px auto 0 auto",
    display: "grid",
    gap: "8px",
    gridTemplateRows: "auto",
    padding: 0,
  };

  if (width <= 480) {
    return {
      ...baseStyles,
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      maxWidth: "100%",
      marginTop: 40,
    };
  } else if (width <= 768) {
    return {
      ...baseStyles,
      gridTemplateColumns: "repeat(2, 1fr)",
    };
  } else {
    return {
      ...baseStyles,
      gridTemplateColumns: "repeat(4, 1fr)",
    };
  }
};

const styles = {
  container: { padding: "15px" },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "19px",
    flexWrap: "wrap",
  },
  searchBox: {
    width: "531px",
    height: "45px",
    borderRadius: "16px",
    border: "1px solid #B5C3C3",
    padding: "0 16px",
  },
  calendar: {
    height: "48px",
    cursor: "pointer",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    marginTop: "40px",
    width: "104%",
    maxWidth: "1080px",
    padding: 14,
  },
  carouselContainer: {
    marginTop: "40px",
    width: "100%",
    padding: 14,
  },
  h: {
    fontWeight: 600,
    lineHeight: "32px",
    textAlign: "left",
    fontSize: "24px",
    margin: "0",
  },
};

const presets = [
  { label: "Date Joined", value: dayjs().add(-1, "month") },
  { label: "Active", value: dayjs().subtract(3, "month") },
  { label: "Busy", value: dayjs().subtract(6, "month") },
  { label: "Offline", value: dayjs().add(-1, "month") },
];

const Courier = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddButtonClick = () => {
    navigate("/addproduct");
  };

  const onCarouselChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const userCardGridStyles = getUserCardGridStyles(windowWidth);

  const renderCourierList = () => {
    if (windowWidth < 780) {
      return (
        <Carousel
          afterChange={onCarouselChange}
          dots={true}
          slidesToShow={2}
          slidesToScroll={1}
          infinite={false}
          style={{
            width: "100%",
            marginTop: "40px",
            padding: "14px",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                width: "50%",
                padding: "0 5px",
                display: "inline-block",
              }}
            >
              <CourierCard item={item} />
            </div>
          ))}
        </Carousel>
      );
    } else {
      return (
        <div style={styles.listContainer}>
          {data.map((item, index) => (
            <CourierCard key={index} item={item} />
          ))}
        </div>
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.h}>Courier</h3>
        <Search
          placeholder="Search couriers"
          style={{
            ...styles.searchBox,
            width: windowWidth <= 480 ? "100%" : "531px",
          }}
        />
        <Addbutton text="Add Courier" onClick={handleAddButtonClick} />
        <Calender placeholder="Active" data={presets} style={styles.calendar} />
      </div>

      {renderCourierList()}

      <div style={userCardGridStyles}>
        {courierdata.map((data, index) => (
          <UserCard datas={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Courier;
