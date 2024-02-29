import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Upload } from "antd";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FileListStyle, WriteWrap } from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import { BtnWrap, GreenBtn, PinkBtn } from "../../styles/ui/buttons";

import { postNotice } from "../../api/notice/notice_api";
import { SERVER_URL } from "../../api/config";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import { NoticeWrap } from "../../styles/notice/notice";
const path = `${SERVER_URL}/api/full`;

const NoticeWrite = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const [fullNoticeFix, setFullNoticeFix] = useState(false);

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showExceedLimitModal, setShowExceedLimitModal] = useState(false); // 파일 제한 초과 경고 모달 상태

  const handleChange = info => {
    let fileList = [...info.fileList].slice(-10); // 최대 10개 파일만 유지
    setFileList(fileList);
  };

  const onChange = e => {
    setFullNoticeFix(e.target.checked);
  };

  const beforeUpload = (file, fileList) => {
    const totalFiles =
      fileList.length + fileList.filter(f => f.status === "done").length;
    if (totalFiles > 10) {
      setShowExceedLimitModal(true); // 경고 모달 표시
      return Upload.LIST_IGNORE; // 파일 업로드 중단
    }
    return true; // 파일 추가를 계속 진행
  };

  const handleExceedLimitModalOk = e => {
    setShowExceedLimitModal(false); // 경고 모달 닫기
    e.stopPropagation(); // 이벤트가 상위 엘리먼트에 전달되지 않게 막기
  };

  const customRequest = ({ onSuccess }) => {
    onSuccess("ok");
  };

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false);
  };

  // 취소 확인 모달 핸들러
  const handleCancelConfirmModalOk = () => {
    setShowCancelConfirmModal(false);
  };

  const handleCancelConfirmation = () => {
    setShowCancelConfirmModal(true); // 취소 확인 모달 표시
  };

  const onFinish = async data => {
    const formData = new FormData();
    const dto = new Blob(
      [
        JSON.stringify({
          iteacher: 1,
          fullTitle: data.fullTitle,
          fullContents: data.fullContents,
          fullNoticeFix: fullNoticeFix ? 1 : 0,
        }),
      ],
      { type: "application/json" },
    );
    console.log("dto확인", dto);
    formData.append("dto", dto);

    fileList.forEach(file => {
      formData.append("pics", file.originFileObj);
    });

    postNotice({
      product: formData,
      successFn: () => setShowSuccessModal(true), // 성공 모달 표시
      failFn: handleFailure,
      errorFn: handleError,
    });
  };

  const handleFailure = errorMessage => {
    Modal.error({
      title: "유치원소식 업로드 실패",
      content: errorMessage,
    });
  };

  const handleError = error => {
    Modal.error({
      title: "유치원소식 업로드 중 오류 발생",
      content: error,
    });
  };

  return (
    <NoticeWrap>
      <PageTitle>유치원 소식</PageTitle>
      <Form form={form} onFinish={onFinish}>
        <WriteWrap>
          <Checkbox onChange={onChange} style={{ marginBottom: 10 }}>
            상단고정
          </Checkbox>
          <Form.Item
            name="fullTitle"
            rules={[
              {
                required: true,
                message: "제목을 입력해주세요!",
              },
            ]}
          >
            <Input placeholder="제목 입력" />
          </Form.Item>
          <Form.Item
            name="fullContents"
            rules={[
              {
                required: true,
                message: "내용을 입력해주세요!",
              },
            ]}
          >
            <Input.TextArea
              placeholder="내용 입력"
              style={{ height: "150px" }}
            />
          </Form.Item>
          <FileListStyle>
            <Upload.Dragger
              action={`${path}`}
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              customRequest={customRequest}
              className="upload-list-inline"
              maxCount={10}
              multiple={true}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>업로드(최대 10개)</Button>
            </Upload.Dragger>
          </FileListStyle>
        </WriteWrap>
        <BtnWrap right>
          <GreenBtn>등록</GreenBtn>
          <PinkBtn type="button" onClick={handleCancelConfirmation}>
            취소
          </PinkBtn>
        </BtnWrap>
      </Form>
      {/* 모달창 */}
      <Link to="/notice">
        {/* 등록 성공 모달 */}
        {showSuccessModal && (
          <ModalOneBtn
            isOpen={showSuccessModal}
            handleOk={handleSuccessModalOk}
            title="등록 완료"
            subTitle="성공적으로 등록되었습니다."
          />
        )}

        {/* 취소 확인 모달 */}
        {showCancelConfirmModal && (
          <ModalOneBtn
            isOpen={showCancelConfirmModal}
            handleOk={handleCancelConfirmModalOk}
            title="정말 취소할까요?"
            subTitle="작성된 내용은 저장되지 않습니다."
          />
        )}

        {/* 파일 제한 초과 경고 모달 */}
        {showExceedLimitModal && (
          <ModalOneBtn
            isOpen={showExceedLimitModal}
            handleOk={handleExceedLimitModalOk}
            title="업로드 제한 초과"
            subTitle="업로드할 수 있는 파일 수는 최대 10개입니다."
          />
        )}
      </Link>
    </NoticeWrap>
  );
};

export default NoticeWrite;
