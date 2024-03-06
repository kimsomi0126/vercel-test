import { Cookies } from "react-cookie";


const cookie = new Cookies();

// setCookie(이름, 저장값, 기한)
// 로그인
export const setCookie = (name, value, day = 1) => {
  // 기한 생성

  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + day);
  return cookie.set(name, value, { path: "/", expires: expires });
};

// getCookie(쿠키이름)
// 로그인정보 필요시
export const getCookie = name => {
  return cookie.get(name);
};
// removeCookie(쿠키이름, 저장된 경로 기본값)
// 로그아웃

export const removeCookie = (name, path = "/") => {
  cookie.remove(name, { path });
};
