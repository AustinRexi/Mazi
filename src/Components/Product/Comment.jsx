import { Flex, Button, Divider, Input } from "antd";
import { useState } from "react";
import commentimg from "../../Assets/Lineicons/commentimg.svg";
import filter from "../../Assets/Lineicons/Filter.svg";
import send from "../../Assets/Lineicons/send.svg";
import ReviewCard from "./ReviewCard";

const { TextArea } = Input;

const Comment = () => {
  const [position, setPosition] = useState("end");
  const review = "160 Reviews";
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <Flex style={{ alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "16px", lineHeight: "24px" }}>
          {review}
        </span>

        <Button
          icon={<img src={filter} alt="Filter icon" />}
          iconPosition={position}
          style={{
            marginLeft: "auto",
            border: "none",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "16px",
          }}
        >
          Filter comments
        </Button>
      </Flex>
      <Divider />
      <Flex style={{ gap: 10 }}>
        <img src={commentimg} alt="Comment icon" />
        <TextArea
          placeholder="Leave a comment"
          style={{
            marginTop: 8,
            width: 250,
            borderRadius: 14,
            border: "1px solid #DEEAEA",
            boxShadow: isFocused ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
            transition: "box-shadow 0.3s ease",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Button
          icon={<img src={send} alt="Filter icon" />}
          iconPosition={position}
          type="primary"
          style={{
            borderRadius: "32px",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "16px",
            marginTop: 6,
          }}
        >
          Post
        </Button>
      </Flex>
      <ReviewCard />
    </div>
  );
};

export default Comment;
