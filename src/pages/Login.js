import React, { useEffect, useState } from "react";
import { LoginBt, LoginInput, LoginLogo, LoginWrap } from "../styles/login";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getUser, postSignin, postUser } from "../api/user_api";
import { WarningBox, WarningWrap } from "../styles/ui/warning";
import { BlueBtn, BtnWrap, RedBtn } from "../styles/ui/buttons";
import WarningAlert from "../components/ui/WarningAlert";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const loginCheck = () => {
    const loginUser = getUser();
    if (loginUser) {
      document.getElementById("warning-wrap").style.left = "0";
    }
  };
  const handleClickClose = e => {
    document.getElementById("warning-wrap").style.left = "-300%";
    navigate("/");
    return;
  };
  const handleClickCheck = e => {
    document.getElementById("warning-wrap2").style.left = "-300%";
    document.getElementById("warning-wrap3").style.left = "-300%";
    document.getElementById("warning-wrap4").style.left = "-300%";
  };
  const handleChangeId = e => {
    setId(e.target.value);
  };
  const handleChangePw = e => {
    setPw(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const obj = {
      uid: id,
      upw: pw,
    };
    const resultAction = result => {
      if (result === -2) {
        document.getElementById("warning-wrap2").style.left = "0%";
        return;
      } else if (result === -1) {
        document.getElementById("warning-wrap3").style.left = "0%";
        return;
      } else if (result === 5555) {
        document.getElementById("warning-wrap4").style.left = "0%";
        return;
      } else {
        postUser(result);
        navigate("/intro");
        return;
      }
    };
    postSignin(obj, resultAction);
  };

  useEffect(() => {
    getUser();
    loginCheck();
  }, []);

  return (
    <>
      <LoginWrap>
        <LoginLogo>
          <img src={process.env.PUBLIC_URL + "/images/login_logo.svg"} />
        </LoginLogo>
        <LoginInput>
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="아이디를 입력해주세요."
              className="inputid"
              required
              value={id || ""}
              onChange={e => {
                handleChangeId(e);
              }}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="off"
              required
              className="inputpw"
              value={pw || ""}
              onChange={e => {
                handleChangePw(e);
              }}
            />
            <Link to="/signup">회원가입하기</Link>
            <LoginBt type="submit">접속하기</LoginBt>
          </form>
        </LoginInput>
      </LoginWrap>
      <WarningWrap id="warning-wrap">
        <WarningAlert handleClickClose={handleClickClose}>
          <h5>페이지를 이용할 수 없습니다.</h5>
          <p>
            이미 로그인 되어있습니다. <br /> 로그아웃 후 다시 시도해주세요.
          </p>
        </WarningAlert>
      </WarningWrap>
      <WarningWrap id="warning-wrap2">
        <WarningAlert handleClickClose={handleClickCheck}>
          <h5>로그인 실패</h5>
          <p>아이디 또는 비밀번호를 확인해주세요.</p>
        </WarningAlert>
      </WarningWrap>
      <WarningWrap id="warning-wrap3">
        <WarningAlert handleClickClose={handleClickCheck}>
          <h5>로그인 실패</h5>
          <p>비밀번호를 확인해주세요.</p>
        </WarningAlert>
      </WarningWrap>
      <WarningWrap id="warning-wrap4">
        <WarningAlert handleClickClose={handleClickCheck}>
          <h5>로그인 실패</h5>
          <p>로그인에 실패했습니다. 다시 시도해주세요.</p>
        </WarningAlert>
      </WarningWrap>
    </>
  );
};

export default Login;
