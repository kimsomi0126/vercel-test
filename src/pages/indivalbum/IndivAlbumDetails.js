import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import IndivDetailsComponent from "../../components/individualNotice/IndivDetailsComponent";
import { PageTitle } from "../../styles/basic";
import {
  deleteIndDetail,
  deleteNotice,
  getIndDetail,
} from "../../api/individualNotice/indivNoticeApi";
import { IndBot, IndWrap } from "../../styles/individualNotice/ind";
import {
  IndBtnWrap,
  IndClass,
  IndDetailContent,
  IndDetailFile,
  IndDetailTop,
  IndDetailWrap,
} from "../../styles/individualNotice/inddetail";
import MyClass from "../../components/user/MyClass";
import { Link, useSearchParams } from "react-router-dom";
import { IMG_URL } from "../../api/config";
import {
  BlueBtn,
  BtnWrap,
  GreenBtn,
  PinkBtn,
  RedBtn,
} from "../../styles/ui/buttons";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";

const initData = {
  inotice: 0,
  noticeTitle: "",
  noticeContents: "",
  pics: [],
  comments: [],
  createdAt: "",
  kidNm: "",
  iclass: 0,
};

const IndivAlbumDetails = () => {
  const navigate = useNavigate();
  // tno 체크
  const { tno } = useParams();
  // 현재 출력 년도, kid 값 params에서 체크
  const [serchParams, setSearchParams] = useSearchParams();
  const year = serchParams.get("year");
  const ikid = serchParams.get("ikid");
  const page = serchParams.get("page");
  const iclass = serchParams.get("iclass");
  // 로그인 정보
  const { isLogin, isParentLogin } = useCustomLogin();
  // 연동데이터
  const [data, setData] = useState(initData);

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  // 모달창 취소
  const handleCancel = () => {
    setDelOpen(false);
  };

  useEffect(() => {
    if (!isParentLogin && !isLogin) {
      // 로그인 안했을때
      setIsOpen(true);
      setTitle("회원 전용 페이지");
      setSubTitle("로그인 회원만 접근 가능합니다.");
      setIsNavigate("/login");
    } else {
      getIndDetail({ tno, successFn, errorFn });
    }
  }, []);

  // Get 연동 결과
  const successFn = res => {
    setData({ ...res });
  };
  const errorFn = res => {
    setIsOpen(true);
    setTitle("데이터 오류");
    setSubTitle(res);
  };
  // 회원별 목록보기
  const handleClickList = () => {
    if (isLogin) {
      navigate(`/ind?year=${year}&page=${page}&iclass=${iclass}`);
    } else {
      navigate(`/ind?year=${year}&page=${page}&ikid=${ikid}`);
    }
  };

  // 글 삭제
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

  return (
    <IndWrap>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />

      {/* 글삭제 */}
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
            <MyClass state={data.iclass} /> <h4>{data.kidNm}</h4>
          </IndClass>
          <h3>{data.noticeTitle}</h3>
          <IndBot>
            <div className="ind-date">{data.createdAt.split(" ")[0]}</div>
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
      </IndDetailWrap>
      <IndBtnWrap>
        <GreenBtn onClick={handleClickList}>목록보기</GreenBtn>
        {isLogin ? (
          <>
            {/* <BlueBtn>수정</BlueBtn> */}
            <PinkBtn onClick={handleClickDelete}>삭제</PinkBtn>
          </>
        ) : null}
      </IndBtnWrap>
    </IndWrap>
  );
};

export default IndivAlbumDetails;
