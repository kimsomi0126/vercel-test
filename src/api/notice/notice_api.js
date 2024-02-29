import jwtAxios from "../../util/jwtUtil";
import { SERVER_URL } from "../config";

const path = `${SERVER_URL}/api/full`;

// 유치원소식 불러오기
export const getDetail = async ({ tno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}?iFullNotice=${tno}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("res.data", res.data);
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};

// 유치원소식 리스트 불러오기
export const getList = async ({ page, search, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(
      `${path}/listall?page=${page}&search=${search}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    const res = error.response.data;
    errorFn(res.message);
  }
};

// 유치원소식 게시글 등록하기
export const postNotice = async ({ product, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.post(`${path}`, product);
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

// 유치원소식 게시글 삭제하기
export const deleteNotice = async ({ tno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.delete(`${path}?iteacher=1&ifullNotice=${tno}`);
    const status = res.status.toString();

    if (status.charAt(0) === "2") {
      successFn();
    } else {
      failFn("삭제 에러입니다.");
    }
  } catch (error) {
    errorFn(error);
  }
};

// 유치원소식 게시글 수정하기
export const putNotice = async ({ data, successFn, failFn, errorFn }) => {
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

// 유치원소식 게시글 수정시 정보 조회하기
export const editNotice = async ({ tno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/edit?ifullNotice=${tno}`);
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
