import axios from "axios";
import { SERVER_URL } from "./config";
const path = `${SERVER_URL}/api/user`;

// 회원가입
export const postSignup = async (obj, resultAction) => {
  try {
    const res = await axios.post(`${path}/signup`, obj);
    resultAction(res.data);
  } catch (error) {
    resultAction(5555);
  }
};

// 로그인
export const postSignin = async (obj, resultAction) => {
  try {
    const res = await axios.post(`${path}/signin`, obj);
    resultAction(res.data.result);
  } catch (error) {
    resultAction(5555);
  }
};

// 로컬스토리지에 login 값 저장
export const postUser = function (result) {
  localStorage.setItem("iuser", result);
  // console.log(result);
};

// 로컬스토리지에 login 값 읽어오기
export const getUser = function () {
  const result = localStorage.getItem("iuser");
  // if (result) {
  //   console.log("로그인중");
  // }
  return result;
};

// 로컬스토리지에 로컬스토리지에 login 값 삭제
export const deleteUser = function (result) {
  localStorage.removeItem("iuser");
};
