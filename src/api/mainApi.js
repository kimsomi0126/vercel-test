import axios from "axios";
import { SERVER_URL } from "./config";
import jwtAxios from "../util/jwtUtil";
const path = `${SERVER_URL}/api`;

// 메인 최신글
export const getMain = async ({ successFn, failFn, errorFn }) => {
  try {
    const res = await axios.get(`${path}/main?page=1`);
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
