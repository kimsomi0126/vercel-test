import React, { useEffect, useState } from "react";
import { LoginBt, LoginInput, LoginLogo, LoginWrap } from "../styles/login";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import { getUser, postSignup } from "../api/user_api";
import { WarningWrap } from "../styles/ui/warning";
import WarningAlert from "../components/ui/WarningAlert";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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
  };
  const handleClickLogin = e => {
    document.getElementById("warning-wrap3").style.left = "-300%";
    navigate("/intro");
    return;
  };
  const handleChangeName = e => {
    setName(e.target.value);
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
      nm: name,
    };
    const resultAction = result => {
      if (result === 0 || result === 5555) {
        document.getElementById("warning-wrap2").style.left = "0%";
      } else {
        document.getElementById("warning-wrap3").style.left = "0%";
      }
    };
    postSignup(obj, resultAction);
  };
  useEffect(() => {
    loginCheck();
  }, []);
  return (
    <>
      <Header sub="signup">Culture Log</Header>
      <LoginWrap>
        <LoginLogo>
          <img src={process.env.PUBLIC_URL + "/images/signup_logo.svg"} />
          <p>회원 정보를 입력해주세요.</p>
        </LoginLogo>
        <LoginInput>
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              className="inputname"
              required
              value={name || ""}
              onChange={e => {
                handleChangeName(e);
              }}
            />
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
              className="inputpw"
              required
              value={pw || ""}
              onChange={e => {
                handleChangePw(e);
              }}
            />
            <LoginBt type="submit">가입하기</LoginBt>
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
          <h5>회원가입 실패</h5>
          <p>회원가입에 실패했습니다. 다시 시도해주세요.</p>
        </WarningAlert>
      </WarningWrap>
      <WarningWrap id="warning-wrap3">
        <WarningAlert handleClickClose={handleClickLogin}>
          <h5>회원가입 성공</h5>
          <p>회원가입에 성공했습니다. 로그인페이지로 이동합니다.</p>
        </WarningAlert>
      </WarningWrap>
    </>
  );
};

export default SignUp;
