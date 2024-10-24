import { message, Upload } from "antd";
import Uploadimg from "../../utils/icons/Uploadimg.svg";
import Uploadmore from "../../Components/Product/Uploadmore";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const Uploadimage = () => (
  <div 
  
>
    <h3 style={{ fontWeight: 600, fontSize: "24px", lineHeight: "32px", textAlign: "center" }}>
      Product Image
    </h3>

    <h4 style={{ fontWeight: 600, fontSize: "16px", lineHeight: "24px", textAlign: "center" }}>
      Cover Image Here
    </h4>

    <Dragger 
      {...props}
      className="custom-dragger"
      style={{ border: "none", backgroundColor: "white", }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F1F7F4",
          border: "1px dashed #2F80ED",
          borderRadius: "12px",
        }}
      >
        <img src={Uploadimg} alt="Upload" />
        <p
          style={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#1D1D1D",
            height: "30px",
            borderRadius: "16px 16px 0px 0px",
            textAlign: "center",
          }}
        >
          Drag and drop files here
        </p>
        <p
          style={{
            margin: 0,
            color: "#646464",
            lineHeight: "24px",
            fontSize: "16px",
            backgroundColor: "#E5EEF9",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          Click Here To Upload
        </p>
      </div>
    </Dragger>

    <h3
      style={{
        fontWeight: 600,
        fontSize: "16px",
        lineHeight: "24px",
         textAlign: "center"
      }}
    >
      Upload Other Images Here{" "}
    </h3>

    <Uploadmore />
  </div>
);
export default Uploadimage;
