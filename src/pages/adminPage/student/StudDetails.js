import React, { useEffect, useState } from "react";
import { ContentInner, PageTitle } from "../../../styles/basic";
import {
  DetailBadge,
  DetailInfo,
  FlexBox,
  MyContentWrap,
  MypageWrap,
  TitleWrap,
} from "../../../styles/user/mypage";
import { Button, Dropdown } from "antd";
import {
  BtnWrap,
  GrayBtn,
  GreenBtn,
  OrangeBtn,
  PurpleBtn,
} from "../../../styles/ui/buttons";
import MyProfileComponent from "../../../components/user/mypage/MyProfileComponent";
import MyAccountComponent from "../../../components/user/mypage/MyAccountComponent";
import MyPhysicalComponent from "../../../components/user/mypage/MyPhysicalComponent";
import MyBadge from "../../../components/user/mypage/MyBadge";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { getMypage } from "../../../api/user/userApi";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";

const initState = {
  kidNm: "",
  iclass: 0,
  gender: 0,
  profile: "546fe34c-bf55-46c1-9f0a-2e715edf8c61.jpg",
  birth: "",
  address: "",
  growths: [
    {
      height: 0,
      weight: 0,
      bodyDate: "",
      growth: 0,
      growthDate: "",
      growthMemo: "",
    },
  ],
  parents: [
    {
      iparent: 0,
      uid: "",
      parentNm: "",
      phoneNb: "",
      irelation: 0,
    },
  ],
  memo: ".",
  emerNm: "",
  emerNb: "",
};

const StudDetails = () => {
  const navigate = useNavigate();
  const { isLogin, isAdminLogin, loginState, isParentLogin } = useCustomLogin();
  const [serchParams, setSearchParams] = useSearchParams();

  // 현재 출력 년도, kid 값
  const year = serchParams.get("year");
  const ikid = serchParams.get("ikid");

  const ikidList = loginState.kidList;
  // ikid 값만 추출하여 파라미터값과 비교
  const kidCheck = Array.isArray(ikidList) && ikidList.map(item => item.ikid);
  // 년도 선택
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const yearArr = [];
  for (let yearNum = startYear; yearNum <= currentYear; yearNum++) {
    yearArr.push({
      key: yearNum.toString(),
      label: (
        <Link to={`/admin/student/details?year=${yearNum}&ikid=${ikid}`}>
          {yearNum}
        </Link>
      ),
    });
  }
  // 아이 마이페이지 데이터
  const [myData, setMyData] = useState(initState);
  const [isNavigate, setIsNavigate] = useState();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [codeOpen, setCodeOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editKey, setEditKey] = useState(0);

  // 연결계정 삭제 후 콜백
  const [parentState, setParentState] = useState(0);
  const handleChildClick = () => {
    // 자식 컴포넌트에서 호출할 함수
    setParentState(prevState => prevState + 1);
  };

  // 마이페이지 데이터 가져오기
  useEffect(() => {
    if (!isLogin) {
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
      setIsOpen(true);
      setIsNavigate(`/login`);
    } else {
      getMypage({ year, ikid, successFn, failFn, errorFn });
    }
  }, [initState, year, ikid, parentState, isLogin]);

  // 데이터연동 성공
  const successFn = result => {
    setMyData(result);
  };
  // 데이터연동 실패
  const failFn = result => {
    // console.log(result);
  };
  // 데이터연동 실패
  const errorFn = result => {
    setIsOpen(true);
    setTitle("조회 실패");
    setSubTitle(result);
  };
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  const ilevel = "admin";
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
    // console.log(componentSize);
  };

  return (
    <ContentInner>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <MypageWrap>
        {/* 마이페이지 상단 버튼 */}
        <TitleWrap>
          <PageTitle>기본정보</PageTitle>
          <FlexBox>
            <Dropdown menu={{ items: yearArr }}>
              <Button>
                {year}
                <DownOutlined />
              </Button>
            </Dropdown>
            <BtnWrap>
              <GrayBtn
                onClick={e =>
                  navigate(
                    `/ind/write?ikid=${ikid}&iclass=${myData.iclass}&kidNm=${myData.kidNm}`,
                  )
                }
              >
                알림장작성
              </GrayBtn>
              {isAdminLogin || myData.iclass == loginState.iclass ? (
                <PurpleBtn
                  onClick={e => navigate(`/admin/student/modify?ikid=${ikid}`)}
                >
                  원생정보수정
                </PurpleBtn>
              ) : null}

              <GreenBtn
                onClick={e => navigate("/admin/student?page=1&kidCheck=0")}
              >
                목록보기
              </GreenBtn>
            </BtnWrap>
          </FlexBox>
        </TitleWrap>
        {/* 마이페이지 내용 시작 */}
        <MyContentWrap>
          {/* 프로필 */}
          <MyProfileComponent
            ilevel={ilevel}
            ikid={ikid}
            myData={myData}
            onChildClick={handleChildClick}
          />
          {/* 상세정보 */}
          <DetailInfo>
            <TitleWrap>
              <PageTitle>상세정보</PageTitle>
              {isAdminLogin || myData.iclass == loginState.iclass ? (
                <Link
                  to={`/admin/student/detailsform?year=${year}&ikid=${ikid}`}
                >
                  <OrangeBtn>상세정보 입력</OrangeBtn>
                </Link>
              ) : null}
            </TitleWrap>
            {/* 상세정보 - 신체정보 */}
            <MyPhysicalComponent myData={myData} />
            {/* 상세정보 - 칭찬뱃지 */}
            <DetailBadge>
              <MyBadge
                keywordValue={
                  myData.growths[0] ? myData.growths[0].growth : null
                }
                text={myData.growths[0] ? myData.growths[0].growthMemo : ""}
              />
              <MyBadge
                keywordValue={
                  myData.growths[1] ? myData.growths[1].growth : null
                }
                text={myData.growths[1] ? myData.growths[1].growthMemo : ""}
              />
              <MyBadge
                keywordValue={
                  myData.growths[2] ? myData.growths[2].growth : null
                }
                text={myData.growths[2] ? myData.growths[2].growthMemo : ""}
              />
              <MyBadge
                keywordValue={
                  myData.growths[3] ? myData.growths[3].growth : null
                }
                text={myData.growths[3] ? myData.growths[3].growthMemo : ""}
              />
            </DetailBadge>
          </DetailInfo>

          {/* 연결계정 */}
          {ilevel === "admin" ? (
            <MyAccountComponent
              ikid={ikid}
              myData={myData}
              onChildClick={handleChildClick}
            />
          ) : null}
        </MyContentWrap>
      </MypageWrap>
    </ContentInner>
  );
};

export default StudDetails;
