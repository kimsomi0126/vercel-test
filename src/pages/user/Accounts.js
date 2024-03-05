import React, { useState } from "react";
import { FormWrap } from "../../styles/user/login";
import { ContentInner, LogoWrap } from "../../styles/basic";
import { Form, Input } from "antd";
import { GreenBtn } from "../../styles/ui/buttons";
import { useNavigate } from "react-router";
import { getCheckCode } from "../../api/user/userApi";
import ModalOneBtn from "../../components/ui/ModalOneBtn";

const Accounts = () => {
  const navigate = useNavigate();
  // 식별코드 state
  const [code, setCode] = useState("");
  // 모달창 state
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
  };

  const onFinish = values => {
    getCheckCode({ code, successFn, errorFn });
  };
  const onValuesChange = values => {
    setCode(values.code);
  };
  const onFinishFailed = errorInfo => {
    // console.log("Failed:", errorInfo);
  };
  const successFn = res => {
    navigate("/user/signup", { state: { res } });
  };

  const errorFn = res => {
    setIsOpen(true);
    setTitle("인식 실패");
    setSubTitle("일치하는 코드가 없습니다. \n" + res);
  };
  return (
    <ContentInner>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <FormWrap>
        <LogoWrap>
          <h3>식별코드 입력</h3>
          <p>식별코드를 입력해주세요.</p>
        </LogoWrap>
        <Form
          name="account"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "식별코드를 입력해주세요. (최대 15글자)",
                max: 15,
                min: 1,
              },
            ]}
          >
            <Input size="large" placeholder="코드입력" />
          </Form.Item>

          <Form.Item>
            <GreenBtn htmlType="submit" style={{ width: "100%" }}>
              확인
            </GreenBtn>
          </Form.Item>
        </Form>
      </FormWrap>
    </ContentInner>
  );
};

export default Accounts;
