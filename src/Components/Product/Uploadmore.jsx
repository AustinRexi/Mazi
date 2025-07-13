import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      message.error("File upload failed.");
      reject({
        uid: "-5",
        name: "image.png",
        status: "error",
      });
    };
  });

const Uploadmore = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        backgroundColor: "white",
        gap: "8px",

        marginLeft: "4px",
      }}
      type="button"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          width: "150px",
          marginLeft: "5px",
          backgroundColor: "#F1F7F4",
          height: "60px",
          border: "1.5px dashed #3CBCE3",
          borderRadius: "8px",
          boxSizing: "border-box",
          justifyContent: "center",
          padding: "6px 16px 6px 16px",
        }}
      >
        <PlusOutlined style={{ fontSize: "16px" }} />
        <div
          style={{
            color: "#000000",
            lineHeight: "20px",
            fontSize: "16px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Add 3 More
        </div>
      </div>
    </button>
  );

  return (
    <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 4 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "block",
            width: "100%px",
            height: "180px",
            borderRadius: "12px",
            border: "1px solid #2F80ED",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
export default Uploadmore;
