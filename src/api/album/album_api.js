import axios from "axios";
import { SERVER_URL } from "../config";
import jwtAxios from "../../util/jwtUtil";
const path = `${SERVER_URL}/api/album`;

// ialbum = 세부 글 넘버.
// page = 전체리스트
// ialbumComment = 세부 댓글 넘버

// 활동앨범 상세조회 get
export const getAlbum = async ({ pno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}?ialbum=${pno}`);
    // console.log("res", res);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log("res.data임 : ", res.data);
      successFn({ ...res.data });
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    const demo = await axios.get(`/`);
    errorFn(demo.data);
    // console.log(error);
  }
};

// album/listall?page=1
// 활동 앨범 전체 조회 get
export const getListAll = async ({ page, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/listall?page=${page}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log("res.data : ", res.data);
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    const demo = await axios.get(`/`);
    errorFn(demo.data);
    // console.log(error);
  }
};

// 검색 GET
// listall?page=1&search=1
export const getSearchListAll = async ({
  page,
  search,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}/listall?page=${page}&search=${search}`,
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
    // console.log(error);
  }
};

// edit?ialbum=1
// 수정할 앨범 선택시 세부 정보 조회 get
export const getEditAlbum = async ({ pno, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.get(`${path}/edit?ialbum=${pno}`);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // console.log("res.data : ", res.data);
      successFn(res.data);
    } else {
      failFn("자료 호출 에러입니다.");
    }
  } catch (error) {
    const demo = await axios.get(`/`);
    errorFn(demo.data);
    // console.log(error);
  }
};

// 수정한 앨범 put 하기.
export const putAlbum = async ({ product, successFn, failFn, errorFn }) => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await jwtAxios.put(`${path}`, product, header);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      console.log("res.data : ", res.data);
      successFn(res.data);
      return res.data;
    } else {
      failFn("수정에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn(console.log(error));
    // errorFn(
    //   "정보수정에 실패하였습니다. 서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
    // );
  }
};

// 앨범 등록 POST
// path
// 글, 사진 등록(비동기 통신)(커뮤니티 등록)
export const postAlbum = async ({ product, successFn, failFn, errorFn }) => {
  try {
    // console.log("Add 컴포넌트에서 글 작성한거", product);
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await jwtAxios.post(`${path}`, product, header);
    const status = response.status.toString();
    if (status.charAt(0) === "2") {
      successFn(response.data);
    } else {
      failFn("글 등록 오류", response.statusText);
    }
  } catch (error) {
    // console.log("글 등록 서버오류", error.response.data);
    errorFn("글 등록 서버오류", error.response.data);
  }
};

// 앨범 글 삭제 Delete
// ?ialbum=1
export const deleteAlbum = async ({ ialbum, successFn, failFn, errorFn }) => {
  try {
    // 여기서도 이미지가 추가될 수 있어요.
    // header 가 필요합니다.
    const res = await jwtAxios.delete(`${path}?ialbum=${ialbum}`);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res.data);
    } else {
      failFn("삭제 호출 오류입니다.");
    }
  } catch (error) {
    errorFn(
      "삭제에 실패하였습니다. 서버가 불안정하니 잠시 후 다시 시도해주세요.",
    );
  }
};

// 앨범 댓글 등록 POST
// path /comment
export const postAlbumComment = async ({ obj, successFn, failFn, errorFn }) => {
  try {
    const res = await jwtAxios.post(`${path}/comment`, obj);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
    } else {
      failFn("댓글 등록에 실패하였습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    errorFn(error);
  }
};

// 앨범 댓글 삭제 Delete
// comment?ialbumComment=0&ialbum=0&iteacher=0&iparent=0
export const deleteAlbumComment = async ({
  ialbumComment,
  ialbum,
  iteacher,
  iparent,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    // &iteacher=${iteacher}&iparent=${iparent}
    const iwriter = () => {
      if (iteacher) {
        return `&iteacher=${iteacher}`;
      }
      if (iparent) {
        return `&iparent=${iparent}`;
      }
    };
    const res = await jwtAxios.delete(
      `${path}/comment?ialbumComment=${ialbumComment}&ialbum=${ialbum}${iwriter()}`,
    );
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      // 화면처리용
      successFn(res.data);
    } else {
      failFn(res.data);
    }
  } catch (error) {
    errorFn(error);
  }
};
