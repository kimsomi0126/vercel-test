import React, { useEffect, useState } from "react";
import { ContentInner } from "../../styles/basic";
import LoginComponent from "../../components/user/login/LoginComponent";
import { ModifyModal } from "../../components/common/ResultModal";
import { Modal } from "antd";
import ModalTwoBtn from "../../components/ui/ModalTwoBtn";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router";

// const LazyIdentNum = lazy(() => import("./pages/user/IdentNum"));
// const LazyGuardianSignup = lazy(() => import("./pages/user/GuardianSignup"));
// const LazyMyPage = lazy(() => import("./pages/user/MyPage"));
// 교직원 가입 페이지 예정
// const LazyStaffSignup = lazy(() => import("./pages/user/StaffSignup"));

const Login = () => {
  const navigate = useNavigate();
  // 안내창 state
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 로그인 체크
  const { isLogin, isParentLogin } = useCustomLogin();

  const handleOk = () => {
    setIsOpen(false);
    // 뒤로가기
    navigate(-1);
  };

  useEffect(() => {
    if (isLogin || isParentLogin) {
      setTitle("이미 로그인 되어있습니다.");
      setSubTitle(
        "이미 로그인 되어 이용할 수 없습니다. \n 로그아웃 후 이용해주세요.",
      );
      setIsOpen(true);
      return;
    }
  }, []);
  return (
    <ContentInner>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <LoginComponent />
    </ContentInner>
  );
};

export default Login;
