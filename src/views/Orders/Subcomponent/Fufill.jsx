import React, { useState } from "react";
import { Button, Modal } from "antd";
const Fufill = ({ showModal, handleOk, handleCancel }) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default Fufill;
