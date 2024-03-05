import { UploadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IMG_URL } from "../../api/config";
import {
  editIndNotice,
  getIndDetail,
  putIndDetail,
} from "../../api/individualNotice/indivNoticeApi";
import MyClass from "../../components/user/MyClass";
import { FileListStyle, WriteWrap } from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import {
  IndClass,
  IndDetailTop,
} from "../../styles/individualNotice/inddetail";
import "../../styles/notice/gallery.css";
import { NoticeWrap } from "../../styles/notice/notice";
import { BtnWrap, GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import { IndBot } from "../../styles/individualNotice/ind";

const imgpath = `${IMG_URL}/pic/notice`;
const path = `${IMG_URL}/api/notice`;
const customRequest = ({ onSuccess }) => {
  onSuccess("ok");
};

export const obj = [
  {
    ikid: 0,
    inotice: 0,
    iclass: 0,
    noticeTitle: "",
    noticeContents: "",
    noticePics: [],
    kidNm: "",
  },
];

const IndivNotiModify = () => {
  const { tno, ikid } = useParams();
  const [noticeData, setNoticeData] = useState(obj); // noticeData 상태를 추가
  const params = useSearchParams();

  const [data, setData] = useState(obj);
  const [noticeCheck, setNoticeCheck] = useState(0);
  const [postNumber, setPostNumber] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [detailData, setDetailData] = useState(obj);
  const [detailImage, setDetailImage] = useState([]);
  const navigate = useNavigate();
  const [treeData, setTreeData] = useState([]);
  const [noticeFix, setNoticeFix] = useState(0);
  const [selectedKids, setSelectedKids] = useState([]);
  const [deletedPics, setDeletedPics] = useState([]);
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year");
  const page = searchParams.get("page");
  const iclass = searchParams.get("iclass");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [showExceedLimitModal, setShowExceedLimitModal] = useState(false); // 파일 제한 초과 경고 모달 상태
  const [newPics, setNewPics] = useState([]);

  // 모달 상태 관리
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCancelConfirmation = () => {
    setShowCancelConfirmModal(true); // 취소 확인 모달 표시
  };

  const handleFail = errorMessage => {
    Modal.error({
      title: "알림장 업로드 실패",
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
    // JSON 데이터 추가
    const noticeInfo = {
      inotice: tno,
      ikid: ikid,
      noticeTitle: data.noticeTitle,
      noticeContents: data.noticeContents,
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

    console.log("현재 남아있는 fileList ", fileList);
    fileList.forEach(async file => {
      console.log("file", file);
      if (file.originFileObj) {
        // 새로운 파일인 경우, 파일 데이터를 추가합니다.
        formData.append("pics", file.originFileObj);
      }
    });

    // 서버에 요청을 보냅니다.
    try {
      const response = await putIndDetail({
        data: formData,
        successFn: () => setShowSuccessModal(true), // 성공 모달 표시
        failFn: handleFail,
        errorFn: handleError,
      });

      // 응답 처리
      console.log("Response from putIndDetail:", response);
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const formRef = useRef();

  const handleGreenButtonClick = () => {
    formRef.current.submit();
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

  useEffect(() => {
    const fetchNoticeData = async () => {
      editIndNotice({
        tno: tno,
        ikid: ikid,
        successFn: data => {
          setNoticeData(data);
          form.setFieldsValue({
            noticeTitle: data.noticeTitle,
            noticeContents: data.noticeContents,
          });

          // Transform album pictures for the fileList state
          // console.log("데이터 확인", data);
          const transformedFileList = data.noticePic.map(
            (noticePic, index) => ({
              inoticePic: noticePic.inoticePic, // uid is required to be unique
              name: noticePic.noticePic, // file name
              status: "done", // upload status
              url: `${imgpath}/${tno}/${noticePic.noticePic}`, // file URL, adjust the path as needed
            }),
          );
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

    getIndDetail({
      tno: tno,
      successFn: data => {
        setData(data);
        setIsLoading(false);
      },
      failFn: message => {
        console.error(message);
        setIsLoading(false);
      },
      errorFn: data => {
        console.error(data);
        setIsLoading(false);
      },
    });

    fetchNoticeData();
  }, [tno, ikid, form]);

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
      item => item.inoticePic !== file.inoticePic,
    );
    setFileList(newFileList);
    if (typeof file.inoticePic === "number") {
      setDeletedPics([...deletedPics, file.inoticePic]);
    }

    return true; // 삭제 처리를 진행
  };
  console.log("deletedPics", deletedPics);

  useEffect(() => {
    // console.log("삭제 목록 deletedPics : ", deletedPics);
  }, [deletedPics]);

  useEffect(() => {
    // console.log("현재 보이는 목록 fileList : ", fileList);
  }, [fileList]);

  return (
    <NoticeWrap>
      <PageTitle>알림장 수정</PageTitle>

      <WriteWrap>
        <IndDetailTop>
          <IndClass>
            <MyClass state={data.iclass} /> <h4>{data.kidNm}</h4>
          </IndClass>
        </IndDetailTop>
        <Checkbox
          onChange={onChange}
          style={{ marginBottom: 10 }}
          checked={noticeCheck}
        >
          중요
        </Checkbox>
        <Form ref={formRef} form={form} onFinish={onFinish}>
          <Form.Item
            name="noticeTitle"
            initialValue={noticeData.noticeTitle} // 기존 값 설정
            rules={[{ required: true, message: "제목을 입력해주세요!" }]}
          >
            <Input placeholder="제목 입력" />
          </Form.Item>
          <Form.Item
            name="noticeContents"
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
    </NoticeWrap>
  );
};

export default IndivNotiModify;
