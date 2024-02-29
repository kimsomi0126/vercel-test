import axios from "axios";
import { SERVER_URL } from "./config";
const path = `${SERVER_URL}/api/media`;

// 메인페이지 가져오기
export const getMediaAll = async (ym, iuser, getMainInfo) => {
  try {
    const res = await axios.get(`${path}/ym?ym=${ym}&iuser=${iuser}`);
    getMainInfo(res.data);
    // console.log("res.data : ", res.data);
  } catch (error) {
    console.log(error);
    // window.location.href = "/";
  }
};

// 날짜별 미디어 리스트 가져오기
export const getDayMedia = async (iuser, findFullDate, setListMedia) => {
  try {
    const res = await axios.get(
      `${path}/day?iuser=${iuser}&date=${findFullDate}`,
    );
    setListMedia(res.data);
    // console.log("listMedia res.data : ", res.data);
  } catch (error) {
    // console.log("setTodayDate :", error);
    window.location.href = "/";
  }
};

// 마이로그(볼 거예요 / 봤어요) 가져오기
export const getMedia = async (setLogList, iuser, is_saw, resultAction) => {
  try {
    const res = await axios.get(`${path}?is_saw=${is_saw}&iuser=${iuser}`);
    setLogList(res.data);
    // console.log(res.data);
  } catch (error) {
    // const demo = await axios.get(`/getloglist.json`);
    // setLogList(demo.data);
    resultAction(5555);
  }
};

// 로그 뷰(상세) 가져오기
export const getDetailMedia = async (
  imedia,
  iuser,
  setViewData,
  resultAction,
) => {
  try {
    const res = await axios.get(`${path}/${imedia}?iuser=${iuser}`);
    setViewData(res.data);
  } catch (error) {
    resultAction(5555);
  }
};

// 로그 등록
export const postMedia = async (obj, resultAction) => {
  try {
    const res = await axios.post(`${path}`, obj);
    resultAction(res.data.result);
  } catch (error) {
    resultAction(5555);
  }
};

// 수정
export const putMedia = async (obj, resultAction) => {
  try {
    const res = await axios.put(`${path}`, obj);
    // const res = await axios.get(`/getview.json`, obj);
    resultAction(res.data.result);
  } catch (error) {
    resultAction(5555);
  }
};

// 삭제
export const delMedia = async (imedia, iuser, resultAction) => {
  try {
    // http://192.168.0.144:5211/api/media?iuser=0&imedia=0
    const res = await axios.delete(`${path}?iuser=${iuser}&imedia=${imedia}`);
    resultAction(res.data.result);
  } catch (error) {
    resultAction(5555);
  }
};
