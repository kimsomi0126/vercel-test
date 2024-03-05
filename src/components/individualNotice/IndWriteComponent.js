import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload, TreeSelect, Checkbox } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { SERVER_URL } from "../../api/config";
import {
  getIndchildrenList,
  postIndNotice,
} from "../../api/individualNotice/indivNoticeApi";
import { FileListStyle } from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import { GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import ModalOneBtn from "../ui/ModalOneBtn";
import { Cascader } from "antd";

const path = `${SERVER_URL}/api/notice`;
const { SHOW_CHILD } = Cascader;

const IndWriteComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ikid = searchParams.get("ikid");
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const navigate = useNavigate();
  const [noticeCheck, setNoticeCheck] = useState(0);
  const [selectedKids, setSelectedKids] = useState([]);
  const [showExceedLimitModal, setShowExceedLimitModal] = useState(false); // 파일 제한 초과 경고 모달 상태

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  useEffect(() => {
    fetchChildrenList();
  }, []);

  const beforeUpload = (file, fileList) => {
    const totalFiles =
      fileList.length + fileList.filter(f => f.status === "done").length;
    if (totalFiles > 5) {
      setShowExceedLimitModal(true); // 경고 모달 표시
      return Upload.LIST_IGNORE; // 파일 업로드 중단
    }
    return true; // 파일 추가를 계속 진행
  };

  const handleExceedLimitModalOk = e => {
    setShowExceedLimitModal(false); // 경고 모달 닫기
    e.stopPropagation(); // 이벤트가 상위 엘리먼트에 전달되지 않게 막기
  };

  const fetchChildrenList = async () => {
    try {
      const response = await getIndchildrenList({
        product: {},
        successFn: handleChildrenListSuccess,
        failFn: handleChildrenListFail,
        errorFn: handleChildrenListError,
      });
    } catch (error) {
      console.error("Error fetching children list:", error);
    }
  };

  const handleChildrenListSuccess = data => {
    const groupedData = groupChildrenByClass(data);
    const treeData = groupedData.map(classItem => ({
      title: getClassTitle(classItem.classNumber),
      value: classItem.classNumber,
      key: classItem.classNumber,
      children: classItem.children.map(child => ({
        title: child.kidNm,
        value: child.ikid,
        key: child.ikid,
      })),
    }));
    setTreeData(treeData);
  };

  const getClassTitle = classNumber => {
    switch (classNumber) {
      case 1:
        return "무궁화반";
      case 2:
        return "해바라기반";
      case 3:
        return "장미반";
      default:
        return "";
    }
  };

  const onChange = e => {
    setNoticeCheck(e.target.checked ? 1 : 0); // 중요 체크를 했을 때 1, 안 했을 때 0으로 설정
  };

  const handleChildrenListFail = errorMessage => {
    console.error("Failed to fetch children list:", errorMessage);
  };

  const handleChildrenListError = error => {
    console.error("Error while fetching children list:", error);
  };

  const formRef = useRef();

  const handleGreenButtonClick = () => {
    formRef.current.submit();
  };

  const handleChange = info => {
    let newFileList = [...info.fileList].filter(file => !!file.status);
    if (newFileList.length > 5) {
      // 파일 리스트의 길이가 5개를 초과할 경우 모달 창을 띄움
      setIsModalVisible(true);
      // 5개를 초과한 파일은 제외하고 설정
      newFileList = newFileList.slice(-5);
    }
    setFileList(newFileList);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
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
    console.log("data", data);
    const formData = new FormData();

    fileList.forEach(file => {
      formData.append("pics", file.originFileObj);
    });

    // JSON 데이터 추가
    const dto = {
      ikids: selectedKids, // ikids 필드 추가
      noticeTitle: data.noticeTitle,
      noticeContents: data.noticeContents,
      noticeCheck: noticeCheck ? 1 : 0,
    };
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" }),
    );

    postIndNotice({
      product: formData,
      successFn: () => setShowSuccessModal(true), // 성공 모달 표시
      failFn: handleFail,
      errorFn: handleError,
    });
  };

  const handleCancelOk = () => {
    navigate(`/ind?year=2024&page=1&iclass=0`);
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    setIsModalVisible(true);
  };

  const handleFail = errorMessage => {
    Modal.error({
      title: "알림장 업로드 실패",
      content: errorMessage,
    });
  };

  const handleError = error => {
    console.error("오류", error);
    Modal.error({
      title: "오류",
      content: error,
      onOk: () => {
        navigate(`/ind?year=2024&page=1&iclass=0`);
      },
    });
  };

  const groupChildrenByClass = children => {
    const grouped = children.reduce((acc, child) => {
      const { iclass } = child;
      if (!acc[iclass]) {
        acc[iclass] = [];
      }
      acc[iclass].push(child);
      return acc;
    }, {});
    return Object.keys(grouped).map(classNumber => ({
      classNumber: parseInt(classNumber),
      children: grouped[classNumber],
    }));
  };

  return (
    <div>
      <PageTitle>추억앨범</PageTitle>
      <div
        style={{
          width: "100%",
          height: 600,
          padding: 16,
          borderTop: "1.5px solid #00876D",
          borderBottom: "1.5px solid #00876D",
          background: "#FAFAFA",
          marginTop: 30,
        }}
      >
        <div
          style={{
            marginBottom: "2rem",
          }}
        >
          <TreeSelect
            style={{ width: "100%" }}
            treeData={treeData}
            placeholder="유치원생 선택"
            treeCheckable={true}
            showCheckedStrategy={SHOW_CHILD}
            onChange={value => {
              if (Array.isArray(value)) {
                setSelectedKids(value);
                console.log("value check", value);
              } else {
                setSelectedKids([value]);
              }
            }}
          />
        </div>
        <Checkbox onChange={onChange} style={{ marginBottom: 10 }}>
          중요
        </Checkbox>
        <Form ref={formRef} form={form} onFinish={onFinish}>
          <Form.Item
            name="noticeTitle"
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
            style={{ height: "150px" }}
            name="noticeContents"
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
              multiple={true}
              beforeUpload={beforeUpload}
            >
              <Button icon={<UploadOutlined />}>업로드</Button>
            </Upload.Dragger>
          </FileListStyle>
        </Form>
        <div
          style={{
            marginTop: 35,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <GreenBtn type="button" onClick={handleGreenButtonClick}>
            등록
          </GreenBtn>
          <PinkBtn type="button" onClick={handleCancelConfirmation}>
            취소
          </PinkBtn>
        </div>
      </div>

      {/* 모달창 */}
      <Link to="/ind?year=2024&page=1&iclass=0">
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
        <ModalOneBtn
          isOpen={showExceedLimitModal}
          handleOk={handleExceedLimitModalOk}
          title="파일 업로드 제한 초과"
          subTitle="최대 5개까지만 업로드할 수 있습니다."
        />
      </Link>
    </div>
  );
};

export default IndWriteComponent;
