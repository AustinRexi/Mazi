import allcouriers from "../../Assets/Couriericons/allcouriers.svg";
import car from "../../Assets/Couriericons/car.svg";
import motorcycle from "../../Assets/Couriericons/motorcycle.svg";
import bicycle from "../../Assets/Couriericons/bicycle.svg";
import foot from "../../Assets/Couriericons/foot.svg";
import active from "../../Assets/Ordericons/active.svg";
import pending from "../../Assets/Ordericons/pending.svg";
import cancel from "../../Assets/Ordericons/cancel.svg";
import refunded from "../../Assets/Ordericons/refunded.svg";
import complete from "../../Assets/Ordericons/complete.svg";
const data = [
  {
    courier: {
      title: "All Couriers",
      icon: allcouriers,
    },
    order: {
      description: "Active",
      icon: active,
      amount: "12220",
      color: "#127A99",
    },
  },
  {
    courier: {
      title: "CAR",
      icon: car,
    },
    order: {
      description: "Pending",
      icon: pending,
      amount: "12220",
      color: "#D76514",
    },
  },
  {
    courier: {
      title: "MOTORCYCLE",
      icon: motorcycle,
    },
    order: {
      description: "Cancelled",
      icon: cancel,
      amount: "12220",
      color: "#E72529",
    },
  },
  {
    courier: {
      title: "BICYCLE",
      icon: bicycle,
    },
    order: {
      description: "Refunded",
      icon: refunded,
      amount: "12220",
      color: "#2A2F2F",
    },
  },
  {
    courier: {
      title: "FOOT",
      icon: foot,
    },
    order: {
      description: "Completed",
      icon: complete,
      amount: "12220",
      color: "#0B9843",
    },
  },
];
export default data;
