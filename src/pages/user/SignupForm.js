import React, { useEffect, useState } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { GreenBtn, OrangeBtn } from "../../styles/ui/buttons";
import { FormWrap } from "../../styles/user/login";
import { LogoWrap } from "../../styles/basic";
import PrivacyPolicy from "../../components/user/PrivacyPolicy";
import { useLocation, useNavigate } from "react-router";
import { getCheckId, postParentSigup } from "../../api/user/userApi";
import { FlexBox } from "../../styles/user/mypage";
import ModalOneBtn from "../../components/ui/ModalOneBtn";

const { Option } = Select;

const initState = {
  ikid: 0,
  irelation: 0,
  isValid: 0,
  parentNm: "",
  uid: "",
  upw: "",
  phoneNb: "",
  prEmail: "",
};

const initKid = {
  code: "",
  iclass: 0,
  ikid: 0,
  kidNm: "",
};
const SignupForm = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerData, setRegisterData] = useState(initState);
  const [kidInfo, setKidInfo] = useState(initKid);
  const [idCheckResult, setIdCheckResult] = useState(0);

  // 모달창 state
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState("");

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };

  // 식별코드정보값 가져오기
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const [form] = Form.useForm();
  const onFinish = values => {
    const obj = {
      ikid: kidInfo.ikid,
      irelation: parseInt(values.irelation),
      isValid: idCheckResult,
      parentNm: values.parentNm,
      uid: values.uid,
      upw: values.upw,
      phoneNb: values.phoneNb,
      prEmail: values.prEmail,
    };
    postParentSigup({ obj, successFn, errorFn });
  };

  const successFn = res => {
    setIsOpen(true);
    setTitle("회원가입 성공");
    setSubTitle("회원가입에 성공했습니다. \n 로그인페이지로 이동합니다.");
    setIsNavigate("/login");
  };
  const errorFn = res => {
    setIsOpen(true);
    setTitle("회원가입 실패");
    setSubTitle(`회원가입에 실패했습니다. \n ${res}`);
  };

  const onValuesChanged = (changeValues, allValues) => {
    setRegisterData(allValues);
  };

  const successIdFn = res => {
    setIdCheckResult(1);
    setIsOpen(true);
    setTitle("사용 가능");
    setSubTitle(res.message + "입니다.");
  };
  const errorIdFn = res => {
    setIdCheckResult(0);
    setIsOpen(true);
    setTitle("사용 불가");
    setSubTitle(res);
  };
  const handleClickIdCheck = () => {
    const uid = registerData.uid;
    // console.log(">>>", uid);
    if (!uid) {
      alert("아이디를 입력해주세요");
    } else {
      getCheckId({ uid, successIdFn, errorIdFn });
    }
  };
  useEffect(() => {
    if (location.state === null) {
      setIsOpen(true);
      setTitle("식별코드 입력필요");
      setSubTitle(
        "식별코드 인증 후 가입 가능합니다. \n 식별코드 입력 페이지로 이동합니다.",
      );
      setIsNavigate("/user/accounts");
    } else {
      setKidInfo(location.state.res);
    }
  }, [registerData, idCheckResult]);

  return (
    <div>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <FormWrap>
        <LogoWrap>
          <h3>학부모 회원가입</h3>
          <p>회원정보를 입력해주세요.</p>
        </LogoWrap>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          onValuesChange={(changeValues, allValues) => {
            onValuesChanged(changeValues, allValues);
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="irelation"
            rules={[
              {
                required: true,
                message: `${kidInfo.kidNm} 어린이와의 관계를 선택해주세요.`,
              },
            ]}
          >
            <Select placeholder={kidInfo.kidNm + " 어린이와의 관계"}>
              <Option value="1">부</Option>
              <Option value="2">모</Option>
              <Option value="3">조부</Option>
              <Option value="4">조모</Option>
              <Option value="5">형제/자매</Option>
              <Option value="6">그 외</Option>
            </Select>
          </Form.Item>
          <div className="ipt_box">
            <Form.Item
              name="uid"
              style={{ marginBottom: 20 }}
              rules={[
                {
                  required: true,
                  message: "아이디를 입력해주세요.",
                },
                {
                  pattern: /^[a-zA-Z]+[0-9]+$/,
                  message: "아이디를 영어와 숫자 조합으로 입력해주세요",
                },
              ]}
            >
              <Input placeholder="아이디 입력" />
            </Form.Item>
            <OrangeBtn type="button" onClick={handleClickIdCheck}>
              중복확인
            </OrangeBtn>
          </div>
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
            name="upw"
            style={{ marginBottom: 20 }}
            rules={[
              {
                required: true,
                message: "비밀번호를 입력해주세요.",
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="false" placeholder="비밀번호 입력" />
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
                      "비밀번호가 일치하지 않습니다. 다시 작성해주세요.",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password autoComplete="false" placeholder="비밀번호 확인" />
          </Form.Item>

          <Form.Item
            name="phoneNb"
            style={{ marginBottom: 20 }}
            rules={[
              {
                required: true,
                message: "전화번호를 입력해주세요.",
              },
              {
                pattern: /^\d{3}\d{3,4}\d{4}$/,
                message: "하이픈없이 숫자만 입력해주세요.",
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
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("개인정보 처리방침 동의가 필요합니다."),
                      ),
              },
            ]}
          >
            <Checkbox>
              개인정보 처리방침에 동의합니다.
              <span onClick={showModal}>[내용보기]</span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <GreenBtn htmlType="submit" style={{ width: "100%" }}>
              가입하기
            </GreenBtn>
          </Form.Item>
        </Form>
      </FormWrap>

      <PrivacyPolicy isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default SignupForm;
