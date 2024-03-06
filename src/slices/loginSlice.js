import { createSlice } from "@reduxjs/toolkit";

// API 서버 연동
// reducer (store 상태 변경) 를 호출할때 지금은 API 호출
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";
import { postParentLogin, postTeacherLogin } from "../api/user/userApi";

// export const 외부함수 = createAsyncThunk("이름", 리듀서함수);
export const loginPostAsync = createAsyncThunk(
  "loginPostAsync",
  async ({ loginParam, successFn, failFn, errorFn }) => {
    try {
      const res = await postTeacherLogin({
        loginParam,
        successFn,
        failFn,
        errorFn,
      });
      return res;
    } catch (error) {
      // console.log(error);
    }
  },
);
export const postParentLoginAsync = createAsyncThunk(
  "postParentLoginAsync",
  async ({ loginParam, successFn, failFn, errorFn }) => {
    try {
      const res = await postParentLogin({
        loginParam,
        successFn,
        failFn,
        errorFn,
      });
      return res;
    } catch (error) {
      // console.log(error);
    }
  },
);

const initState = {
  teacherUid: "",
  iparent: "",
};

// 쿠키 정보 읽어와서 initState 변경하기
const loadMemberCookie = () => {
  const memberInfo = getCookie("member");
  return memberInfo;
};
const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,

  // store 의 state 를 업데이트 하는 함수 모음
  reducers: {
    login: (state, action) => {
      // console.log("login.....");
      return {
        teacherUid: action.payload.teacherUid,
        iparent: action.payload.iparent,
      };
    },
    // 로그아웃
    logout: (state, action) => {
      // console.log("logout.....");
      removeCookie("member", "/");
      return { ...initState };
    },
  },
  // 외부 API 연동을 통해 store 의 state 를 업데이트 함수 모음
  extraReducers: builder => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        // 외부 연동 성공
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("fulfilled");
        const payload = action.payload;
        // console.log(action);
        if (payload) {
          //정보 보관
          setCookie("member", JSON.stringify(payload));
        }
        return payload;
      })
      .addCase(loginPostAsync.pending, (state, action) => {
        // 외부 연동 시도중..
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("pending");
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        // 외부 연동 실패
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("rejected");
      })
      .addCase(postParentLoginAsync.fulfilled, (state, action) => {
        // 외부 연동 성공
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("fulfilled");
        const payload = action.payload;
        // console.log(action);
        if (payload) {
          //정보 보관
          setCookie("member", JSON.stringify(payload));
        }
        return payload;
      })
      .addCase(postParentLoginAsync.pending, (state, action) => {
        // 외부 연동 시도중..
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("pending");
      })
      .addCase(postParentLoginAsync.rejected, (state, action) => {
        // 외부 연동 실패
        // state : 기존 값(store 의 loginSate)
        // action : 받아온 값
        // console.log("rejected");
      });
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
