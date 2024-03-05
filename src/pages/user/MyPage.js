import React, { useEffect, useRef, useState } from "react";
import { ContentInner, PageTitle } from "../../styles/basic";
import { Button, Dropdown, Form, Input } from "antd";
import {
  DetailBadge,
  DetailInfo,
  FlexBox,
  MyContentWrap,
  MypageWrap,
  TitleWrap,
} from "../../styles/user/mypage";
import { BtnWrap, GrayBtn, GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import MyProfileComponent from "../../components/user/mypage/MyProfileComponent";
import MyPhysicalComponent from "../../components/user/mypage/MyPhysicalComponent";
import MyBadge from "../../components/user/mypage/MyBadge";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import { useNavigate } from "react-router";
import { getMypage, patchParent, postKidCode } from "../../api/user/userApi";
import { DownOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";
import ParentEdit from "./ParentEdit";
import { refreshJWT } from "../../util/jwtUtil";

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

const MyPage = () => {
  const navigate = useNavigate();
  const [serchParams, setSearchParams] = useSearchParams();
  // 현재 출력 년도, kid 값 체크
  const year = serchParams.get("year");
  const ikid = serchParams.get("ikid");

  // 로그인 회원 정보에서 아이 리스트 추출
  const { loginState, isParentLogin, doLogout } = useCustomLogin();
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
      label: <Link to={`/mypage?year=${yearNum}&ikid=${ikid}`}>{yearNum}</Link>,
    });
  }

  // 아이 선택
  const items =
    Array.isArray(ikidList) &&
    ikidList.map(item => {
      return {
        key: item.ikid.toString(),
        label: (
          <Link to={`/mypage?year=${year}&ikid=${item.ikid}`}>
            {item.kidNm}
          </Link>
        ),
      };
    });

  // 아이 마이페이지 데이터
  const [myData, setMyData] = useState(initState);

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();

  // 마이페이지 데이터 가져오기
  useEffect(() => {
    // 예외처리
    if (!isParentLogin) {
      // 학부모 계정이 아닐경우
      setTitle("학부모 전용페이지");
      setSubTitle("학부모회원만 이용할 수 있는 서비스 입니다.");
      setIsOpen(true);
      setIsNavigate(-1);
      return;
    } else if (!year || !ikid) {
      // 년도, 아이 pk 가 주소에 없을경우
      setTitle("잘못된 경로");
      setSubTitle("잘못된 경로입니다. 다시 시도해주세요.");
      setIsOpen(true);
      setIsNavigate(-1);
      return;
    } else if (ikid === "0") {
      // 연결된 아이가 없을경우
      setTitle("학부모 전용 페이지");
      setSubTitle("연결된 원생 정보가 없습니다. \n 관리자에게 문의해주세요.");
      setIsNavigate(-1);
      setIsOpen(true);
      return;
    } else {
      getMypage({ year, ikid, successFn, errorFn });
    }
  }, [initState, year, ikid]);

  // 데이터연동 성공
  const successFn = result => {
    // 나와 연결된 아이가 맞는지 확인 후 데이터 가져옴
    if (!kidCheck.includes(parseInt(ikid))) {
      setTitle("조회 실패");
      setSubTitle("본인의 아이 정보만 확인 가능합니다.");
      setIsOpen(true);
      setIsNavigate(-1);
      return;
    } else {
      setMyData(result);
    }
  };

  // 데이터연동 실패
  const errorFn = result => {
    setIsOpen(true);
    setTitle("조회 실패");
    setSubTitle(result);
    setIsNavigate(-1);
  };

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
    setIsEditOpen(false);
    setCodeOpen(false);
    setDelOpen(false);
  };

  // 학부모수정
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editKey, setEditKey] = useState(0);
  const onParentEditClick = () => {
    setIsEditOpen(true);
    setEditKey(prevKey => prevKey + 1);
  };

  // 아이추가
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState({ code: "" });
  const onCodeAddClick = () => {
    setCodeOpen(true);
    setTitle("아이 추가");
    setSubTitle("식별코드를 입력해주세요.");
  };
  const formRef = useRef();
  const handleExternalSubmit = () => {
    formRef.current.submit();
  };
  const onValuesChange = values => {
    setCode(values);
  };
  const onFinishFailed = errorInfo => {
    // console.log("Failed:", errorInfo);
  };
  const onFinish = values => {
    postKidCode({ code, successAddFn, errorAddFn });
  };

  // 아이추가 결과
  const successAddFn = res => {
    setCodeOpen(false);
    setIsOpen(true);
    setTitle("추가 완료");
    setSubTitle(
      "추가가 완료되었습니다. \n 업데이트를 위하여 다시 로그인해주세요.",
    );
    setIsNavigate("/login");
    doLogout();
  };
  const errorAddFn = res => {
    setIsOpen(true);
    setTitle("추가 실패");
    setSubTitle(res);
    setCodeOpen(false);
  };
  // 회원탈퇴
  const [delOpen, setDelOpen] = useState(false);
  const handleClickDelete = () => {
    // console.log("탈퇴");

    setDelOpen(true);
    setTitle("정말 탈퇴할까요?");
    setSubTitle("삭제된 계정은 복구할 수 없습니다. \n 정말 탈퇴하시겠습니까?");
  };
  const handleDelOk = () => {
    patchParent({ successDelFn, errorDelFn });
  };

  const successDelFn = res => {
    // console.log(res);
    setIsOpen(true);
    setTitle("탈퇴 완료");
    setSubTitle("탈퇴가 완료되었습니다. \n 메인페이지로 이동합니다.");
    setIsNavigate("/");
    doLogout();
  };
  const errorDelFn = res => {
    // console.log(res);
    setIsOpen(true);
    setTitle("탈퇴 실패");
    setSubTitle(res);
  };

  return (
    <ContentInner>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      {/* 식별코드 입력창 */}
      <ModalTwoBtn
        isOpen={codeOpen}
        handleOk={handleExternalSubmit}
        handleCancel={handleCancel}
        title={title}
        subTitle={subTitle}
      >
        <Form
          ref={formRef}
          name="account"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "식별코드를 입력해주세요. (최대 15글자)",
                max: 15,
              },
            ]}
          >
            <Input size="large" placeholder="코드입력" />
          </Form.Item>
        </Form>
      </ModalTwoBtn>
      {/* 학부모정보 수정창 */}
      {isEditOpen && (
        <ParentEdit
          open={isEditOpen}
          handleCancel={handleCancel}
          key={editKey}
        />
      )}
      {/* 회원탈퇴 */}
      <ModalTwoBtn
        isOpen={delOpen}
        handleOk={handleDelOk}
        handleCancel={handleCancel}
        title={title}
        subTitle={subTitle}
      />
      <MypageWrap>
        {/* 마이페이지 상단 버튼 */}
        <TitleWrap>
          <PageTitle>마이페이지</PageTitle>
          <FlexBox>
            <Dropdown menu={{ items: yearArr }}>
              <Button>
                {year}
                <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown menu={{ items }}>
              <Button>
                {myData.kidNm}
                <DownOutlined />
              </Button>
            </Dropdown>
            <BtnWrap>
              <GrayBtn
                onClick={e => {
                  onCodeAddClick(e);
                }}
              >
                아이추가
              </GrayBtn>
              <GrayBtn
                onClick={e => {
                  navigate(
                    `/ind?year=${currentYear}&page=1&ikid=${
                      ikidList[0] ? ikidList[0].ikid : 0
                    }`,
                  );
                }}
              >
                알림장
              </GrayBtn>
              <GreenBtn onClick={onParentEditClick}>학부모정보수정</GreenBtn>
              <PinkBtn onClick={handleClickDelete}>회원탈퇴</PinkBtn>
            </BtnWrap>
          </FlexBox>
        </TitleWrap>
        {/* 마이페이지 내용 시작 */}
        <MyContentWrap>
          {/* 프로필 */}
          <MyProfileComponent ilevel={parent} ikid={ikid} myData={myData} />
          {/* 연결계정 */}
          {/* 상세정보 */}
          <DetailInfo>
            <TitleWrap>
              <PageTitle>{year}년 상세정보</PageTitle>
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
        </MyContentWrap>
      </MypageWrap>
    </ContentInner>
  );
};

export default MyPage;
