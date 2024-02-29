import { getFirebaseToken, onMessageListener } from "../../fb/fbconfig";
import jwtAxios from "../../util/jwtUtil";
import { SERVER_URL } from "../config";

const parentFbPath = `${SERVER_URL}/api/parent/firebase-token`;
const teacherFbPath = `${SERVER_URL}/api/teacher/firebase-token`;

export const patchTeacherFbToken = async ({ params, successFn }) => {
  try {
    const res = await jwtAxios.patch(`${teacherFbPath}`, params);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res);
    }
  } catch (error) {
    console.log(error);
  }
};
export const patchParentFbToken = async ({ params, successFn }) => {
  try {
    const res = await jwtAxios.patch(`${parentFbPath}`, params);
    const status = res.status.toString();
    if (status.charAt(0) === "2") {
      successFn(res);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFbToken = async successFn => {
  try {
    const firebaseToken = await getFirebaseToken();
    successFn(firebaseToken);
  } catch (error) {
    console.log(error);
  }
};
