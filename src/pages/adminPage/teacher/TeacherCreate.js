import React, { useState } from "react";
import {
  TBottomBt,
  TeacherClassForm,
  TeacherClassInfo,
  TeacherFormTop,
  TeacherFormWrap,
  TeacherIdForm,
  TeacherIdInfo,
  TeacherIdItem,
  TeacherImg,
  TeacherImgForm,
  TeacherMemo,
  TeacherMemoForm,
} from "../../../styles/adminstyle/teachercreate";
import { PageTitle } from "../../../styles/basic";
import { Button, Input, Upload, Form, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { GreenBtn, PinkBtn } from "../../../styles/ui/buttons";
import { postTeacherCreate } from "../../../api/adminPage/admin_api";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../../components/ui/ModalTwoBtn";
import { useNavigate } from "react-router-dom";

const initDto = {
  iclass: 0,
  teacherNm: "",
  teacherUid: "",
  teacherUpw: "",
  teacherIntroduce: "",
  tcEmail: "",
};

const TeacherCreate = () => {
  const navigate = useNavigate();
  // 모달창 state
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isNavigate, setIsNavigate] = useState();
  // 선생님 정보
  const [dto, setDto] = useState(initDto);
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
  const onValuesChange = (changeValue, allValue) => {
    const iclassValue = allValue.iclass && parseInt(allValue.iclass["value"]);
    const values = {
      ...allValue,
      iclass: iclassValue,
    };
    setDto(values);
  };

  // 등록 버튼 클릭, 결과
  const [form] = Form.useForm();
  const onFinish = value => {
    console.log("과연", value);

    let formData = new FormData();
    formData.append("pic", fileList[0]);
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );

    postTeacherCreate({ successFn, errorFn, teacher: formData });
  };

  const successFn = res => {
    setIsResultOpen(true);
    setTitle("등록 완료");
    setSubTitle("성공적으로 등록되었습니다.");
    setIsNavigate("/admin/teacher?iclass=0&page=1");
  };
  const errorFn = res => {
    setIsResultOpen(true);
    setTitle("등록 실패");
    setSubTitle(`등록에 실패했습니다. \n다시 시도해주세요.`);
  };
  const handleCancelClick = () => {
    setIsCancelOpen(true);
    setTitle("정말 취소할까요?");
    setSubTitle("작성된 내용은 저장되지 않습니다.");
    setIsNavigate("/admin/teacher?iclass=0&page=1");
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
      <TeacherFormTop>
        <PageTitle>선생님 등록</PageTitle>
      </TeacherFormTop>
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(changeValue, allValue) => {
          onValuesChange(changeValue, allValue);
        }}
      >
        <TeacherFormWrap>
          {/* 계정정보 */}
          <TeacherIdInfo>
            <p>계정 정보</p>
            <TeacherIdForm>
              <TeacherIdItem>
                <Form.Item
                  name="teacherUid"
                  style={{
                    width: "33%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "아이디를 입력해주세요.",
                    },
                  ]}
                >
                  <Input placeholder="아이디 입력" />
                </Form.Item>
                <Form.Item
                  name="teacherUpw"
                  style={{
                    width: "33%",
                  }}
                  rules={[
                    {
                      required: true,
                      message: "비밀번호를 입력해주세요.",
                    },
                  ]}
                >
                  <Input placeholder="비밀번호 입력" />
                </Form.Item>
              </TeacherIdItem>
            </TeacherIdForm>
          </TeacherIdInfo>
          {/* 기본정보 */}
          <TeacherIdInfo>
            <p>기본 정보</p>
            <TeacherIdForm>
              <TeacherIdItem>
                <Form.Item
                  name="teacherNm"
                  style={{
                    width: "33%",
                  }}
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
                  name="tcEmail"
                  style={{
                    width: "33%",
                  }}
                  rules={[
                    {
                      type: "email",
                      message: "올바른 E-mail 양식이 아닙니다.",
                    },
                    {
                      required: true,
                      message: "이메일 주소를 입력해주세요.",
                    },
                  ]}
                >
                  <Input placeholder="이메일 입력" />
                </Form.Item>
              </TeacherIdItem>
            </TeacherIdForm>
          </TeacherIdInfo>
          {/* 재직정보 */}
          <TeacherClassInfo>
            <p>재직 정보</p>
            <TeacherClassForm>
              <Form.Item
                name="iclass"
                style={{
                  width: "33%",
                }}
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
                        담당 반 선택
                      </span>
                    ),
                  }}
                >
                  <Select.Option value="1">무궁화반</Select.Option>
                  <Select.Option value="2">해바라기반</Select.Option>
                  <Select.Option value="3">장미반</Select.Option>
                </Select>
              </Form.Item>
            </TeacherClassForm>
          </TeacherClassInfo>
          {/* 프로필 이미지 */}
          <TeacherImg>
            <p>프로필 이미지</p>
            <TeacherImgForm>
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
            </TeacherImgForm>
          </TeacherImg>

          {/* 선생님 소개 */}
          <TeacherMemo>
            <p>선생님 소개</p>
            <TeacherMemoForm>
              <Form.Item name="teacherIntroduce">
                <TextArea placeholder="선생님 소개" />
              </Form.Item>
            </TeacherMemoForm>
          </TeacherMemo>
        </TeacherFormWrap>
        <TBottomBt>
          <GreenBtn>등록</GreenBtn>
          <PinkBtn type="button" onClick={handleCancelClick}>
            취소
          </PinkBtn>
        </TBottomBt>
      </Form>
    </>
  );
};

export default TeacherCreate;
