import { Button, Dropdown, Select } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { UserTop, UserTopRight } from "../../styles/adminstyle/guardianlist";
import { PageTitle } from "../../styles/basic";
import { GreenBtn } from "../../styles/ui/buttons";
import GuardianListComponent from "../../components/adminpage/GuardianListComponent";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";
import {
  deleteParentList,
  getAdminParentList,
} from "../../api/adminPage/admin_api";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import { useNavigate } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useDispatch, useSelector } from "react-redux";

const initParentList = {
  totalCnt: 0,
  parentPage: [
    {
      iparent: 0,
      parentNm: "",
      uid: "",
      phoneNb: "",
      kids: [
        {
          kidNm: "",
          iclass: 0,
        },
      ],
    },
  ],
};
const GuardianList = () => {
  const [serchParams, setSearchParams] = useSearchParams();
  const [parentList, setParentList] = useState(initParentList);
  const [changeInfo, setChangeInfo] = useState(0);
  const navigate = useNavigate();
  const page = serchParams.get("page");
  const iclass = serchParams.get("iclass");
  const dispatch = useDispatch();
  // 로그인정보 체크
  const { isLogin, isAdminLogin } = useCustomLogin();

  // 반 선택
  const classArr = [
    { iclass: 0, classNm: "반 전체" },
    { iclass: 1, classNm: "무궁화반" },
    { iclass: 2, classNm: "해바라기반" },
    { iclass: 3, classNm: "장미반" },
  ];

  const classItems =
    Array.isArray(classArr) &&
    classArr.map(item => {
      return {
        key: item.iclass.toString(),
        label: (
          <Link to={`/admin?page=${page}&iclass=${item.iclass}`}>
            {item.classNm}
          </Link>
        ),
      };
    });

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  const [delOpen, setDelOpen] = useState(false);

  // 학부모 정보 삭제
  const [checkedItems, setCheckedItems] = useState([]);

  const oncheckedClick = item => {
    setCheckedItems(item);
  };
  // console.log("체크", checkedItems);

  const handleDeleteClick = () => {
    if (checkedItems.length === 0) {
      setIsOpen(true);
      setTitle("삭제할 대상이 없습니다.");
      setSubTitle("삭제할 학부모 계정을 선택해주세요.");
    } else {
      // console.log("학부모 정보 삭제");
      setDelOpen(true);
      setTitle("정말 삭제할까요?");
      setSubTitle("학부모 정보가 삭제됩니다. 정말 삭제할까요?");
    }
  };

  const handleDelOk = () => {
    const obj = {
      iparents: [...checkedItems],
    };
    // console.log("오비제이", obj);
    deleteParentList({
      successFn,
      errorFn,
      obj,
    });
  };
  const successFn = res => {
    setIsOpen(true);
    setTitle("삭제 완료");
    setSubTitle("삭제가 완료되었습니다.");
    setDelOpen(false);
    setCheckedItems([]);
  };
  const errorFn = res => {
    // console.log(res);
    setIsOpen(true);
    setTitle("삭제 실패");
    setSubTitle(res);
  };
  const handleCancel = () => {
    setDelOpen(false);
  };
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };

  // 학부모 정보수정
  const [editState, setEditState] = useState(0);
  const onChildClick = () => {
    // 자식 컴포넌트에서 호출할 함수
    setEditState(prevState => prevState + 1);
    console.log("돼라");
  };

  // 이름 검색
  const handleSearch = value => {
    console.log(value);
    getAdminParentList({
      successFn: successGetFn,
      errorFn: errorSearchFn,
      page: 1,
      iclass,
      search: value,
    });
  };
  // 학부모 리스트 GET
  useEffect(() => {
    if (!isLogin) {
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
      setIsOpen(true);
      setIsNavigate(`/login`);
      return;
    } else {
      getAdminParentList({
        successFn: successGetFn,
        errorGetFn,
        page,
        iclass,
        search: "",
      });
    }
  }, [page, iclass, checkedItems, editState]);

  const successGetFn = result => {
    setParentList(result);
    // console.log("검색결과", result);
  };

  const errorGetFn = result => {
    setIsOpen(true);
    setTitle("데이터 없음");
    console.log(result);
  };
  const errorSearchFn = result => {
    setIsOpen(true);
    setTitle("검색 결과 없음");
    setSubTitle("검색된 이름이 없습니다.");
    console.log(result);
  };
  return (
    <>
      <UserTop>
        <PageTitle>학부모 관리</PageTitle>
        <UserTopRight>
          <Dropdown menu={{ items: classItems }}>
            <Button>
              {iclass === "0"
                ? "반 전체"
                : iclass === "1"
                ? "무궁화반"
                : iclass === "2"
                ? "해바라기반"
                : iclass === "3"
                ? "장미반"
                : iclass === "-1"
                ? "졸업"
                : iclass === "-2"
                ? "퇴소"
                : "반 선택"}
              <DownOutlined />
            </Button>
          </Dropdown>
          <Search
            placeholder="이름을 입력하세요."
            allowClear
            onSearch={value => {
              handleSearch(value);
            }}
            size={"large"}
          />
          {isAdminLogin ? (
            <GreenBtn onClick={handleDeleteClick}>선택회원삭제</GreenBtn>
          ) : null}
          {/* 안내창 */}
          <ModalOneBtn
            isOpen={isOpen}
            handleOk={handleOk}
            title={title}
            subTitle={subTitle}
          />
          {/* 학부모 연결 삭제창 */}
          <ModalTwoBtn
            isOpen={delOpen}
            handleOk={handleDelOk}
            handleCancel={handleCancel}
            title={title}
            subTitle={subTitle}
          />
        </UserTopRight>
      </UserTop>
      <GuardianListComponent
        iclass={iclass}
        page={page}
        parentList={parentList}
        oncheckedClick={oncheckedClick}
        checkedItems={checkedItems}
        onChildClick={onChildClick}
      />
    </>
  );
};

export default GuardianList;
