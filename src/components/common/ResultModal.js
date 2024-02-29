import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
const { confirm, warning, info, Error } = Modal;

const showConfirm = () => {
  confirm({
    title: "이 항목을 수정하시겠습니까?",
    icon: <ExclamationCircleFilled />,
    content: "수정된 정보는 다시 되돌릴 수 없습니다.",
    onOk() {
      // console.log("OK");
    },
    onCancel() {
      // console.log("Cancel");
    },
    maskClosable: true,
    // maskClosable
  });
};
// const showPromiseConfirm = () => {
//   confirm({
//     title: "Do you want to delete these items?",
//     icon: <ExclamationCircleFilled />,
//     content:
//       "When clicked the OK button, this dialog will be closed after 1 second",
//     onOk() {
//       return new Promise((resolve, reject) => {
//         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
//       }).catch(() => console.log("Oops errors!"));
//     },
//     onCancel() {},
//   });
// };

const showModifyConfirm = () => {
  confirm({
    title: "이 항목을 수정하시겠습니까?",
    icon: <ExclamationCircleFilled />,
    content: "수정된 정보는 다시 되돌릴 수 없습니다.",
    okText: "수정",
    okType: "danger",
    cancelText: "취소",
    onOk() {
      // console.log("OK");
    },
    onCancel() {
      // console.log("Cancel");
    },
    maskClosable: true,
  });
};
// const showPropsConfirm = () => {
//   confirm({
//     title: "이 항목을 삭제하시겠습니까?",
//     icon: <ExclamationCircleFilled />,
//     content: "삭제된 정보는 다시 되돌릴 수 없습니다.",
//     okText: "Yes",
//     okType: "danger",
//     okButtonProps: {
//       disabled: true,
//     },
//     cancelText: "No",
//     onOk() {
//       console.log("OK");
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//   });
// };

export const ConfirmModal = () => (
  <Button onClick={showConfirm}>Confirm</Button>
);

export const DeleteModal = () => {
  const showDeleteConfirm = () => {
    confirm({
      title: "이 항목을 삭제하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      content: "삭제된 정보는 다시 되돌릴 수 없습니다.",
      okText: "삭제",
      okType: "danger",
      cancelText: "취소",
      maskClosable: true,
      onOk() {
        // console.log("OK");
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };
  return (
    <>
      <Button onClick={showDeleteConfirm}>Delete</Button>
    </>
  );
};

export const OkModal = () => {
  const showOkConfirm = () => {
    confirm({
      title: "이 항목을 등록하시겠습니까?",
      icon: <ExclamationCircleFilled />,
      content: "등록된 정보는 다시 되돌릴 수 없습니다.",
      okText: "등록",
      okType: "danger",
      cancelText: "취소",
      maskClosable: true,
      onOk() {
        // console.log("OK");
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };
  return (
    <>
      <Button onClick={showOkConfirm}>등록</Button>
    </>
  );
};

export const ModifyModal = () => (
  <Button onClick={showModifyConfirm} type="dashed">
    Delete
  </Button>
);

// export const ResultModal = () => (
//   <Space wrap>
//     <Button onClick={showPromiseConfirm}>With promise</Button>

//     <Button onClick={showPropsConfirm} type="dashed">
//       With extra props
//     </Button>
//   </Space>
// );
// export default ResultModal;
