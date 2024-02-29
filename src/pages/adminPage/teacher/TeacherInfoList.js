import React, { useEffect, useRef, useState } from "react";
import {
  TeacherTop,
  TeacherTopRight,
} from "../../../styles/adminstyle/teacherinfolist";
import { PageTitle } from "../../../styles/basic";
import { Button, Dropdown, Form, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { BlueBtn, OrangeBtn } from "../../../styles/ui/buttons";
import TeacherListComponent from "../../../components/adminpage/TeacherListComponent";
import { useNavigate } from "react-router";
import useCustomLogin from "../../../hooks/useCustomLogin";
import { getTeacherList, patchTeacher } from "../../../api/adminPage/admin_api";
import { Link, useSearchParams } from "react-router-dom";
import ModalOneBtn from "../../../components/ui/ModalOneBtn";
import ModalTwoBtn from "../../../components/ui/ModalTwoBtn";

const initTeacherList = {
  teacherCnt: 0,
  list: [
    {
      iteacher: 0,
      iclass: 0,
      teacherNm: "",
      teacherUid: "",
      tcIsDel: 0,
      tcEmail: "",
      teacherProfile: "",
      teacherIntroduce: "",
    },
  ],
};
const TeacherInfoList = () => {
  const navigate = useNavigate();
  const [serchParams, setSearchParams] = useSearchParams();
  const page = serchParams.get("page");
  const iclass = serchParams.get("iclass");
  const iteacher = serchParams.get("iteacher");
  const tcIsDel = serchParams.get("tcIsDel");
  const [changeState, setChangeState] = useState(0);

  // 체크 항목 상태 변경
  const [checkedItems, setCheckedItems] = useState([]);

  const oncheckedClick = item => {
    setCheckedItems(item);
  };

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  const [changeOpen, setChangeOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  // 선생님 리스트 GET
  const [teacherList, setTeacherList] = useState(initTeacherList);
  const { isLogin } = useCustomLogin();

  useEffect(() => {
    if (!isLogin) {
      setTitle("관리자 전용 페이지");
      setSubTitle("관리자만 접근 가능합니다.");
      setIsOpen(true);
      setIsNavigate(`/login`);
      return;
    } else {
      getTeacherList({
        successFn,
        errorFn,
        page,
        iclass,
        tcIsDel,
        search: "",
      });
    }
  }, [page, iclass, tcIsDel, checkedItems]);

  //검색
  const handleSearch = value => {
    console.log(value);
    getTeacherList({
      successFn,
      errorFn: errorSearchFn,
      page: 1,
      iclass,
      tcIsDel,
      search: value,
    });
  };
  const successFn = result => {
    setTeacherList(result);
    console.log("됐나요?", result);
  };

  const errorFn = result => {
    setTeacherList(result);
  };
  const errorSearchFn = result => {
    setIsOpen(true);
    setTitle("검색 결과 없음");
    setSubTitle("검색된 이름이 없습니다.");
    console.log(result);
  };
  const formRef = useRef();
  const handleExternalSubmit = () => {
    formRef.current.submit();
  };

  // 선택 퇴사
  const handleChangeClick = () => {
    if (checkedItems.length === 0) {
      // console.log("변경할 대상이 없습니다");
      setIsOpen(true);
      setTitle("변경할 대상이 없습니다.");
    } else {
      // console.log("재원상태 변경");
      setChangeOpen(true);
      setTitle("재직 상태 수정");
      setSubTitle("재직 상태를 선택해주세요.");
    }
  };
  console.log(checkedItems);

  const handleDelOk = () => {
    formRef.current.submit();
  };

  const successpatchFn = res => {
    setIsOpen(true);
    setTitle("변경 완료");
    setSubTitle("성공적으로 변경되었습니다.");
    setDelOpen(false);
    setCheckedItems([]);
    setChangeOpen();
  };
  const errorpatchFn = res => {
    console.log(res);
    setIsOpen(true);
    setTitle("변경 실패");
    setSubTitle("변경을 실패했습니다. 다시 시도해주세요.");
  };
  const handleCancel = () => {
    setDelOpen(false);
    setChangeOpen(false);
  };

  const handleOk = () => {
    setIsOpen(false);
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  const onValuesChange = values => {
    const res = parseInt(values.work);
    setChangeState(res);
  };
  const onFinish = values => {
    const obj = {
      iteachers: [...checkedItems],
      tcIsDel: changeState,
    };
    // console.log("오비제이", obj);
    patchTeacher({
      successpatchFn,
      errorpatchFn,
      obj,
    });
  };
  // 반 선택 드롭다운
  const classArr = [
    { iclass: 0, classNm: "전체", tcIsDel },
    { iclass: 1, classNm: "무궁화반", tcIsDel },
    { iclass: 2, classNm: "해바라기반", tcIsDel },
    { iclass: 3, classNm: "장미반", tcIsDel },
    { iclass: 4, classNm: "원장", tcIsDel },
  ];

  const classItems =
    Array.isArray(classArr) &&
    classArr.map(item => {
      return {
        key: item.iclass.toString(),
        label: (
          <Link
            to={`/admin/teacher?page=1&iclass=${item.iclass}&tcIsDel=${item.tcIsDel}`}
          >
            {item.classNm}
          </Link>
        ),
      };
    });

  return (
    <>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      {/* 퇴사 안내창 */}
      <ModalTwoBtn
        isOpen={delOpen}
        handleOk={handleDelOk}
        handleCancel={handleCancel}
        title={title}
        subTitle={subTitle}
      />
      <TeacherTop>
        <PageTitle>선생님 관리</PageTitle>
        <TeacherTopRight>
          <Dropdown menu={{ items: classItems }}>
            <Button>
              {iclass === "0"
                ? "전체"
                : iclass === "1"
                ? "무궁화반"
                : iclass === "2"
                ? "해바라기반"
                : iclass === "3"
                ? "장미반"
                : iclass === "4"
                ? "원장"
                : "반 선택"}
              <DownOutlined />
            </Button>
          </Dropdown>
          <Search
            placeholder="이름을 입력하세요."
            style={{
              width: 200,
            }}
            allowClear
            onSearch={value => {
              handleSearch(value);
            }}
          />
          {/* 재직 상태 변경창 */}
          <ModalTwoBtn
            isOpen={changeOpen}
            handleOk={handleDelOk}
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
            >
              <Form.Item name="work">
                <Select placeholder="재직 상태 선택">
                  <Select.Option value="0">재직중</Select.Option>
                  <Select.Option value="1">퇴사</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </ModalTwoBtn>
          <OrangeBtn
            onClick={() => {
              handleChangeClick();
            }}
          >
            재직상태변경
          </OrangeBtn>
          <BlueBtn onClick={e => navigate("/admin/teacher/create")}>
            선생님 등록
          </BlueBtn>
        </TeacherTopRight>
      </TeacherTop>

      <TeacherListComponent
        page={page}
        iclass={iclass}
        tcIsDel={tcIsDel}
        iteacher={iteacher}
        teacherList={teacherList}
        oncheckedClick={oncheckedClick}
        checkedItems={checkedItems}
      />
    </>
  );
};

export default TeacherInfoList;
