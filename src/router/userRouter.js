import { Suspense, lazy } from "react";

import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

// 인증번호 입력
const Accounts = lazy(() => import("../pages/user/Accounts"));
//회원 상세가입
const SignupForm = lazy(() => import("../pages/user/SignupForm"));

const userRouter = () => {
  return [
    {
      path: "accounts",
      element: (
        <Suspense fallback={<Loading />}>
          <Accounts />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: (
        <Suspense fallback={<Loading />}>
          <SignupForm />
        </Suspense>
      ),
    },
  ];
};

export default userRouter;
