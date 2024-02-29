import axios from "axios";
import { SERVER_URL } from "../config";
import jwtAxios from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/preschool`;

// 선생님 소개
export const getTeacher = async ({ successFn, failFn, errorFn }) => {
  try {
    const res = await axios.get(`${path}/teacher`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

export const getKid = async ({ successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/kid`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};
