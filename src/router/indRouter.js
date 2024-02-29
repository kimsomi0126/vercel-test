import { Suspense, lazy } from "react";

import { Navigate } from "react-router";
import Loading from "../components/loading/Loading";

//알림장 영역
const IndivNotiList = lazy(() =>
  import("../pages/individualNotice/IndivNotiList"),
);
const IndivNotidetails = lazy(() =>
  import("../pages/individualNotice/IndivNotiDetails"),
);
const IndivNotiModify = lazy(() =>
  import("../pages/individualNotice/IndivNotiModify"),
);
const IndivNotiWrite = lazy(() =>
  import("../pages/individualNotice/IndivNotiWrite"),
);

//알림장 앨범 영역
const IndivAlbumList = lazy(() => import("../pages/indivalbum/IndivAlbumList"));
const IndivAlbumdetails = lazy(() =>
  import("../pages/indivalbum/IndivAlbumDetails"),
);
const IndivAlbumModify = lazy(() =>
  import("../pages/indivalbum/IndivAlbumModify"),
);
const IndivAlbumWrite = lazy(() =>
  import("../pages/indivalbum/IndivAlbumWrite"),
);

const indRouter = () => {
  return [
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivNotiList />
        </Suspense>
      ),
    },
    {
      path: "write",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivNotiWrite />
        </Suspense>
      ),
    },
    {
      path: "details/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivNotidetails />
        </Suspense>
      ),
    },
    {
      path: "modify/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivNotiModify />
        </Suspense>
      ),
    },
    {
      path: "album",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivAlbumList />
        </Suspense>
      ),
    },
    {
      path: "album/write",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivAlbumWrite />
        </Suspense>
      ),
    },
    {
      path: "album/details/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivAlbumdetails />
        </Suspense>
      ),
    },
    {
      path: "album/modify/:tno",
      element: (
        <Suspense fallback={<Loading />}>
          <IndivAlbumModify />
        </Suspense>
      ),
    },
  ];
};
export default indRouter;
