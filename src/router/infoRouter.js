import { Suspense, lazy } from "react";

import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

// 유치원 안내 영역
const Info = lazy(() => import("../pages/information/Info"));
const InfoClass = lazy(() => import("../pages/information/InfoClass"));
const Location = lazy(() => import("../pages/information/Location"));

const infoRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <Info />
        </Suspense>
      ),
    },
    {
      path: "class",
      element: (
        <Suspense fallback={<Loading />}>
          <InfoClass />
        </Suspense>
      ),
    },
    {
      path: "location",
      element: (
        <Suspense fallback={<Loading />}>
          <Location />
        </Suspense>
      ),
    },
  ];
};
export default infoRouter;
