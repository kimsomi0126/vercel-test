import { Suspense, lazy } from "react";

import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

// 유치원 소식(공지사항)영역
const NoticeDetails = lazy(() => import("../pages/notice/NoticeDetails"));
const NoticeList = lazy(() => import("../pages/notice/NoticeList"));
const NoticeModify = lazy(() => import("../pages/notice/NoticeModify"));
const NoticeWrite = lazy(() => import("../pages/notice/NoticeWrite"));

const noticeRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeList />
        </Suspense>
      ),
    },
    {
      path: "write",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeWrite />
        </Suspense>
      ),
    },
    {
      path: "details/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeDetails />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <NoticeModify />
        </Suspense>
      ),
    },
  ];
};
export default noticeRouter;
