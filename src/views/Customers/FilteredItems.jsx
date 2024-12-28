import { useState } from "react";
import { Menu, Calendar, Button } from "antd";
import dayjs from "dayjs";
import Filterbutton from "../../Components/Product/Filterbutton";
import prev from "../../Assets/Calendaricon/prev.svg";
import next from "../../Assets/Calendaricon/next.svg";

const FilteredItems = ({ style }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs("2023-02-17"));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilterApply = (selectedFilterData) => {
    setFilterData(selectedFilterData);
    console.log("Filter applied:", selectedFilterData);
  };

  const filterOptions = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  const filterMenu = (
    <Menu
      style={{
        width: "250px",
        padding: "10px",
      }}
    >
      <Menu.Item
        key="1"
        style={{
          padding: "8px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        Date Joined
      </Menu.Item>
      <Menu.Item
        key="2"
        style={{
          padding: "8px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        Name
      </Menu.Item>
      <Menu.Item
        key="3"
        style={{
          padding: "8px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        Email
      </Menu.Item>
      <Menu.Item
        key="4"
        style={{
          padding: "8px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        Verified
      </Menu.Item>

      <div
        style={{
          padding: "10px 0",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Calendar
          fullscreen={false}
          value={selectedDate}
          onSelect={handleDateChange}
          headerRender={({ value, onChange }) => {
            const currentMonth = value.format("MMMM YYYY");

            const prevMonth = () => {
              const prev = value.subtract(1, "month");
              onChange(prev);
            };

            const nextMonth = () => {
              const next = value.add(1, "month");
              onChange(next);
            };

            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                {" "}
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "28px",
                    fontWeight: 600,
                    color: "#EA4E4B",
                  }}
                >{`${currentMonth} >`}</span>
                <Button type="link" onClick={prevMonth}>
                  <img src={prev} alt="previous" />
                </Button>
                <Button type="link" onClick={nextMonth}>
                  <img src={next} alt="next" />
                </Button>
              </div>
            );
          }}
          style={{
            border: "none",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        <Button
          type="link"
          onClick={() => setSelectedDate(null)}
          style={{
            color: "#008080",
          }}
        >
          Reset
        </Button>
        <Button
          type="primary"
          onClick={() => console.log("Date Selected:", selectedDate)}
          style={{
            backgroundColor: "#FF8C00",
            borderColor: "#FF8C00",
          }}
        >
          Done
        </Button>
      </div>
    </Menu>
  );

  return (
    <>
      <Filterbutton
        data={filterOptions}
        overlay={filterMenu}
        onFilterApply={handleFilterApply}
        style={{ ...style }}
      />
    </>
  );
};

export default FilteredItems;
