import React, { useEffect, useState } from "react";
import { PageTitle } from "../../../styles/basic";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  message,
} from "antd";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import DaumPostcode from "react-daum-postcode";
import {
  AdminMemo,
  AdminMemoForm,
  BasicInfo,
  BasicInfoAdress,
  BasicInfoCode,
  BasicInfoForm,
  BasicInfoItem,
  BottomBt,
  ClassInfo,
  ClassInfoForm,
  ImgInfo,
  ImgInfoForm,
  PhoneInfo,
  PhoneInfoForm,
  StudFormTop,
  StudFormWrap,
} from "../../../styles/adminstyle/studcreate";
import { GreenBtn, PinkBtn } from "../../../styles/ui/buttons";
import { postStudentCreate } from "../../../api/adminPage/admin_api";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../../components/ui/ModalTwoBtn";
import { useNavigate } from "react-router";
import useCustomLogin from "../../../hooks/useCustomLogin";

// dto 초기값
const initDto = {
  kidNm: "",
  iclass: 0,
  gender: 0,
  birth: "",
  address: "",
  memo: "",
  emerNm: "",
  emerNb: "",
};
const StudentCreate = () => {
  const navigate = useNavigate();
  // 원생 정보 값
  const [dto, setDto] = useState(initDto);
  const currentYear = new Date().getFullYear();
  const { isLogin } = useCustomLogin();
  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isNavigate, setIsNavigate] = useState();

  // 모달창 state
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      setIsResultOpen(true);
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
      setIsNavigate(`/login`);
    }
  }, [isLogin]);

  const handleCancelClick = () => {
    setIsCancelOpen(true);
    setTitle("정말 취소할까요?");
    setSubTitle("작성된 내용은 저장되지 않습니다.");
    setIsNavigate("/admin/student?page=1&kidCheck=0");
  };
  // 모달창 확인버튼
  const handleResultOk = () => {
    setIsResultOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  // 모달창 취소
  const handleResultCancel = () => {
    setIsCancelOpen(false);
    setIsResultOpen(false);
  };

  // 우편번호 입력
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  // Daum Post 입력
  const themeObj = {
    bgColor: "#FAFAFA", //바탕 배경색
    searchBgColor: "#00876D", //검색창 배경색
    contentBgColor: "#FFFFFF", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "#FAFAFA", //페이지 배경색
    textColor: "#222222", //기본 글자색
    queryTextColor: "#FFFFFF", //검색창 글자색
    postcodeTextColor: "#00876D", //우편번호 글자색
    emphTextColor: "#FD7900", //강조 글자색
    outlineColor: "#FFFFFF", //테두리
  };
  const [form] = Form.useForm();
  const postCodeStyle = {
    width: "100%",
    height: "445px",
  };
  const completeHandler = data => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    setInitialValues({
      address: {
        postcode: zonecode,
        detail1: address,
      },
    });
  };
  const closeHandler = state => {
    if (state === "FORCE_CLOSE") {
      setIsOpen(false);
    } else if (state === "COMPLETE_CLOSE") {
      setIsOpen(false);
    }
  };
  const toggleHandler = () => {
    setIsOpen(prevOpenState => !prevOpenState);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 주소 api form값에 추가
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [zonecode, address]);

  // 프로필 업로드
  const [fileList, setFileList] = useState([]);
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      if (fileList.length >= 1) {
        message.error(`프로필사진은 1개만 업로드 가능합니다.`);
      } else {
        setFileList([...fileList, file]);
      }

      return false;
    },
    fileList,
  };

  // 입력값 담기
  const onValuesChange = (changeValue, allValue) => {
    const allAddress = `${allValue.address.postcode}) ${allValue.address.detail1}, ${allValue.address.detail2}`;
    const genderValue = allValue.gender && parseInt(allValue.gender["value"]);
    const iclassValue = allValue.iclass && parseInt(allValue.iclass["value"]);
    const values = {
      ...allValue,
      birth: dayjs(allValue.birth).format("YYYY-MM-DD"),
      address: allAddress,
      iclass: iclassValue,
      gender: genderValue,
    };
    setDto(values);
  };

  // 등록 버튼 클릭, 결과
  const onFinish = value => {
    // console.log("data", value);

    let formData = new FormData();
    formData.append("pic", fileList[0]);
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );

    postStudentCreate({ successFn, errorFn, student: formData });
  };
  const successFn = res => {
    setIsResultOpen(true);
    setTitle("등록 완료");
    setSubTitle("성공적으로 등록되었습니다.");
    setIsNavigate(
      `/admin/student/details?year=${currentYear}&ikid=${res.ikid}`,
    );
  };
  const errorFn = res => {
    setIsResultOpen(true);
    setTitle("등록 실패");
    setSubTitle(`등록에 실패했습니다. \n다시 시도해주세요.`);
  };

  return (
    <>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isResultOpen}
        handleOk={handleResultOk}
        title={title}
        subTitle={subTitle}
      />

      {/* 작성취소 */}
      <ModalTwoBtn
        isOpen={isCancelOpen}
        handleOk={handleResultOk}
        handleCancel={handleResultCancel}
        title={title}
        subTitle={subTitle}
      />
      <StudFormTop>
        <PageTitle>원생 등록</PageTitle>
      </StudFormTop>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(changeValue, allValue) => {
          onValuesChange(changeValue, allValue);
        }}
      >
        <StudFormWrap>
          {/* 기본정보 */}
          <BasicInfo>
            <p>기본 정보</p>
            <BasicInfoForm>
              <BasicInfoItem>
                <Form.Item
                  name="kidNm"
                  rules={[
                    {
                      required: true,
                      message: "이름을 입력해주세요.",
                    },
                  ]}
                >
                  <Input placeholder="이름" />
                </Form.Item>
                <Form.Item
                  name="birth"
                  rules={[
                    {
                      required: true,
                      message: "생년월일을 입력해주세요.",
                    },
                  ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    placeholder="생년월일"
                  />
                </Form.Item>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "성별을 선택해주세요.",
                    },
                  ]}
                >
                  <Select
                    labelInValue
                    defaultValue={{
                      value: "",
                      label: (
                        <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                          성별 선택
                        </span>
                      ),
                    }}
                  >
                    <Select.Option value="1">남자</Select.Option>
                    <Select.Option value="0">여자</Select.Option>
                  </Select>
                </Form.Item>
              </BasicInfoItem>
              <BasicInfoCode>
                <Form.Item
                  name={["address", "postcode"]}
                  rules={[
                    {
                      required: true,
                      message: "주소를 입력해주세요.",
                    },
                  ]}
                >
                  <Input disabled type="text" placeholder="우편 번호" />
                </Form.Item>
                <button type="button" onClick={toggleHandler}>
                  주소 검색
                </button>
                {isOpen && (
                  <Modal
                    title="주소 검색"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <DaumPostcode
                      theme={themeObj}
                      style={postCodeStyle}
                      onComplete={completeHandler}
                      onClose={closeHandler}
                    />
                  </Modal>
                )}
              </BasicInfoCode>
              <BasicInfoAdress>
                <Form.Item name={["address", "detail1"]}>
                  <Input disabled type="text" placeholder="주소 입력" />
                </Form.Item>
                <Form.Item
                  name={["address", "detail2"]}
                  rules={[
                    {
                      required: true,
                      message: "상세주소를 입력해주세요.",
                    },
                  ]}
                >
                  <Input type="text" placeholder="상세 주소 입력" />
                </Form.Item>
              </BasicInfoAdress>
            </BasicInfoForm>
          </BasicInfo>
          {/* 재원정보 */}
          <ClassInfo>
            <p>재원 정보</p>
            <ClassInfoForm>
              <Form.Item
                name="iclass"
                rules={[
                  {
                    required: true,
                    message: "반을 선택해주세요.",
                  },
                ]}
              >
                <Select
                  labelInValue
                  defaultValue={{
                    value: "",
                    label: (
                      <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                        반 선택
                      </span>
                    ),
                  }}
                >
                  <Select.Option value="1">무궁화반</Select.Option>
                  <Select.Option value="2">해바라기반</Select.Option>
                  <Select.Option value="3">장미반</Select.Option>
                </Select>
              </Form.Item>
            </ClassInfoForm>
          </ClassInfo>
          {/* 프로필 이미지 */}
          <ImgInfo>
            <p>프로필 이미지</p>
            <ImgInfoForm>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "프로필이미지를 등록해주세요.",
                  },
                ]}
              >
                <Upload {...props} required>
                  <Button icon={<UploadOutlined />}>파일 첨부</Button>
                </Upload>
              </Form.Item>
            </ImgInfoForm>
          </ImgInfo>
          {/* 비상연락처 */}
          <PhoneInfo>
            <p>비상 연락처</p>
            <PhoneInfoForm>
              <Form.Item
                name="emerNm"
                rules={[
                  {
                    required: true,
                    message: "비상연락처 이름을 입력해주세요.",
                  },
                ]}
              >
                <Input type="text" placeholder="이름 입력" />
              </Form.Item>
              <Form.Item
                name="emerNb"
                rules={[
                  {
                    pattern: /^\d{10,11}$/,
                    message: "휴대폰 번호를 올바르게 입력하세요.",
                  },
                  {
                    required: true,
                    message: "비상연락처 번호를 입력해주세요.",
                  },
                ]}
              >
                <Input
                  type="tel"
                  placeholder="휴대폰 번호 입력 // 하이픈(-) 제외"
                />
              </Form.Item>
            </PhoneInfoForm>
          </PhoneInfo>
          {/* 관리자메모 */}
          <AdminMemo>
            <p>관리자 메모</p>
            <AdminMemoForm>
              <Form.Item name="memo">
                <TextArea placeholder="관리자 메모" />
              </Form.Item>
            </AdminMemoForm>
          </AdminMemo>
        </StudFormWrap>
        <BottomBt>
          <GreenBtn>등록</GreenBtn>
          <PinkBtn type="button" onClick={handleCancelClick}>
            취소
          </PinkBtn>
        </BottomBt>
      </Form>
    </>
  );
};

export default StudentCreate;
