import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  loginPostAsync,
  logout,
  postParentLoginAsync,
} from "../slices/loginSlice";
import { getCookie, setCookie } from "../util/cookieUtil";
import { refreshJWT } from "../util/jwtUtil";

const useCustomLogin = () => {
  // 패스 이동하기
  const navigate = useNavigate();

  // RTK 상태값 업데이트
  const dispatch = useDispatch();

  // RTK 상태값 읽기
  const loginState = useSelector(state => state.loginSlice);

  // 로그인 상태값 파악
  const isLogin = loginState.teacherUid ? true : false;
  const isAdminLogin = loginState.ilevel === 3 ? true : false;
  const isTeacherLogin = loginState.ilevel === 2 ? true : false;
  const isName = loginState.teacherNm ? true : false;
  const isParentLogin = loginState.iparent ? true : false;

  // 로그인 기능
  const doLogin = ({ loginParam, successFn, failFn, errorFn }) => {
    // 로그인 어느화면에서 실행이 될 소지가 높아요.
    // 로그인 상태 업데이트
    const action = dispatch(
      loginPostAsync({ loginParam, successFn, failFn, errorFn }),
    );
    // 결과값
    return action.payload;
  };

  // 학부모 로그인 기능
  const doParentLogin = ({ loginParam, successFn, failFn, errorFn }) => {
    // 로그인 어느화면에서 실행이 될 소지가 높아요.
    // 로그인 상태 업데이트
    const action = dispatch(
      postParentLoginAsync({ loginParam, successFn, failFn, errorFn }),
    );
    // 결과값
    return action.payload;
  };

  // 로그아웃 기능
  const doLogout = () => {
    dispatch(logout());
  };

  // 패스이동 기능
  const moveToPath = path => {
    // 패스로 이동 후에 replace:ture 를 적용시 뒤로 가기 화면
    // 이전 페이지 기록을 남기지 않는다.
    navigate({ pathname: path }, { replace: true });
  };

  // 로그인 페이지로 이동
  const moveToLogin = () => {
    // console.log("페이지 이동");
    return <Navigate replace to="/login" />;
  };

  // 액세스 토큰 리프레시 및 업데이트
  const refreshAccessToken = async () => {
    const memberInfo = getCookie("member");
    const { accessToken, refreshToken } = memberInfo;

    try {
      const newTokens = await refreshJWT(accessToken, refreshToken);
      // 새로운 액세스 토큰으로 기존 쿠키의 accessToken 값만 업데이트
      memberInfo.accessToken = newTokens.accessToken;

      setCookie("member", newTokens, 1);
      return newTokens;
    } catch (error) {
      // 리프레시 실패 처리
      console.error("토큰 리프레시 실패:", error);
      throw error; // 실패한 경우 예외를 다시 던져서 호출자가 처리할 수 있도록 함
    }
  };

  // 파이어베이스 토큰 리프레시 및 업데이트
  const refreshFbToken = async () => {
    const memberInfo = getCookie("member");
    const { firebaseToken, refreshFbToken } = memberInfo;

    try {
      const newTokens = await refreshJWT(firebaseToken, refreshFbToken);
      // 새로운 액세스 토큰으로 기존 쿠키의 accessToken 값만 업데이트
      memberInfo.firebaseToken = newTokens.firebaseToken;
      setCookie("member", memberInfo, 1);
      return newTokens.firebaseToken;
    } catch (error) {
      // 리프레시 실패 처리
      console.error("토큰 리프레시 실패:", error);
      throw error; // 실패한 경우 예외를 다시 던져서 호출자가 처리할 수 있도록 함
    }
  };

  return {
    loginState,
    isLogin,
    isAdminLogin,
    isName,
    isParentLogin,
    isTeacherLogin,
    doLogin,
    doLogout,
    doParentLogin,
    moveToPath,
    moveToLogin,
    refreshAccessToken,
    refreshFbToken,
  };
};

export default useCustomLogin;
