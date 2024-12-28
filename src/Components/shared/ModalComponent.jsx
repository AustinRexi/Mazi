import { Modal } from "antd";
import ReactDOM from "react-dom";

function ModalComponent({
  isVisible,
  style,
  hideModal,
  wrapClassName = "green-modal",
  bodyStyle = {},
  children,
}) {
  const portalRoot = document.getElementById("portal-root");

  return ReactDOM.createPortal(
    <>
      <style>
        {`
          @keyframes blink {
            50% { opacity: 0; }
          }
          .green-modal .ant-modal-content {
            background-color: #006D75 !important;
          }
      

      .custom-modal .ant-modal-content {
        background-color: transparent !important; /* Ensure no background */
        border: none !important; /* Remove border */
      }

      
        `}
      </style>
      <Modal
        open={isVisible}
        onOk={hideModal}
        onCancel={hideModal}
        wrapClassName={wrapClassName || undefined}
        footer={null}
        closable={false}
        maskClosable={false}
        style={{
          top: 20,
          right: 20,
          position: "absolute",
          ...style,
        }}
        bodyStyle={bodyStyle}
      >
        {children}
      </Modal>
    </>,
    portalRoot
  );
}

export default ModalComponent;
