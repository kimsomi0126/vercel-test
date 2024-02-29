import { Modal } from "antd";
import React from "react";
import { OrangeBtn, PinkBtn } from "../../styles/ui/buttons";
import { ModalBody, ModalTitle } from "../../styles/ui/warning";

const ModalTwoBtn = ({
  isOpen,
  handleOk,
  handleCancel,
  title,
  subTitle,
  children,
}) => {
  const modalStyles = {
    footer: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
    },
    body: {
      paddingTop: "2rem",
    },
  };
  return (
    <Modal
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={null}
      width={400}
      footer={[
        <PinkBtn key="submit" type="primary" onClick={handleOk}>
          확인
        </PinkBtn>,
        <OrangeBtn key="back" onClick={handleCancel}>
          취소
        </OrangeBtn>,
      ]}
      styles={modalStyles}
    >
      <ModalTitle>
        <h3>{title}</h3>
        <p>{subTitle}</p>
      </ModalTitle>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalTwoBtn;
