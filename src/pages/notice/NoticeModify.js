import React, { useState, useEffect, useRef } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Upload, Modal } from "antd";
import { PageTitle } from "../../styles/basic";
import { BtnWrap, GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editNotice,
  getDetail,
  getList,
  getNotice,
  putNotice,
} from "../../api/notice/notice_api";
import { IMG_URL, SERVER_URL } from "../../api/config";
import { FileListStyle, WriteWrap } from "../../styles/album/album";
import { NoticeWrap } from "../../styles/notice/notice";
import ModalOneBtn from "../../components/ui/ModalOneBtn";

const path = `${IMG_URL}/api/full`;
const imgpath = `${IMG_URL}/pic/fullnotice`;
const customRequest = ({ onSuccess }) => {
  onSuccess("ok");
};
const obj = [
  {
    fullTitle: "",
    fullContents: "",
    writer: "",
    writerName: "",
    createdAT: "",
    fullNoticeFix: 0,
    fullPic: [],
  },
];

const NoticeModify = () => {
  const { tno } = useParams();
  const { ifullPic } = useParams();
  const formRef = useRef();
  const [noticeData, setNoticeData] = useState(obj); // noticeData 상태를 추가
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletedPics, setDeletedPics] = useState([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fullNoticeFix, setFullNoticeFix] = useState(false); // 새로운 상태 추가
  const navigate = useNavigate();
  const [newPics, setNewPics] = useState([]);

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setshowCancelConfirmModal] = useState(false);

  // const [initialData, setInitialData] = useState({
  //   fullTitle: "",
  //   fullContents: "",
  //   fullNoticeFix: "",
  //   pics: [],
  // });

  const handleGreenButtonClick = () => {
    formRef.current.submit(); // Form의 submit 메서드 호출
  };

  const onChange = e => {
    // console.log(`checked = ${e.target.checked}`);
    setFullNoticeFix(e.target.checked);
  };

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false);
  };

  // 취소 확인 모달 핸들러
  const handleCancelConfirmModalOk = () => {
    setshowCancelConfirmModal(false);
    navigate(`/notice/details/${tno}`);
  };

  const handleCancelConfirmation = () => {
    setshowCancelConfirmModal(true); // 취소 확인 모달 표시
  };

  const handleFailure = errorMessage => {
    Modal.error({
      title: "유치원소식 수정 실패",
      content: errorMessage,
    });
  };

  const handleError = error => {
    console.error("유치원소식 수정 오류:", error);
    Modal.error({
      title: "유치원소식 수정 중 오류 발생",
      content:
        "서버 오류 또는 네트워크 문제가 발생했습니다. 다시 시도해주세요.",
    });
  };

  const onFinish = async data => {
    const formData = new FormData();

    const noticeInfo = {
      ifullNotice: tno,
      fullTitle: data.fullTitle,
      fullContents: data.fullContents,
      fullNoticeFix: data.fullNoticeFix,
      iteacher: 1,
    };

    // deletedPics 배열에 항목이 있는 경우에만 delPics 속성을 추가
    if (deletedPics.length > 0) {
      noticeInfo.delPics = deletedPics;
    }
    const dto = new Blob([JSON.stringify(noticeInfo)], {
      type: "application/json",
    });
    formData.append("dto", dto);

    console.log("================= 보내는 데이터 : ", dto);

    // formData.append("dto", dto);

    // 새로 추가된 이미지 파일을 FormData에 추가합니다.
    console.log("현재 남아있는 fileList ", fileList);
    fileList.forEach(async file => {
      console.log("file", file);
      if (file.originFileObj) {
        // 새로운 파일인 경우, 파일 데이터를 추가합니다.
        formData.append("pics", file.originFileObj);
        // } else if (file.url) {
        //   // 이미 서버에 존재하는 파일인 경우, 파일 경로를 추가합니다.
        //   formData.append("pics", file.url);
      }
      // 도현님 이상해요...
      //  else {
      //   // 기존 파일인 경우, 파일의 고유 식별자를 FormData에 추가합니다.
      //   // formData.append("ifullPic", file.ifullPic);
      //   formData.append("pics", file.ifullPic);
      // }
    });

    console.log("formData", formData);
    // 서버에 요청을 보냅니다.
    try {
      const response = await putNotice({
        data: formData,
        successFn: () => setShowSuccessModal(true), // 성공 모달 표시
        failFn: handleFailure,
        errorFn: handleError,
      });

      // 응답 처리
      console.log("Response from putNotice:", response);
    } catch (error) {
      handleError(error.message);
    }
  };

  useEffect(() => {
    const fetchNoticeData = async () => {
      editNotice({
        tno: tno,
        successFn: data => {
          setNoticeData(data);
          form.setFieldsValue({
            fullTitle: data.fullTitle,
            fullContents: data.fullContents,
          });

          // Transform album pictures for the fileList state
          // console.log("데이터 확인", data);
          const transformedFileList = data.fullPic.map((fullPic, index) => ({
            ifullPic: fullPic.ifullPic, // uid is required to be unique
            name: fullPic.fullPic, // file name
            status: "done", // upload status
            url: `${imgpath}/${tno}/${fullPic.fullPic}`, // file URL, adjust the path as needed
          }));
          console.log("transformedFileList", transformedFileList);
          setFileList(transformedFileList);
        },
        failFn: errorMessage => {
          console.error("Notice fetch failed:", errorMessage);
          // Handle failure (show error message to user, etc.)
        },
        errorFn: errorData => {
          console.error("Error fetching notice:", errorData);
          // Handle error (show error message to user, etc.)
        },
      });
    };

    fetchNoticeData();
  }, [tno, form]);

  const beforeUpload = file => {
    // 새로 업로드되는 파일을 fileList에 추가
    const newFileList = [
      ...fileList,
      {
        uid: file.uid, // 파일의 고유 ID
        name: file.name, // 파일 이름
        status: "done", // 파일 상태
        originFileObj: file, // 파일 객체
      },
    ];
    setFileList(newFileList);
    return false; // 파일을 자동으로 업로드하지 않음
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList); // 기존 파일 리스트 업데이트
    const newUploadedPics = newFileList
      .filter(file => file.originFileObj) // 새로 업로드된 파일만 선택
      .map(file => file.name); // 파일 이름 추출
    setNewPics(newUploadedPics); // 새로 업로드된 파일 이름을 상태에 저장
  };
  // 이미지 파일을 삭제할 때 호출될 함수
  const onRemove = file => {
    console.log("file", file);

    const newFileList = fileList.filter(
      item => item.ifullPic !== file.ifullPic,
    );
    setFileList(newFileList);
    if (typeof file.ifullPic === "number") {
      setDeletedPics([...deletedPics, file.ifullPic]);
    }

    return true; // 삭제 처리를 진행
  };
  console.log("deletedPics", deletedPics);
  // if (file.originFileObj) {
  //   return true;
  // }

  // if (file.ifullPic) {
  //
  // }

  useEffect(() => {
    // console.log("삭제 목록 deletedPics : ", deletedPics);
  }, [deletedPics]);

  useEffect(() => {
    // console.log("현재 보이는 목록 fileList : ", fileList);
  }, [fileList]);

  return (
    <NoticeWrap>
      <PageTitle>유치원 소식 수정</PageTitle>
      <WriteWrap>
        <Checkbox
          onChange={onChange}
          style={{ marginBottom: 10 }}
          checked={fullNoticeFix}
        >
          상단고정
        </Checkbox>
        <Form ref={formRef} form={form} onFinish={onFinish}>
          <Form.Item
            name="fullTitle"
            initialValue={noticeData.noticeTitle} // 기존 값 설정
            rules={[{ required: true, message: "제목을 입력해주세요!" }]}
          >
            <Input placeholder="제목 입력" />
          </Form.Item>
          <Form.Item
            name="fullContents"
            initialValue={noticeData.noticeContents} // 기존 값 설정
            style={{ height: "150px" }}
            rules={[{ required: true, message: "내용을 입력해주세요!" }]}
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
              beforeUpload={beforeUpload}
              onRemove={onRemove}
              onChange={handleChange}
              customRequest={customRequest}
              className="upload-list-inline"
              multiple={true}
              maxCount={10}
            >
              <Button icon={<UploadOutlined />}>업로드</Button>
            </Upload.Dragger>
          </FileListStyle>
        </Form>
      </WriteWrap>
      <BtnWrap right>
        <GreenBtn onClick={handleGreenButtonClick}>수정</GreenBtn>
        <PinkBtn type="button" onClick={handleCancelConfirmation}>
          취소
        </PinkBtn>
      </BtnWrap>

      <Link to={`/notice/details/${tno}`}>
        {showSuccessModal && (
          <ModalOneBtn
            isOpen={showSuccessModal}
            handleOk={handleSuccessModalOk}
            title="수정 완료"
            subTitle="성공적으로 수정되었습니다."
          />
        )}
      </Link>

      {/* 취소 확인 모달 */}
      {showCancelConfirmModal && (
        <ModalOneBtn
          isOpen={showCancelConfirmModal}
          handleOk={handleCancelConfirmModalOk}
          title="정말 취소할까요?"
          subTitle="작성된 내용은 저장되지 않습니다."
        />
      )}
    </NoticeWrap>
  );
};

export default NoticeModify;
