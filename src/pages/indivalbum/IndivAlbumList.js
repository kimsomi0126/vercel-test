import { Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import { PageNum } from "../../styles/adminstyle/guardianlist";
import { PageTitle } from "../../styles/basic";
import {
  FromToBtnWrap,
  IndWrap,
  TabWrap,
} from "../../styles/individualNotice/ind";
import { FlexBox, TitleWrap } from "../../styles/user/mypage";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import ReadAllIndAlbum from "../../components/indivAlbum/ReadAllIndAlbum";
import {
  getIndParentList,
  getIndTeacherList,
} from "../../api/individualNotice/indivNoticeApi";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import IndParentBtnComponent from "../../components/individualNotice/IndParentBtnComponent";
import IndTeacherBtnComponent from "../../components/individualNotice/IndTeacherBtnComponent";
import Search from "antd/es/input/Search";
import { GreenBtn } from "../../styles/ui/buttons";
import { getIndAlbumList } from "../../api/indivAlbum/indivalbum_api";

const initData = [
  {
    inotice: 0,
    noticeTitle: "",
    noticeContents: "",
    kidNm: "",
    iclass: 0,
    picCheck: 0,
    cmtCheck: 0,
    noticeCheck: 0,
    createdAt: "",
  },
];

const IndivAlbumList = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [serchParams, setSearchParams] = useSearchParams();
  const [indList, setIndList] = useState(initData);
  const [fromTo, setFromTo] = useState(3 || serchParams.get("fromTo"));
  const [count, setCount] = useState(0);
  const currentYear = new Date().getFullYear();

  // 현재 출력 년도, kid 값 params에서 체크
  const year = serchParams.get("year");
  const ikid = serchParams.get("ikid");
  const page = serchParams.get("page");
  const iclass = serchParams.get("iclass");
  const searchValue = serchParams.get("searchValue") || "";

  // 로그인 회원 정보에서 아이 리스트 추출
  const { loginState, isLogin, isParentLogin, isTeacherLogin, isAdminLogin } =
    useCustomLogin();
  const ikidList = loginState.kidList;

  // 페이지네이션
  const handlePageChange = (page, pageSize) => {
    if (isLogin) {
      navigate(
        `/ind?year=${year}&page=${page}&iclass=${iclass}&fromTo=${fromTo}`,
      );
    } else {
      navigate(`/ind?year=${year}&page=${page}&ikid=${ikid}&fromTo=${fromTo}`);
    }
  };

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

  // 데이터 화면출력, 로그인체크
  useEffect(() => {
    if (isParentLogin) {
      // 학부모 로그인
      if (ikid === "0") {
        // 연결된 아이가 없을경우
        setTitle("연결 오류");
        setSubTitle("연결된 원생 정보가 없습니다.");
        setIsNavigate(-1);
        setIsOpen(true);
        return;
      }
      getIndAlbumList({
        page,
        iclass,
        ikid,
        search: indList,
        errorFn,
        successFn,
      });
    } else if (isLogin) {
      // 선생님 로그인
      if ((isTeacherLogin && iclass == loginState.iclass) || isAdminLogin) {
        getIndAlbumList({
          page,
          iclass,
          fromTo,
          search: searchValue,
          errorFn,
          successFn,
        });
      } else {
        setTitle("접근 제한");
        setSubTitle("담당한 반 앨범만 열람 가능합니다.");
        setIsNavigate(-1);
        setIsOpen(true);
        return;
      }
    } else {
      // 로그인 안했을때
      setIsOpen(true);
      setTitle("회원 전용 페이지");
      setSubTitle("로그인 회원만 접근 가능합니다.");
      setIsNavigate("/login");
    }
  }, [year, ikid, iclass, page, fromTo]);

  // 데이터연동 결과
  const successFn = res => {
    setIndList(res.list);
    setCount(res.noticeCnt);
  };
  const errorFn = res => {
    console.log(res);
    // setIsOpen(true);
    // setTitle("데이터 없음");
    // setSubTitle(res);

    const url = isLogin
      ? `/ind?year=${year}&page=1&iclass=${iclass}&searchValue=${searchValue}`
      : `/ind?year=${year}&page=1&ikid=${ikid}&searchValue=${searchValue}`;

    if (fromTo != 3) {
      setFromTo(3);
      setIsNavigate(url);
    } else {
      setIsNavigate(-1);
    }
  };

  // 작성자 분류
  // 식별코드정보값 가져오기

  const handleFromTo = e => {
    const writer = e.target.value;
    const url = isLogin
      ? `/ind?year=${year}&page=1&iclass=${iclass}&searchValue=${searchValue}&fromTo=`
      : `/ind?year=${year}&page=1&ikid=${ikid}&searchValue=${searchValue}&fromTo=`;
    const num =
      isLogin && writer == "teacher"
        ? 1
        : isLogin && writer == "parent"
        ? 0
        : isParentLogin && writer == "parent"
        ? 1
        : isParentLogin && writer == "teacher"
        ? 0
        : 3;
    // const num = writer == "teacher" ? 1 : writer == "parent" ? 0 : 3;

    navigate(url + num, { state: { writer } });
    setFromTo(num);
  };

  // 검색
  const handleSearch = value => {
    if (isParentLogin) {
      getIndParentList({
        page: 1,
        year,
        ikid,
        fromTo,
        search: value,
        errorFn: errorSerchFn,
        successFn,
      });
      setSearchParams({ page: 1, year, ikid, fromTo, searchValue: value });
    } else if (isLogin) {
      // 선생님 로그인
      getIndTeacherList({
        page: 1,
        year,
        iclass,
        fromTo,
        search: value,
        errorFn: errorSerchFn,
        successFn,
      });
      setSearchParams({ page: 1, year, iclass, fromTo, searchValue: value });
    }
  };

  const errorSerchFn = res => {
    setIsOpen(true);
    setTitle("데이터 없음");
    setSubTitle(res);
    setSearchParams({ page: 1, year, iclass, fromTo, searchValue: "" });
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
      <TabWrap>
        <Link
          to={`/ind?year=${currentYear}&page=1&ikid=${
            ikidList[0] ? ikidList[0].ikid : 0
          }`}
        >
          알림장
        </Link>
        <Link to={`/ind/album${search}`} className="active">
          추억앨범
        </Link>
      </TabWrap>
      <TitleWrap className="ind-btn-wrap">
        {isLogin ? (
          <FromToBtnWrap fromTo={fromTo} isLogin={isLogin}>
            <button
              onClick={e => handleFromTo(e)}
              value={"teacher"}
              className="teacher"
            >
              {isLogin ? "내가 쓴" : "내가 받은"} 글
            </button>
            <button
              onClick={e => handleFromTo(e)}
              value={"parent"}
              className="parent"
            >
              {isLogin ? "내가 받은" : "내가 쓴"} 글
            </button>
            {fromTo != 3 ? (
              <button onClick={e => handleFromTo(e)} value={"all"}>
                모아보기
              </button>
            ) : null}
          </FromToBtnWrap>
        ) : (
          <FromToBtnWrap fromTo={fromTo} isLogin={isParentLogin}>
            <button
              onClick={e => handleFromTo(e)}
              value={"parent"}
              className="parent"
            >
              내가 받은 글
            </button>
            {fromTo != 3 ? (
              <button onClick={e => handleFromTo(e)} value={"all"}>
                모아보기
              </button>
            ) : null}
          </FromToBtnWrap>
        )}
        <FlexBox>
          {/* 권한별 서치버튼 */}
          {isLogin ? (
            <IndTeacherBtnComponent
              iclass={iclass}
              indList={indList}
              year={year}
              page={page}
            />
          ) : (
            <IndParentBtnComponent
              ikidList={ikidList}
              indList={indList}
              ikid={ikid}
              year={year}
              page={page}
            />
          )}
          <Search
            placeholder="이름을 입력하세요."
            allowClear
            onSearch={value => {
              handleSearch(value);
            }}
            size={"large"}
          />
          {isLogin ? (
            <GreenBtn
              onClick={() => {
                navigate("/ind/write");
              }}
              className="btn"
            >
              글쓰기
            </GreenBtn>
          ) : null}
        </FlexBox>
      </TitleWrap>
      <ReadAllIndAlbum
        listData={indList}
        year={year}
        ikid={ikid}
        iclass={iclass}
        page={page}
      />
      <PageNum>
        <Pagination
          defaultCurrent={page}
          total={count}
          pageSize={12}
          onChange={handlePageChange}
        />
      </PageNum>
    </IndWrap>
  );
};

export default IndivAlbumList;
