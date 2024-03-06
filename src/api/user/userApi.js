import axios from "axios";
import { SERVER_URL } from "../config";
import jwtAxios from "../../util/jwtUtil";
const path = `${SERVER_URL}/api`;

// 부모님 로그인
export const postParentLogin = async ({
  loginParam,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    // 만약에 API 서버가 JSON 을 원한다면
    const header = { headers: { "Content-Type": "application/json" } };

    const formData = new FormData();
    // formData.append("이름", "값")
    formData.append("uid", loginParam.uid);
    formData.append("upw", loginParam.upw);

    const res = await axios.post(`${path}/parent/signin`, formData, header);

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

// 선생님 로그인
export const postTeacherLogin = async ({
  loginParam,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    // 만약에 API 서버가 JSON 을 원한다면
    const header = { headers: { "Content-Type": "application/json" } };

    const formData = new FormData();
    // formData.append("이름", "값")
    formData.append("teacherUid", loginParam.uid);
    formData.append("teacherUpw", loginParam.upw);

    const res = await axios.post(`${path}/teacher/signin`, formData, header);

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

// 부모님 회원가입 - 식별코드체크
export const getCheckCode = async ({ code, successFn, failFn, errorFn }) => {
  try {
    const res = await axios(`${path}/parent/check?code=${code}`);
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

// 부모님 회원가입 - 아이디 중복체크
export const getCheckId = async ({ uid, successIdFn, failIdFn, errorIdFn }) => {
  try {
    const res = await axios(`${path}/parent/signup?uid=${uid}`);
    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      successIdFn(res.data);
    } else {
      failIdFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorIdFn(res.message);
  }
};
// 부모님 회원가입 - 회원가입 정보
export const postParentSigup = async ({ obj, successFn, failFn, errorFn }) => {
  try {
    const res = await axios.post(`${path}/parent/signup`, obj);

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

// 부모님 - 원생 마이페이지
export const getMypage = async ({ year, ikid, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/kid/${year}/${ikid}`);
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

// 부모님 - 아이 추가
export const postKidCode = async ({
  code,
  successAddFn,
  failAddFn,
  errorAddFn,
}) => {
  try {
    const res = await jwtAxios.post(`${path}/parent/kidadd`, code);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successAddFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failAddFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorAddFn(res.message);
  }
};

// 부모님 - 정보가져오기
export const getParentInfo = async ({ successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/parent/edit`);
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

// 부모님 - 정보수정하기
export const putParentInfo = async ({
  obj,
  successEditFn,
  failEditFn,
  errorEditFn,
}) => {
  try {
    const res = await jwtAxios.put(`${path}/parent/putparent`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successEditFn(res.data);
      // RTK 업데이트 처리를 위해 값 전달
      return res.data;
    } else {
      failEditFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorEditFn(res.message);
  }
};

// 부모님 - 회원탈퇴하기
export const patchParent = async ({ successDelFn, failDelFn, errorDelFn }) => {
  try {
    const res = await jwtAxios.patch(`${path}/parent`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successDelFn(res.data);
      return res.data;
    } else {
      failDelFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorDelFn(res.message);
  }
};
