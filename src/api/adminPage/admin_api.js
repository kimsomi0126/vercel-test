import axios from "axios";
import { SERVER_URL } from "../config";
import jwtAxios from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/teacher`;
const host = `${SERVER_URL}/api/kid`;

// 학부모 관리 페이지
// 학부모 관리 리스트 GET
export const getAdminParentList = async ({
  successFn,
  failFn,
  errorFn,
  page,
  iclass,
  search,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}/parent?page=${page}&iclass=${iclass}&search=${search}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log("res.data임 : ", res.data);
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
    console.log(error);
  }
};

// 학부모 정보 수정 전 가져오기 GET
export const getAdminParentInfo = async ({
  successFn,
  failFn,
  errorFn,
  iparent,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/parentedit?iparent=${iparent}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
      return res.data;
    } else {
      failFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn("서버가 불안정합니다.다시 시도해주세요.");
  }
};

// 학부모 정보 수정 PUT
export const putAdminParentInfo = async ({
  obj,
  successEditFn,
  failEditFn,
  errorEditFn,
}) => {
  try {
    const res = await jwtAxios.put(`${path}/parentedit`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successEditFn(res.data);
      return res.data;
    } else {
      failEditFn(res.data);
    }
  } catch (error) {
    errorEditFn("수정에 실패했습니다. 다시 시도해주세요.");
  }
};

// 학부모 정보 삭제 PUT
export const deleteParentList = async ({ successFn, failFn, errorFn, obj }) => {
  try {
    const res = await jwtAxios.put(`${path}/parent`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    errorFn("서버가 불안정합니다.다시 시도해주세요.");
    // console.log(error);
  }
};

// 원생 관리 페이지
// 원생 관리 리스트 GET
export const getAdminStudentList = async ({
  successFn,
  failFn,
  errorFn,
  page,
  kidCheck,
  search,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}/kid?page=${page}&kidCheck=${kidCheck}&search=${search}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    errorFn("서버가 불안정합니다.다시 시도해주세요.");
  }
};

// 원생 승급 PATCH
export const patchClass = async ({
  successpatchFn,
  failpatchFn,
  errorpatchFn,
  obj,
}) => {
  try {
    const res = await jwtAxios.patch(`${path}/stateorclass`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successpatchFn(res.data);
      return res.data;
    } else {
      failpatchFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorpatchFn(res.message);
  }
};

// 원생 등록 POST
export const postStudentCreate = async ({
  successFn,
  failFn,
  errorFn,
  student,
}) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post(`${host}`, student, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 원생 등록 수정 PUT
export const putStudentCreate = async ({
  successFn,
  failFn,
  errorFn,
  student,
}) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${host}`, student, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 원생기본정보 GET
export const getStudentInfo = async ({
  successGetFn,
  failGetFn,
  errorGetFn,
  ikid,
}) => {
  try {
    const res = await jwtAxios.get(`${host}/edit/${ikid}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successGetFn(res.data);
      return res.data;
    } else {
      failGetFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorGetFn("서버가 불안정합니다.다시 시도해주세요.");
  }
};

// 원생 상세 정보 & 원생 상세 정보 등록 페이지
// 원생 상세 정보 POST
export const postStudentDetail = async ({
  successAddFn,
  failAddFn,
  errorAddFn,
  allDetailData,
}) => {
  try {
    const res = await jwtAxios.post(`${host}/detail`, allDetailData);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successAddFn(res.data);
    } else {
      failAddFn();
    }
  } catch (error) {
    errorAddFn();
  }
};

// 원생 상세정보 GET
export const getDetailInfo = async ({
  successFn,
  failFn,
  errorFn,
  ikid,
  year,
}) => {
  try {
    const res = await jwtAxios.get(`${host}/detail/edit/${ikid}?year=${year}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
      // console.log(res.data);
      return res.data;
    } else {
      failFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn("서버가 불안정합니다.다시 시도해주세요.");
  }
};

// 원생 상세정보 수정 PUT
export const putDetailEdit = async ({
  successEditFn,
  failEditFn,
  errorEditFn,
  allDetailData,
}) => {
  try {
    const res = await jwtAxios.put(`${host}/detail`, allDetailData);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successEditFn(res.data);
      return res.data;
    } else {
      failEditFn(res.data);
    }
  } catch (error) {
    errorEditFn("수정에 실패했습니다. 다시 시도해주세요.");
  }
};

// 학부모 연결 삭제
export const deleteAccount = async ({
  successDeleteFn,
  failDeleteFn,
  errorDeleteFn,
  iparent,
  ikid,
}) => {
  try {
    const res = await jwtAxios.delete(
      `${path}/disconnect?iparent=${iparent}&ikid=${ikid}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successDeleteFn(res.data);
      return res.data;
    } else {
      failDeleteFn(res.data);
    }
  } catch (error) {
    errorDeleteFn("삭제에 실패했습니다. 다시 시도해주세요.");
  }
};

// 원생 식별코드 수정
export const patchCode = async ({
  successpatchFn,
  failpatchFn,
  errorpatchFn,
  ikid,
}) => {
  try {
    const res = await jwtAxios.patch(`${host}/code/${ikid}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successpatchFn(res.data);
      return res.data;
    } else {
      failpatchFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorpatchFn(res.message);
  }
};

// 선생님 관리 페이지
// 선생님 관리 리스트 GET
export const getTeacherList = async ({
  successFn,
  failFn,
  errorFn,
  page,
  iclass,
  tcIsDel,
  search,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}?page=${page}&iclass=${iclass}&tcIsDel=${tcIsDel}&search=${search}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("res.data임 : ", res.data);
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
    // console.log(error);
  }
};

// 선생님 등록 POST
export const postTeacherCreate = async ({
  successFn,
  failFn,
  errorFn,
  teacher,
}) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.post(`${path}/signup`, teacher, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 선생님 퇴사 PATCH
export const patchTeacher = async ({
  successpatchFn,
  failpatchFn,
  errorpatchFn,
  obj,
}) => {
  try {
    const res = await jwtAxios.patch(`${path}`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successpatchFn(res.data);
      return res.data;
    } else {
      failpatchFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorpatchFn(res.message);
  }
};

// 선생님 정보 수정 전 불러오기 GET
export const getTeacherInfo = async ({
  successGetFn,
  failGetFn,
  errorGetFn,
  iteacher,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/edit?iteacher=${iteacher}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successGetFn(res.data);
      return res.data;
    } else {
      failGetFn("서버가 불안정합니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorGetFn("서버가 불안정합니다.다시 시도해주세요.");
  }
};
// 선생님 정보 수정 PUT
export const putTeacherInfo = async ({
  successFn,
  failFn,
  errorFn,
  teacher,
}) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${path}`, teacher, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};
