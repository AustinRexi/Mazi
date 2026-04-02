import { Typography } from "antd";

function Address({
  title,
  style,
  info,
  addressLine1,
  addressLine2,
  note,
  hideNote = false,
}) {
  const displayTitle = title ?? "Address";
  const additionalInfo = info ?? "";
  const line1 = addressLine1 || "17 Simbiat Abiola Way";
  const line2 = addressLine2 || "Ikeja, Lagos";
  const addressNote =
    note || "Street Opposite Access Bank beside the yellow mall.";
  return (
    <div>
      <Typography.Text strong style={{ ...style }}>
        {displayTitle}
      </Typography.Text>
      <div style={{ marginTop: 8 }}>
        <Typography.Text>{line1}</Typography.Text>
        <br />
        <Typography.Text style={{ marginBottom: 4 }}>{line2}</Typography.Text>
        <br />
        <Typography.Text style={{ marginTop: 4 }}>
          {additionalInfo}
        </Typography.Text>

        {!hideNote ? (
          <Typography.Paragraph
            style={{
              width: "256px",
              marginTop: 8,
              border: "1px solid #B5C3C3",
              borderRadius: "12px",
              padding: 6,
            }}
          >
            {addressNote}
          </Typography.Paragraph>
        ) : null}
      </div>
    </div>
  );
}

export default Address;
