import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"; // 수정된 부분: useSearchParams 추가
import { Form, Input, Button } from "antd"; // 수정된 부분: Form, Input, Button 추가
import { IMG_URL, SERVER_URL } from "../../api/config";
import {
  deleteIndDetail,
  getIndDetail,
  deleteIndComment,
  postIndComment,
} from "../../api/individualNotice/indivNoticeApi";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";
import MyClass from "../../components/user/MyClass";
import useCustomLogin from "../../hooks/useCustomLogin";
import { PageTitle } from "../../styles/basic";
import { IndBot, IndWrap } from "../../styles/individualNotice/ind";
import {
  IndBtnWrap,
  IndClass,
  IndDetailContent,
  IndDetailFile,
  IndDetailTop,
  IndDetailWrap,
} from "../../styles/individualNotice/inddetail";
import { BlueBtn, GreenBtn, OrangeBtn, PinkBtn } from "../../styles/ui/buttons";
import {
  CommentBox,
  CommentView,
  CommentWrap,
  CommentWrite,
} from "../../styles/ui/comment";
import TextArea from "antd/es/input/TextArea";
import IndClassName from "./IndClassName";
const host = `${SERVER_URL}/ind`;

const initData = {
  inotice: 0,
  noticeTitle: "",
  noticeContents: "",
  pics: [],
  comments: [],
  createdAt: "",
  kidNm: "",
  iclass: 0,
  iteacher: 0,
};

const IndivDetailsComponent = ({ tno }) => {
  const navigate = useNavigate();
  // params 정보
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year");
  const ikid = searchParams.get("ikid");
  const page = searchParams.get("page");
  const iclass = searchParams.get("iclass");
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, loginState, isTeacherLogin, isAdminLogin, isParentLogin } =
    useCustomLogin();
  // 모달 state
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  // 댓글 state
  const [commentState, setCommentState] = useState(false);
  const [commentNum, setCommentNum] = useState(null);
  const iwriter = loginState.iteacher || loginState.iparent;
  const ilevel = loginState.role === "PARENT" ? 1 : loginState.ilevel;
  const [isDelComment, setIsDelComment] = useState(false);
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };

  const handleCancel = () => {
    setDelOpen(false);
  };

  useEffect(() => {
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
  }, [tno, commentState]);

  const successFn = res => {
    setData({ ...res });
    setCommentState(!commentState);
    setCommentNum(null);
    console.log("성공", res);
  };

  const errorFn = res => {
    setIsOpen(true);
    setTitle("데이터 오류");
    setSubTitle(res);
    console.log("실패", res);
  };

  const handleClickList = () => {
    if (isLogin) {
      navigate(`/ind?year=${year}&page=${page}&iclass=${iclass}`);
    } else {
      navigate(`/ind?year=${year}&page=${page}&ikid=${ikid}`);
    }
  };

  const [delOpen, setDelOpen] = useState(false);
  const handleClickDelete = () => {
    setDelOpen(true);
    setTitle("정말 삭제할까요?");
    setSubTitle(
      "삭제된 알림장은 복구할 수 없습니다. \n 정말 삭제하시겠습니까?",
    );
  };

  const handleDelOk = () => {
    deleteIndDetail({ tno, successDelFn, errorDelFn });
  };

  const successDelFn = res => {
    setDelOpen(false);
    setIsOpen(true);
    setTitle("삭제 완료");
    setSubTitle("삭제 완료되었습니다.");
    isLogin
      ? setIsNavigate(`/ind?year=${year}&page=${page}&iclass=${iclass}`)
      : setIsNavigate(`/ind?year=${year}&page=${page}&ikid=${ikid}`);
  };

  const errorDelFn = () => {};

  const handleWriteComment = value => {
    let obj = {
      inotice: tno,
      noticeComment: value.noticeComment,
      iteacher: loginState.iteacher,
    };

    if (isParentLogin) {
      obj = {
        inotice: tno,
        noticeComment: value.noticeComment,
        iparent: loginState.iparent,
      };
    }

    console.log(obj, "댓글등록");
    console.log("댓글작성 확인", value);
    postIndComment({
      obj,
      successFn,
      errorFn,
    });
    form.resetFields();
  };

  const handleDeleteComment = () => {
    if (isLogin) {
      deleteIndComment({
        inoticeComment: commentNum,
        inotice: tno,
        iteacher: loginState.iteacher,
        successFn,
        errorFn,
      });
    } else {
      deleteIndComment({
        inoticeComment: commentNum,
        inotice: tno,
        iparent: loginState.iparent,
        successFn,
        errorFn,
      });
    }
    setIsDelComment(false);
  };

  return (
    <IndWrap>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <ModalTwoBtn
        isOpen={delOpen}
        handleOk={handleDelOk}
        handleCancel={handleCancel}
        title={title}
        subTitle={subTitle}
      />
      <PageTitle>알림장</PageTitle>
      <IndDetailWrap>
        <IndDetailTop>
          <IndClass>
            <IndClassName state={data.iclass} /> <p>{data.kidNm}</p>
          </IndClass>
          <h3>{data.noticeTitle}</h3>
          <IndBot>
            <div className="ind-date">
              {data && data.createdAt ? data.createdAt.split(" ")[0] : ""}
            </div>
          </IndBot>
        </IndDetailTop>
        <IndDetailContent>
          <pre>{data.noticeContents}</pre>
        </IndDetailContent>
        <IndDetailFile>
          {Array.isArray(data.pics) &&
            data.pics.map((item, index) => (
              <Link
                to={`${IMG_URL}/pic/notice/${data.inotice}/${item}`}
                key={index}
                target="_blank"
              >
                {item}
              </Link>
            ))}
        </IndDetailFile>
        <CommentWrap>
          <CommentView>
            {Array.isArray(data.comments) &&
              data.comments.map((item, index) => (
                <CommentBox
                  key={item.inoticeComment}
                  className={
                    ilevel === item.ilevel && item.writerIuser == iwriter
                      ? "right"
                      : null
                  }
                >
                  <pre className="text">{item.noticeComment}</pre>
                  <ul>
                    <li className="name">{item.writerName}</li>
                    <li className="date">{item.createdAt}</li>
                  </ul>
                  {ilevel === item.ilevel && item.writerIuser == iwriter ? (
                    <span
                      className="delete"
                      onClick={() => {
                        setCommentNum(item.inoticeComment);
                        setIsDelComment(true);
                      }}
                    >
                      댓글삭제
                    </span>
                  ) : null}
                </CommentBox>
              ))}
          </CommentView>
          <CommentWrite>
            <Form form={form} onFinish={handleWriteComment}>
              <Form.Item name="noticeComment">
                <TextArea required placeholder="댓글내용을 입력해주세요." />
              </Form.Item>
              <OrangeBtn>등록</OrangeBtn>
            </Form>
          </CommentWrite>
        </CommentWrap>
      </IndDetailWrap>

      {/* 댓글삭제 */}
      <ModalTwoBtn
        isOpen={isDelComment}
        handleOk={() => handleDeleteComment()}
        handleCancel={() => setIsDelComment(false)}
        title={"댓글 삭제"}
        subTitle={"삭제된 댓글은 복구할 수 없습니다. \n정말 삭제하시겠습니까?"}
      />

      <IndBtnWrap>
        <GreenBtn onClick={handleClickList}>목록보기</GreenBtn>
        {isLogin ? (
          <>
            <BlueBtn
              onClick={() => {
                navigate(
                  `${host}/modify/${tno}?year=${year}&page=${page}&iclass=${iclass}`,
                );
              }}
            >
              수정
            </BlueBtn>
            <PinkBtn onClick={handleClickDelete}>삭제</PinkBtn>
          </>
        ) : (
          <PinkBtn onClick={handleClickDelete}>삭제</PinkBtn>
        )}
      </IndBtnWrap>
    </IndWrap>
  );
};

export default IndivDetailsComponent;
