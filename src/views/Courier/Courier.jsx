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
      width: "100%",
      padding: "20px",
      maxWidth: "100%",
    },

    header: {
      display: "flex",
      alignItems: "center",
      gap: "19px",
         
    },

    searchBox: {
      width: "100%",
      height: "45px",
      borderRadius: "16px",
      border: "1px solid #B5C3C3",
      padding: "0 16px",
      margin: "0"
    },

    MobilesearchBox: {
      marginLeft: "0",
      width: "100%",
      height: "45px",
      borderRadius: "16px",
      border: "1px solid #B5C3C3",
      padding: "0 16px",
    },

    ipadsearchBox: {
      marginLeft: "0",
      width: "400px",
      height: "45px",
      borderRadius: "16px",
      border: "1px solid #B5C3C3",
      padding: "0 16px",
    },

    calendar: {
      height: "44px",
    },

    listContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "16px",
      marginTop: "40px",
      width: "100%",
      background: "#FFFFFF",
    },

    userCardGrid: {
      width: "100%",
      marginTop: "10px",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(4, auto)",
      gap: "10px",
    },

    ipaduserCardGrid: {
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(3, auto)",
      gap: "16px",
    },

    tabletuserCardGrid: {
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, auto)",
      gap: "16px",
    },

    MobileuserCardGrid: {
      width: "100%",
      marginTop: "20px",
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gridTemplateRows: "repeat(1, auto)",
      gap: "16px",
    },

    h: {
      fontWeight: 600,
      lineHeight: "32px",
      textAlign: "left",
      fontSize: "24px",
    
    },
  };

  return (
    <>
      {/* Desktop view */}
      <div className="desktop-courier" style={styles.container}>
        <div className="header" style={styles.header}>
          <h3 style={styles.h}>Courier </h3>
          
          <div style={{width: "100%"}}>
          <Search placeholder="Search couriers" style={styles.searchBox} />
          </div>
         
          <Addbutton text="Add Courier" />

          <Calender
            placeholder="Active"
            data={presets}
            style={styles.calendar}
          />
        </div>

        <div style={{width: "100%"}}>
        <div style={styles.listContainer}>
          {data.map((item, index) => (
            <CourierCard key={index} item={item} />
          ))}
        </div>
        </div>


        <div style={styles.userCardGrid}>
          {courierdata.map((data, index) => (
            <UserCard datas={data} key={index} />
          ))}
        </div>
      </div>

      {/* ipad view */}
      <div className="ipad-courier container">
        <div>
          <div>
            <h3 style={styles.h}>Courier</h3>
          </div>

          <div className="first-col">
            <Search
              placeholder="Search couriers"
              style={styles.ipadsearchBox}
            />

            <Addbutton text="Add Courier" />

            <Calender
              placeholder="Active"
              data={presets}
              style={styles.calendar}
            />
          </div>
        </div>

        <div style={styles.ipaduserCardGrid}>
          {courierdata.map((data, index) => (
            <UserCard datas={data} key={index} />
          ))}
        </div>
      </div>

      {/* tablet view */}
      <div className="tablet-courier container">
        <div>
          <div className="">
            <h3 style={styles.h}>Courier</h3>

            <Search
              placeholder="Search couriers"
              style={styles.MobilesearchBox}
            />
          </div>

          <div className="first-col">
            <Addbutton text="Add Courier" />

            <Calender
              placeholder="Active"
              data={presets}
              style={styles.calendar}
            />
          </div>
        </div>

        <div style={styles.tabletuserCardGrid}>
          {courierdata.map((data, index) => (
            <UserCard datas={data} key={index} />
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="mobile-courier container">
        <div className="mobile-header">
          <div>
            <h3 style={styles.h}>Courier</h3>

            <Search
              placeholder="Search couriers"
              style={styles.MobilesearchBox}
            />
          </div>

          <div className="first-col">
            <Addbutton text="Add Courier" />

            <Calender
              placeholder="Active"
              data={presets}
              style={styles.calendar}
            />
          </div>
        </div>

        <div style={styles.MobileuserCardGrid}>
          {courierdata.map((data, index) => (
            <UserCard datas={data} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Courier;
