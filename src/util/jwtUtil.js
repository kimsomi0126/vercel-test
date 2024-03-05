import axios from "axios";

import { getCookie, setCookie } from "./cookieUtil";
import { SERVER_URL } from "../api/config";

// intercepter 전용 axios 생성
// 로그인 제외 및 일반적 api 요청등을 제외
// 인증이 필요한 경우에 활용하는 용도
const jwtAxios = axios.create();

// 요청(request) intercepter
// request 가 문제가 있든, 없든 실행될 내용 작성
const beforeReq = config => {
  const memberInfo = getCookie("member");

  if (!memberInfo) {
    // axios 요청을 중단합니다.
    return Promise.reject({ response: { data: { error: "Login 하세요." } } });
  }

  const { accessToken } = memberInfo;
  // 요청한 Request 에 headers 에 형식이 있어요.
  // jwt 액세스토큰을 붙일때 형식이 있어요.
  // config 는 요청한 axios 이고
  // 이곳에서는  요청한 axios 의 전처리를 합니다.
  // 이때 추가내용을 headers에 추가합니다.
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

// fail Request 요청보내서 실패했을 때
const requestFail = err => {
  return Promise.reject(err);
};

// Refresh Token
// 액세스 요청 실패시 무조건 시도해 봄
export const refreshJWT = async (accessToken, refreshToken) => {
  const host = SERVER_URL;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const memberInfo = getCookie("member");
  const isLogin = memberInfo.teacherUid ? true : false;
  console.log(isLogin);
  // API 백엔드 Refresh 해줄 주소(URI)를 요청
  const url = isLogin
    ? `${host}/api/teacher/refresh-token`
    : `${host}/api/parent/refresh-token`;
  const res = await axios.get(url, header);

  // 새로 만든 AccessToken 과 RefereshToken 리턴
  return res.data;
};

// 응답(Response) 처리 코드
// Response 전처리
const beforeRes = async res => {
  const data = res.data;
  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberInfo = getCookie("member");
    const result = await refreshJWT(
      memberInfo.accessToken,
      memberInfo.refreshToken,
    );
    (memberInfo.accessToken = result.accessToken),
      (memberInfo.refreshToken = result.refreshToken),
      setCookie("member", JSON.stringify(memberInfo));

    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }

  return res;
};
// Response Fail 처리
const responseFail = err => {
  return Promise.reject(err);
};

// axios 인터셉터 적용
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
