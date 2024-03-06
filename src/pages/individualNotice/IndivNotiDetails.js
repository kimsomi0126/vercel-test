import React from "react";
import { useParams } from "react-router";
import useCustomLogin from "../../hooks/useCustomLogin";
import IndivDetailsComponent from "../../components/individualNotice/IndivDetailsComponent";

const IndivNotiDetails = () => {
  let { tno } = useParams();
  const { isLogin, loginState } = useCustomLogin(); // 로그인 상태를 가져옵니다.

  // 로그인 상태에서 iteacher 값을 확인합니다.
  return (
    <IndivDetailsComponent
      tno={tno}
      isLogin={isLogin}
      loginState={loginState}
    />
  );
};
export default IndivNotiDetails;
