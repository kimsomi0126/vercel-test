import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.css";
import { Wrap } from "./styles/basic";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";
import Main from "./pages/Main";
import MyLog from "./pages/mylog/MyLog";
import ViewLog from "./pages/culturelog/ViewLog";
import EditLog from "./pages/culturelog/EditLog";
import WriteLog from "./pages/culturelog/WriteLog";
import Login from "./pages/Login";
import About from "./pages/About";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Error from "./pages/Error";
import { getUser } from "./api/user_api";
const App = () => {
  const navigate = useNavigate();
  const [iuser, setIuser] = useState(getUser());
  const [password, setPassword] = useState("1111");
  const loginCheck = () => {
    const loginUser = getUser();
    setIuser(loginUser);
    if (!loginUser) {
      // alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
  };

  return (
    <Wrap maxw="393">
      <Routes>
        {/* 로그인 */}
        <Route
          path="/login"
          element={<Login iuser={iuser} password={password}></Login>}
        ></Route>
        {/* 회원가입 */}
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        {/* 인트로 */}
        <Route path="/intro" element={<Intro></Intro>}></Route>
        {/* 메인 */}
        <Route
          path="/"
          element={<Main iuser={iuser} loginCheck={loginCheck}></Main>}
        ></Route>
        {/* 어바웃 */}
        <Route path="/about" element={<About></About>}></Route>
        {/* 컬쳐로그 기록 */}
        <Route path="/culturelog" element={<Outlet></Outlet>}>
          <Route
            index
            element={<Main iuser={iuser} loginCheck={loginCheck}></Main>}
          />
          <Route
            path="view/:imedia"
            element={<ViewLog iuser={iuser} loginCheck={loginCheck}></ViewLog>}
          />
          <Route
            path="write"
            element={
              <WriteLog iuser={iuser} loginCheck={loginCheck}></WriteLog>
            }
          />
          <Route
            path="edit/:imedia"
            element={<EditLog iuser={iuser} loginCheck={loginCheck}></EditLog>}
          />
        </Route>
        {/* 마이로그 */}
        <Route
          path="/mylog"
          element={<MyLog iuser={iuser} loginCheck={loginCheck} />}
        ></Route>
        {/* 잘못된 경로(404) */}
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
    </Wrap>
  );
};

export default App;
