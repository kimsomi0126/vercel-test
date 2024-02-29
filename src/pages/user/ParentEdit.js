import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import { getParentInfo, putParentInfo } from "../../api/user/userApi";
import { OrangeBtn, PinkBtn } from "../../styles/ui/buttons";
import { ModalBody, ModalTitle } from "../../styles/ui/warning";
import { FlexBox } from "../../styles/user/mypage";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import { useNavigate } from "react-router";

const initState = {
  parentNm: "",
  phoneNb: "",
  uid: "",
  prEmail: "",
  upw: "",
};
const ParentEdit = ({ open, handleCancel }) => {
  const navigate = useNavigate();
  // 안내창오픈여부
  const [isOpen, setIsOpen] = useState(false);
  //수정창 오픈여부
  const [isEditOpen, setIsEditOpen] = useState(open);

  // 모달텍스트
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const [form] = Form.useForm();

  const onFinish = value => {
    const obj = {
      parentNm: value.parentNm,
      phoneNb: value.phoneNb,
      prEmail: value.prEmail,
      upw: value.upw,
    };
    putParentInfo({ obj, successEditFn, failEditFn, errorEditFn });
  };

  const successEditFn = result => {
    setIsOpen(true);
    setTitle("수정 완료");
    setSubTitle("정보가 수정되었습니다.");
    setIsEditOpen(false);
  };
  const failEditFn = result => {
    setIsOpen(true);
    setTitle("수정 실패");
    setSubTitle(result);
  };
  const errorEditFn = result => {
    setIsOpen(true);
    setTitle("수정 실패");
    setSubTitle(result);
  };

  useEffect(() => {
    getParentInfo({ successFn, failFn, errorFn });
  }, []);

  const successFn = result => {
    console.log("성공", result);
    form.setFieldsValue(result);
  };
  const failFn = result => {
    setIsOpen(true);
    setTitle("데이터 애러");
    setSubTitle(
      "데이터를 가져오는데 실패했습니다. \n 잠시후 다시 시도해주세요.",
    );
  };
  const errorFn = result => {
    setIsOpen(true);
    setTitle("서버 에러");
    setSubTitle(result);
  };
  const handleOk = () => {
    setIsOpen(false);
  };

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
    <>
      <Modal
        open={isEditOpen}
        onCancel={handleCancel}
        closeIcon={null}
        width={400}
        footer={<></>}
        styles={modalStyles}
      >
        <ModalTitle>
          <h3>학부모 정보 수정</h3>
        </ModalTitle>
        <ModalBody>
          <Form form={form} name="parentedit" onFinish={onFinish}>
            <Form.Item
              name="uid"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  required: true,
                  message: "아이디를 입력해주세요.",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="parentNm"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  required: true,
                  message: "이름을 입력해주세요.",
                },
              ]}
            >
              <Input placeholder="이름 입력" />
            </Form.Item>
            <Form.Item
              name="phoneNb"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  required: true,
                  message: "전화번호를 입력해주세요.",
                },
              ]}
            >
              <Input placeholder="전화번호 입력" />
            </Form.Item>
            <Form.Item
              name="prEmail"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  type: "email",
                  message: "올바른 E-mail 양식이 아닙니다.",
                },
                {
                  required: true,
                  message: "이메일을 입력해주세요.",
                },
              ]}
            >
              <Input placeholder="이메일 입력" />
            </Form.Item>
            <Form.Item
              name="upw"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  required: true,
                  message: "새로운 비밀번호를 입력해주세요.",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="새로운 비밀번호 입력" />
            </Form.Item>
            <Form.Item
              name="confirm"
              style={{ marginBottom: 20 }}
              dependencies={["upw"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "비밀번호를 한번 더 입력해주세요.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("upw") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "입력한 비밀번호와 일치하지 않습니다. 다시 작성해주세요.",
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="새로운 비밀번호 확인" />
            </Form.Item>
            <FlexBox style={{ justifyContent: "center" }}>
              <PinkBtn type="submit">등록</PinkBtn>
              <OrangeBtn type="button" onClick={handleCancel}>
                취소
              </OrangeBtn>
            </FlexBox>
          </Form>
        </ModalBody>
      </Modal>

      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
    </>
  );
};

export default ParentEdit;
