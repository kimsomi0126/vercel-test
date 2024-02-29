import React, { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import TeacherInfoList from "../pages/adminPage/teacher/TeacherInfoList";
import TeacherCreate from "../pages/adminPage/teacher/TeacherCreate";
import TeacherModify from "../pages/adminPage/teacher/TeacherModify";

//관리자 영역
const GuardianList = lazy(() => import("../pages/adminPage/GuardianList"));
const StudCreate = lazy(() => import("../pages/adminPage/student/StudCreate"));
const StudModify = lazy(() => import("../pages/adminPage/student/StudModify"));
const StudDetailsForm = lazy(() =>
  import("../pages/adminPage/student/StudDetailsForm"),
);
const StudDetails = lazy(() =>
  import("../pages/adminPage/student/StudDetails"),
);
const StudList = lazy(() => import("../pages/adminPage/student/StudList"));

const adminRouter = () => {
  return [
    // 학부모 관리
    {
      path: "",
      element: (
        <Suspense fallback={<Loading />}>
          <GuardianList />
        </Suspense>
      ),
    },
    // 원생 관리
    {
      path: "student",
      element: (
        <Suspense fallback={<Loading />}>
          <StudList />
        </Suspense>
      ),
    },
    // 원생 상세 정보 등록
    {
      path: "student/detailsform",
      element: (
        <Suspense fallback={<Loading />}>
          <StudDetailsForm />
        </Suspense>
      ),
    },
    // 원생 상세 정보
    {
      path: "student/details",
      element: (
        <Suspense fallback={<Loading />}>
          <StudDetails />
        </Suspense>
      ),
    },
    // 원생 등록
    {
      path: "student/create",
      element: (
        <Suspense fallback={<Loading />}>
          <StudCreate />
        </Suspense>
      ),
    },
    // 원생 정보 수정
    {
      path: "student/modify",
      element: (
        <Suspense fallback={<Loading />}>
          <StudModify />
        </Suspense>
      ),
    },
    // 선생님 관리
    {
      path: "teacher",
      element: (
        <Suspense fallback={<Loading />}>
          <TeacherInfoList />
        </Suspense>
      ),
    },
    // 선생님 등록
    {
      path: "teacher/create",
      element: (
        <Suspense fallback={<Loading />}>
          <TeacherCreate />
        </Suspense>
      ),
    },
    // 선생님 정보 수정
    {
      path: "teacher/edit",
      element: (
        <Suspense fallback={<Loading />}>
          <TeacherModify />
        </Suspense>
      ),
    },
  ];
};
export default adminRouter;
