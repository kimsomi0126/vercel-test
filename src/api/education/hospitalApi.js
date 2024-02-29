import axios from "axios";
import { SERVER_URL } from "../config";
const path = `${SERVER_URL}/api/open`;

// 병원정보 가져오기
export const getHospital = async ({
  page,
  size,
  sigunNm,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await axios.get(
      `${path}/hospital?page=${page}&size=${size}&sigunNm=${sigunNm}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 야간진료 병원정보 가져오기
export const getNightHospital = async ({
  page,
  size,
  sigunNm,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await axios.get(
      `${path}/nighthospital?page=${page}&size=${size}&sigunNm=${sigunNm}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};
