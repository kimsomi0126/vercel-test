import React, { useEffect, useState } from "react";
import {
  NewPasswordEdit,
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
import { GreenBtn, OrangeBtn, PinkBtn } from "../../../styles/ui/buttons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getTeacherInfo,
  putTeacherInfo,
} from "../../../api/adminPage/admin_api";
import ModalTwoBtn from "../../../components/ui/ModalTwoBtn";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";
import useCustomLogin from "../../../hooks/useCustomLogin";

const initDto = {
  iteacher: 0,
  ilevel: 0,
  iclass: 0,
  teacherNm: "",
  teacherUid: "",
  teacherUpw: "",
  teacherIntroduce: "",
  tcRole: "",
  teacherProfile: "",
  tcEmail: "",
};

const TeacherModify = () => {
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [serchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { isAdminLogin, isTeacherLogin } = useCustomLogin();
  // 모달창
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);

  // 선생님 정보 값
  const [dto, setDto] = useState(initDto);
  const iteacher = serchParams.get("iteacher");

  // 비밀번호 수정 클릭
  const handleEdit = () => {
    setPasswordEdit(true);
  };

  // 글 작성 취소버튼
  const handleCancelClick = () => {
    setIsCancelOpen(true);
    setTitle("정말 취소할까요?");
    setSubTitle("작성된 내용은 저장되지 않습니다.");
    setIsNavigate("/admin/teacher?iclass=0&page=1");
  };

  // 모달창 확인버튼
  const handleResultOk = () => {
    setIsResultOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };

  // 모달창 취소
  const handleResultCancel = () => {
    setIsCancelOpen(false);
    setIsResultOpen(false);
  };

  // 선생님 기존 정보 GET
  useEffect(() => {
    getTeacherInfo({ iteacher, successGetFn, failGetFn, errorGetFn });
    form.setFieldsValue();
  }, []);
  // console.log("아이티쳐", iteacher);
  const successGetFn = res => {
    const newData = Object.keys(res).reduce((acc, key) => {
      if (key !== "profile") {
        acc[key] = res[key];
      }
      return acc;
    }, {});

    const values = {
      ...newData,
      iclass: {
        label:
          newData.iclass === 1
            ? "무궁화반"
            : newData.iclass === 2
            ? "해바라기반"
            : newData.iclass === 3
            ? "장미반"
            : "반 선택",
        value: newData.iclass,
        key: newData.iclass,
      },
    };

    setDto({ ...values });
    form.setFieldsValue(values);

    const imageUrl = `/pic/user/${iteacher}/${res.teacherProfile}`;
    const imageUrlToFile = async imageUrl => {
      try {
        const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        const response = await fetch(imageUrl, { mode: "no-cors" });
        const blob = await response.blob();
        const imageFile = new File([blob], fileName);
        if (fileList.length === 0) {
          setFileList([...fileList, imageFile]);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error converting image URL to File:", error);
      }
    };

    imageUrlToFile(imageUrl);
  };
  // 프로필 업로드
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
  const failGetFn = res => {
    // console.log(res);
  };
  const errorGetFn = res => {
    // console.log(res);
  };

  // 수정 클릭
  const onFinish = value => {
    const iclassValue = value.iclass && parseInt(value.iclass["value"]);
    const tcRoleValue = value.tcRole;
    const newTeacherUpwValue = value.newTeacherUpw
      ? value.newTeacherUpw
      : dto.teacherUpw;
    const values = {
      ...value,
      iclass: iclassValue,
      tcRole: tcRoleValue,
      teacherUpw: newTeacherUpwValue,
      iteacher: parseInt(iteacher),
    };
    setDto(values);
    console.log("뉴 비밀번호", value.newTeacherUpw);
    console.log("기존 비밀번호", dto.teacherUpw);
    console.log("비밀번호", newTeacherUpwValue);
    let formData = new FormData();
    formData.append("pic", fileList[0]);
    formData.append(
      "dto",
      new Blob([JSON.stringify(values)], { type: "application/json" }),
    );

    putTeacherInfo({ successFn, errorFn, teacher: formData });
  };
  // console.log("수정내용", dto);

  const successFn = res => {
    setIsResultOpen(true);
    setTitle("수정 완료");
    setSubTitle("성공적으로 등록되었습니다.");
    setIsNavigate(`/admin/teacher?iclass=0&page=1&tcIsDel=0`);
  };
  const errorFn = res => {
    setIsResultOpen(true);
    setTitle("수정 실패");
    setSubTitle(`수정에 실패했습니다. \n다시 시도해주세요.`);
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
        <PageTitle>선생님 정보 수정</PageTitle>
      </TeacherFormTop>
      <Form form={form} onFinish={onFinish} name="teacheredit">
        <TeacherFormWrap>
          {/* 계정정보 */}
          <TeacherIdInfo>
            <p>계정 정보</p>
            <TeacherIdForm>
              <TeacherIdItem>
                <Form.Item
                  name="teacherUid"
                  rules={[
                    {
                      required: true,
                      message: "아이디를 입력해주세요.",
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
                <OrangeBtn type="button" onClick={handleEdit}>
                  비밀번호 수정
                </OrangeBtn>
              </TeacherIdItem>
              {isAdminLogin ? (
                <NewPasswordEdit>
                  <Form.Item
                    name="newTeacherUpw"
                    style={{
                      display: passwordEdit ? "block" : "none",
                    }}
                    rules={[
                      {
                        required: false,
                        message: "비밀번호를 입력해주세요.",
                      },
                    ]}
                  >
                    <Input placeholder="새로운 비밀번호 입력" />
                  </Form.Item>
                </NewPasswordEdit>
              ) : (
                <NewPasswordEdit>
                  <Form.Item
                    name="confirm"
                    style={{
                      display: passwordEdit ? "block" : "none",
                    }}
                    // dependencies={["teacherUpw"]}
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "기존 비밀번호를 입력해주세요.",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || dto.teacherUpw === value) {
                            setIsDisabled(false);
                            return Promise.resolve();
                          }
                          setIsDisabled(true);
                          return Promise.reject(
                            new Error(
                              "기존 비밀번호와 일치하지 않습니다. 다시 작성해주세요.",
                            ),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="기존 비밀번호 입력" />
                  </Form.Item>

                  <Form.Item
                    name="newTeacherUpw"
                    style={{
                      display: passwordEdit ? "block" : "none",
                    }}
                    rules={[
                      {
                        required: false,
                        message: "비밀번호를 입력해주세요.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="새로운 비밀번호 입력"
                      disabled={isDisabled}
                    />
                  </Form.Item>
                </NewPasswordEdit>
              )}
            </TeacherIdForm>
          </TeacherIdInfo>
          {/* 기본정보 */}
          <TeacherIdInfo>
            <p>기본 정보</p>
            <TeacherIdForm>
              <TeacherIdItem>
                <Form.Item
                  name="teacherNm"
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
              {isAdminLogin ? (
                <Form.Item
                  name="tcRole"
                  rules={[
                    {
                      required: true,
                      message: "직급을 선택해주세요.",
                    },
                  ]}
                >
                  <Select
                    labelInValue
                    defaultValue={{
                      value: "",
                      label: (
                        <span style={{ color: " rgba(0, 0, 0, 0.25) " }}>
                          직급 선택
                        </span>
                      ),
                    }}
                  >
                    <Select.Option value="ADMIN">원장</Select.Option>
                    <Select.Option value="TEACHER">선생님</Select.Option>
                  </Select>
                </Form.Item>
              ) : null}

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
          <GreenBtn>수정</GreenBtn>
          <PinkBtn type="button" onClick={handleCancelClick}>
            취소
          </PinkBtn>
        </TBottomBt>
      </Form>
    </>
  );
};

export default TeacherModify;
