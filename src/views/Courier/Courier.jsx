import Search from "../../Components/Product/Search";
import dayjs from "dayjs";
import Addbutton from "../../Components/Product/Addbutton";
import Calender from "../Dashboard/Calender";
import data from "../../Components/CourierandOrder/data";
import CourierCard from "../../Components/Courier/CourierCard";
import courierdata from "../../Components/Courier/courierdata";
import UserCard from "../../Components/Courier/UserCard";

const Courier = () => {
  const presets = [
    { label: "Date Joined", value: dayjs().add(-1, "month") },
    { label: "Active", value: dayjs().subtract(3, "month") },
    { label: "Busy", value: dayjs().subtract(6, "month") },
    { label: "Offline", value: dayjs().add(-1, "month") },
  ];

  const styles = {
    container: {
      padding: "20px",
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    searchBox: {
      width: "400px",
      height: "45px",
      borderRadius: "16px",
      border: "1px solid #B5C3C3",
      padding: "0 16px",
    },
    calendar: {
      marginTop: "12px",
      height: "38px",
    },
    listContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      marginTop: "20px",
      width: "1000px",
      background: "#FFFFFF",
    },
    userCardGrid: {
      marginTop: "10px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(4, auto)",
      gap: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Courier</h3>
        <Search placeholder="Search couriers" style={styles.searchBox} />
        <Addbutton text="Add Courier" />
        <Calender placeholder="Active" data={presets} style={styles.calendar} />
      </div>
      <div style={styles.listContainer}>
        {data.map((item, index) => (
          <CourierCard key={index} item={item} />
        ))}
      </div>
      <div style={styles.userCardGrid}>
        {courierdata.map((data, index) => (
          <UserCard datas={data} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Courier;
