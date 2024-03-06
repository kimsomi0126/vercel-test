import jwtAxios from "../../util/jwtUtil";
import { SERVER_URL } from "../config";
const path = `${SERVER_URL}/api/memory`;

// 추억 앨범 교사 전체 조회
export const getIndAlbumList = async ({
  page,
  iclass,
  year,
  search,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}?page=${page}&iclass=${iclass}&year=${year}&search=${search}`,
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

// 추억 앨범 학부모 전체 조회
export const getIndAlbumParentList = async ({
  page,
  iclass,
  ikid,
  year,
  search,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(
      `${path}?page=${page}&iclass=${iclass}&ikid=${ikid}&year=${year}&search=${search}`,
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

// 추억 앨범 수정 하기.
// {
//   "pics": [
//     "string"
//   ],
//   "dto": {
//     "delPics": [
//       0
//     ],
//     "imemory": 0,
//     "memoryTitle": "string",
//     "memoryContents": "string",
//     "ikids": [
//       0
//     ]
//   }
// }
export const putIndAlbum = async ({ product, successFn, failFn, errorFn }) => {
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

// 추억 앨범 등록하기
// {
//   "pics": [
//     "string"
//   ],
//   "dto": {
//     "ikids": [
//       0
//     ],
//     "memoryTitle": "string",
//     "memoryContents": "string"
//   }
// }
export const postIndAlbum = async ({ product, successFn, failFn, errorFn }) => {
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
    console.log("res", res);
    if (res.code === "PUSH_FAIL") {
      errorFn("푸쉬알림에 비동의 상태입니다.");
    } else {
      errorFn(res.message);
    }
  }
};

// 추억 앨범 글 삭제
export const deleteIndAlbum = async ({
  tno,
  successDelFn,
  failFn,
  errorDelFn,
}) => {
  try {
    const res = await jwtAxios.delete(`${path}?imemory=${tno}`);

    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successDelFn(res.data);
    } else {
      failFn("삭제 호출 오류입니다.");
    }
  } catch (error) {
    errorDelFn(
      "삭제에 실패하였습니다. 서버가 불안정하니 잠시 후 다시 시도해주세요.",
    );
  }
};

// 추억 앨범 댓글 등록하기
export const postIndAlbumComment = async ({
  imemory,
  memoryComment,
  iteacher,
  iparent,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.post(
      `${path}/comment/imemory=${imemory}&memoryComment=${memoryComment}&iteacher=${iteacher}&iparent=${iparent}`,
    );
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

// 알림장 앨범 댓글 삭제하기
export const deleteIndAlbumComment = async ({
  imemoryComment,
  iteacher,
  iparent,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    // header 가 필요합니다.
    const res = await jwtAxios.delete(
      `${path}/comment/?$imemoryComment=${imemoryComment}&iteacher=${iteacher}iparent=${iparent}`,
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

// 추억 앨범 원아 태그 리스트
export const getIndAlubmTagList = async ({
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
    const res = await jwtAxios.get(`${path}/tag`);
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

// 추억 앨범 수정 전 정보 불러오기
export const getIndchildrenList = async ({
  imemory,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/edit?imemory=${imemory}`);
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

// 추억 앨범 상세 조회
export const getIndAlbumDetail = async ({
  tno,
  successFn,
  failFn,
  errorFn,
}) => {
  try {
    const res = await jwtAxios.get(`${path}/detail?imemory=${tno}`);
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

// 검색 GET
// listall?page=1&search=1
// export const getIndSearchListAll = async ({
//   page,
//   search,
//   successFn,
//   failFn,
//   errorFn,
// }) => {
//   try {
//     const res = await jwtAxios.get(
//       `${path}/listall?page=${page}&search=${search}`,
//     );
//     const status = res.status.toString();
//     if (status.charAt(0) === "2") {
//       // console.log("res.data임 : ", res.data);
//       successFn(res.data);
//     } else {
//       failFn("자료 호출 에러입니다.");
//     }
//   } catch (error) {
//     errorFn(error);
//     // console.log(error);
//   }
// };
