import jwtAxios from "../../util/jwtUtil";
import { SERVER_URL } from "../config";
const path = `${SERVER_URL}/api/notice`;

// 알림장 리스트(학부모)
export const getIndParentList = async ({
  page,
  year,
  ikid,
  fromTo,
  search,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}?page=${page}&ikid=${ikid}&year=${year}&fromTo=${fromTo}&search=${search}`,
    );
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
// 알림장 리스트(선생님)
export const getIndTeacherList = async ({
  page,
  year,
  iclass,
  fromTo,
  search,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}?page=${page}&iclass=${iclass}&year=${year}&fromTo=${fromTo}&search=${search}`,
    );
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

// 알림장 리스트(원아)
export const getIndchildrenList = async ({
  product,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/tag`, product);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("글 등록 오류");
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 알림장 게시글 등록하기(선생님)
export const postIndNotice = async ({
  product,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.post(`${path}/tea`, product);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("글 등록 오류");
    }
  } catch (error) {
    const res = error.response.data;
    console.log("res", res);
    if (res.code === "PUSH_FAIL") {
      errorFn("푸쉬알림에 비동의 상태입니다.");
    } else {
      errorFn(res.message);
    }
  }
};

// 알림장 게시글 등록하기(학부모)
export const postIndParentNotice = async ({
  product,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.post(`${path}/par`, product);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("글 등록 오류");
    }
  } catch (error) {
    const res = error.response.data;
    console.log("res", res);
    if (res.code === "PUSH_FAIL") {
      errorFn("푸쉬알림에 비동의 상태입니다.");
    } else {
      errorFn(res.message);
    }
  }
};

// 댓글 등록하기
export const postIndComment = async ({ obj, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.post(`${path}/comment`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("댓글 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 댓글 삭제하기
export const deleteIndComment = async ({
  inoticeComment,
  iteacher,
  iparent,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const iwriter = () => {
      if (iteacher) {
        return `&iteacher=${iteacher}`;
      }
      if (iparent) {
        return `&iparent=${iparent}`;
      }
    };
    const res = await jwtAxios.delete(
      `${path}/comment?inoticeComment=${inoticeComment}${iwriter()}`,
    );

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn();
    }
  } catch (error) {
    errorFn(error);
  }
};

// 알림장 게시글 삭제하기
export const deleteIndDetail = async ({
  tno,
  successDelFn,
  failDelFn,
  errorDelFn,
}) => {
  try {
    const res = await jwtAxios.delete(`${path}?inotice=${tno}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successDelFn(res.data);
    } else {
      failDelFn(res.data);
    }
  } catch (error) {
    const res = error.response.data;
    errorDelFn(res.message);
  }
};

// 알림장 상세
export const getIndDetail = async ({ tno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/detail?inotice=${tno}`);
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

// 알림장 게시글 수정하기
export const putIndDetail = async ({ data, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${path}`, data, header);

    const status = res.status.toString();
    console.log("res.data", res.data);
    if (status.charAt(0) === "2") {
      successFn(res.data);
      return res.data;
    } else {
      failFn("수정 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};

// 알림장 게시글 수정시 정보 조회하기
export const editIndNotice = async ({
  tno,
  ikid,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/edit?inotice=${tno}&ikid=${ikid}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
      return res.data;
    } else {
      failFn("수정 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};
