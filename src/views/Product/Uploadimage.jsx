import { message, Upload } from "antd";
import { useState } from "react"; // Import useState for file list management
import Uploadimg from "../../utils/icons/Uploadimg.svg";
import Uploadmore from "../../Components/Product/Uploadmore";
const { Dragger } = Upload;

// Function to determine drag text based on window width
const dragText = () => {
  return window.innerWidth < 700 ? "" : "Drag and drop files here";
};

const Uploadimage = () => {
  const [fileList, setFileList] = useState([]); // State to manage file list

  const props = {
    name: "file",
    multiple: true,
    maxCount: 3, // Set maximum number of files
    fileList, // Bind fileList state to Upload component
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status, fileList: newFileList } = info.file;

      // Update fileList state
      setFileList(newFileList);

      // Check if fileList exceeds 3 files
      if (newFileList.length > 3) {
        message.error("Maximum 3 files can be uploaded.");
        return;
      }

      if (status !== "uploading") {
        console.log(info.file, newFileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
      // Validate dropped files
      if (e.dataTransfer.files.length + fileList.length > 3) {
        message.error("Cannot upload more than 3 files.");
      }
    },
    beforeUpload(file, newFiles) {
      // Check total files before uploading
      const totalFiles = newFiles.length + fileList.length;
      if (totalFiles > 3) {
        message.error("Cannot upload more than 3 files.");
        return false; // Prevent upload
      }
      return true;
    },
  };

  return (
    <div>
      <h3 style={{ fontWeight: 400, fontSize: "24px", lineHeight: "32px" }}>
        Product Image
      </h3>
      <h4 style={{ fontWeight: 400, fontSize: "16px", lineHeight: "24px" }}>
        Cover Image Here
      </h4>
      <Dragger
        {...props}
        className="custom-dragger"
        style={{ border: "none", backgroundColor: "white", right: "14px" }}
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
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#1D1D1D",
              height: "30px",
              borderRadius: "16px 16px 0px 0px",
              textAlign: "center",
            }}
          >
            {dragText()} {/* Call the function */}
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
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
          marginLeft: "8px",
        }}
      >
        Upload Other Images Here
      </h3>
      <Uploadmore />
    </div>
  );
};

export default Uploadimage;
