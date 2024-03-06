import React, { Suspense, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate, useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { IMG_URL } from "../../api/config";
import {
  deleteIndAlbum,
  getIndAlbumDetail,
} from "../../api/indivAlbum/indivalbum_api";
import MyTag from "../../components/indivAlbum/MyTag";
import Loading from "../../components/loading/Loading";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";
import useCustomLogin from "../../hooks/useCustomLogin";
import { PageTitle } from "../../styles/basic";
import { IndBot, IndWrap } from "../../styles/individualNotice/ind";
import {
  IndAlbumDetailContent,
  IndBtnWrap,
  IndClass,
  IndDetailTop,
  IndDetailWrap,
} from "../../styles/individualNotice/inddetail";
import { BlueBtn, GreenBtn, PinkBtn } from "../../styles/ui/buttons";

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
  const { isLogin, isParentLogin, isAdminLogin } = useCustomLogin();
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
    if (!isParentLogin && !isLogin && !isAdminLogin) {
      // 로그인 안했을때
      setIsOpen(true);
      setTitle("회원 전용 페이지");
      setSubTitle("로그인 회원만 접근 가능합니다.");
      setIsNavigate("/login");
    } else {
      getIndAlbumDetail({ tno, successFn, errorFn });
    }
  }, [tno, isParentLogin, isLogin, isAdminLogin]);

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
      navigate(`/ind/album?year=${year}&page=${page}&iclass=${iclass}`);
    } else {
      navigate(`/ind/album?year=${year}&page=${page}&ikid=${ikid}`);
    }
  };

  // 글 삭제
  const [delOpen, setDelOpen] = useState(false);
  const handleClickDelete = () => {
    setDelOpen(true);
    setTitle("정말 삭제할까요?");
    setSubTitle(
      "삭제된 추억앨범은 복구할 수 없습니다. \n 정말 삭제하시겠습니까?",
    );
  };
  const handleDelOk = () => {
    deleteIndAlbum({ tno, successDelFn, errorDelFn });
  };
  const successDelFn = res => {
    setDelOpen(false);
    setIsOpen(true);
    setTitle("삭제 완료");
    setSubTitle("삭제 완료되었습니다.");
    isLogin
      ? setIsNavigate(`/ind/album?year=${year}&page=${page}&iclass=${iclass}`)
      : setIsNavigate(`/ind/album?year=${year}&page=${page}&ikid=${ikid}`);
  };
  const errorDelFn = error => {
    // 삭제 실패 처리
    setDelOpen(false); // 삭제 확인 모달을 닫습니다.
    setIsOpen(true); // 에러 알림 모달을 엽니다.
    setTitle("삭제 실패"); // 에러 모달의 제목을 설정합니다.
    setSubTitle("삭제에 실패했습니다. \n 잠시 후 다시 시도해 주세요."); // 에러 모달의 부제목을 설정합니다.
  };

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
      <PageTitle>추억앨범</PageTitle>
      <IndDetailWrap>
        <IndDetailTop>
          <IndClass>
            {data.kids && data.kids.length > 0 && <MyTag state={data.kids} />}
          </IndClass>
          <h3>{data.memoryTitle}</h3>
          <IndBot>
            <div className="ind-date">{data.createdAt.split(" ")[0]}</div>
          </IndBot>
        </IndDetailTop>
        <IndAlbumDetailContent>
          <pre>{data.memoryContents}</pre>
        </IndAlbumDetailContent>
        {/* <IndDetailFile> */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="10px">
            {Array.isArray(data.memoryPic) &&
              data.memoryPic.map((item, index) => (
                <Suspense fallback={<Loading />} key={index}>
                  <Link
                    to={`${IMG_URL}/pic/memory/${data.imemory}/${item}`}
                    key={index}
                    target="_blank"
                    className="item"
                  >
                    <img
                      key={index}
                      style={{ width: "100%", display: "block" }}
                      src={`${IMG_URL}/pic/memory/${data.imemory}/${item}`}
                    />
                  </Link>
                </Suspense>
              ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* {Array.isArray(data.memoryPic) &&
          data.memoryPic.map((item, index) => (
            <Link
              to={`${IMG_URL}/pic/memory/${data.imemory}/${item}`}
              key={index}
              target="_blank"
            >
              {item}
            </Link>
          ))} */}
        {/* </IndDetailFile> */}
      </IndDetailWrap>
      <IndBtnWrap>
        <GreenBtn onClick={handleClickList}>목록보기</GreenBtn>
        {isLogin ? (
          <>
            <BlueBtn
            // onClick={() => {
            //   navigate(`${host}/modify/${pno}`);
            // }}
            >
              수정
            </BlueBtn>
            <PinkBtn onClick={handleClickDelete}>삭제</PinkBtn>
          </>
        ) : null}
      </IndBtnWrap>
    </IndWrap>
  );
};

export default IndivAlbumDetails;
