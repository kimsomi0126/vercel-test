import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import "../styles/index.css";
import "../styles/normalize.css";

// 라우터 페이지 로딩 컴포넌트
import Loading from "../components/loading/Loading";
import ContentLayout from "../layouts/common/ContentLayout";
import NotFound from "../pages/NotFound";

// 개별 라우터 컴포넌트
import adminRouter from "./adminRouter";
import albumRouter from "./albumRouter";
import eduRouter from "./eduRouter";
import indRouter from "./indRouter";
import infoRouter from "./infoRouter";
import noticeRouter from "./noticeRouter";
import userRouter from "./userRouter";

// lazy 는 실시간으로 컴포넌트 불러들이기

//메인 페이지 레이아웃
const MainLayout = lazy(() => import("../layouts/MainLayout"));

//메인 페이지
const MainPage = lazy(() => import("../pages/Main"));

// 로그인, 사용자 페이지
const Login = lazy(() => import("../pages/user/Login"));
const MyPage = lazy(() => import("../pages/user/MyPage"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <MainPage />
          </Suspense>
        ),
      },

      {
        path: "/user/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: userRouter(),
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },

      {
        path: "/myPage",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        ),
      },

      {
        path: "/info/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: infoRouter(),
      },
      {
        path: "/edu/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: eduRouter(),
      },

      {
        path: "/album/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: albumRouter(),
      },

      {
        path: "/notice/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: noticeRouter(),
      },

      {
        path: "/admin/",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: adminRouter(),
      },

      {
        path: "ind",
        element: (
          <Suspense fallback={<Loading />}>
            <ContentLayout />
          </Suspense>
        ),
        children: indRouter(),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
