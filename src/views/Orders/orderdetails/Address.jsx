import { Typography } from "antd";

function Address({ title, style, info }) {
  const displayTitle = title ?? "Address";
  const additionalInfo = null ?? info;
  return (
    <div>
      <Typography.Text strong style={{ ...style }}>
        {displayTitle}
      </Typography.Text>
      <div style={{ marginTop: 8 }}>
        <Typography.Text>17 Simbiat Abiola Way</Typography.Text>
        <br />
        <Typography.Text style={{ marginBottom: 4 }}>
          Ikeja, Lagos
        </Typography.Text>
        <br />
        <Typography.Text style={{ marginTop: 4 }}>
          {additionalInfo}
        </Typography.Text>

        <Typography.Paragraph
          style={{
            width: "256px",
            marginTop: 8,
            border: "1px solid #B5C3C3",
            borderRadius: "12px",
            padding: 6,
          }}
        >
          Street Opposite Access Bank beside the yellow mall.
        </Typography.Paragraph>
      </div>
    </div>
  );
}

export default Address;
