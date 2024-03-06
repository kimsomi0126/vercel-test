import { Suspense, lazy } from "react";

import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

// 활동앨범 영역
const Album = lazy(() => import("../pages/album/Album"));
const AlbumDetails = lazy(() => import("../pages/album/AlbumDetails"));
const AlbumModify = lazy(() => import("../pages/album/AlbumModify"));
const AlbumWrite = lazy(() => import("../pages/album/AlbumWrite"));

const albumRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <Album />
        </Suspense>
      ),
    },
    {
      path: "details/:pno",
      element: (
        <Suspense fallback={<Loading />}>
          <AlbumDetails />
        </Suspense>
      ),
    },
    {
      path: "write",
      element: (
        <Suspense fallback={<Loading />}>
          <AlbumWrite />
        </Suspense>
      ),
    },
    {
      path: "modify/:pno",
      element: (
        <Suspense fallback={<Loading />}>
          <AlbumModify />
        </Suspense>
      ),
    },
  ];
};
export default albumRouter;
