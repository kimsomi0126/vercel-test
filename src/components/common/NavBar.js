import React, { useEffect, useState } from "react";
import { HeaderBtn, NavWrap } from "../../styles/basic";
import {
  GrayBtn,
  GreenBtn,
  OrangeBtn,
  PinkBtn,
  PurpleBtn,
} from "../../styles/ui/buttons";
import { Link, useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import NotiAlarm from "../user/NotiAlarm";
import { useRecoilState } from "recoil";
import pushState from "../../atoms/pushState";
import { onMessageListener } from "../../fb/fbconfig";
import {
  patchParentFbToken,
  patchTeacherFbToken,
  getFbToken,
} from "../../api/user/pushApi";

const NavBar = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  // 로그인정보 체크
  const {
    moveToPath,
    doLogout,
    loginState,
    isLogin,
    isName,
    isAdminLogin,
    isParentLogin,
    isTeacherLogin,
    refreshAccessToken,
  } = useCustomLogin();
  const ikidList = loginState.kidList;
  const iclass = isLogin && !isTeacherLogin ? 0 : loginState.iclass;
  const iteacher = loginState.iteacher;

  // 로그아웃
  const handleLogout = () => {
    doLogout();
    moveToPath("/");
  };
  // 푸시알림 State
  const [notiPush, setNotiPush] = useRecoilState(pushState);

  // 알림사용 승인 후 firebase 토큰 가져오기
  useEffect(() => {
    // 값이 잘못들어가있으면 리셋 (추후삭제)
    if (notiPush.pushList.some(item => "iuser" in item)) {
      setNotiPush({
        pushList: [],
      });
    }
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          getFbToken(successFn);
        }
      });
    } else {
      getFbToken(successFn);
    }
  }, [loginState]);
  //가져온 firebase 토큰이 로그인정보에 있는 토큰값과 다른지 체크
  const successFn = res => {
    const userFirebaseToken = isParentLogin
      ? loginState.prFirebaseToken
      : loginState.firebaseToken;

    if (userFirebaseToken !== res && loginState.accessToken) {
      console.log("firebaseToken :", res);
    }
  };

  // 푸시알림감지 후 알림 리스트 업데이트
  onMessageListener()
    .then(payload => {
      const newData = JSON.parse(payload.notification.body);
      setNotiPush(prev => {
        let pushListUpdated = false;
        const updatedPushList = prev.pushList.map(item => {
          // iteacher,iparent 값 확인
          if (
            item.iteacher === loginState.iteacher ||
            item.iparent === loginState.iparent
          ) {
            // 일치하면 원래 있던 객체에 data, totalCnt만 추가
            item.data.push(newData);
            item.totalCnt++;
            pushListUpdated = true;
          }
          return item;
        });

        // 일치하는 iteacher,iparent 값이 없을경우
        // 선생님, 학부모에 따라 값 추가
        if (!pushListUpdated) {
          const newItem = {};
          if (isParentLogin) {
            newItem.iparent = loginState.iparent;
          }
          if (isLogin) {
            newItem.iteacher = loginState.iteacher;
          }
          newItem.totalCnt = 1;
          newItem.data = [newData];
          updatedPushList.push(newItem);
        }

        return { ...prev, pushList: updatedPushList };
      });
    })
    .catch(error => console.log(error));

  console.log(notiPush);

  return (
    <NavWrap>
      <Link to={"/"} className="nav-logo">
        <img src={process.env.PUBLIC_URL + "/images/common/header/logo.svg"} />
      </Link>
      <p>{isLogin || isParentLogin ? `${isName}님 환영합니다.` : null}</p>
      {/* 푸시알림 */}
      {isParentLogin || isTeacherLogin ? <NotiAlarm /> : null}

      <HeaderBtn>
        {isLogin ? (
          <>
            <GrayBtn
              className="nav-btn"
              onClick={e =>
                navigate(`/ind?year=${currentYear}&page=1&iclass=${iclass}`)
              }
            >
              알림장목록
            </GrayBtn>

            <PurpleBtn
              className="nav-btn"
              onClick={e => navigate(`/admin?page=1&iclass=${iclass}`)}
            >
              학부모관리
            </PurpleBtn>
            <OrangeBtn
              className="nav-btn"
              onClick={e =>
                navigate(`/admin/student?page=1&kidCheck=${iclass}`)
              }
            >
              원생관리
            </OrangeBtn>
            {isTeacherLogin ? (
              <PinkBtn
                className="nav-btn"
                onClick={e =>
                  navigate(`/admin/teacher/edit?iteacher=${iteacher}`)
                }
              >
                정보수정
              </PinkBtn>
            ) : null}
            <GreenBtn
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </GreenBtn>
          </>
        ) : isParentLogin ? (
          <>
            <GrayBtn
              className="nav-btn"
              onClick={e =>
                navigate(
                  `/ind?year=${currentYear}&page=1&ikid=${
                    ikidList[0] ? ikidList[0].ikid : 0
                  }`,
                )
              }
            >
              알림장
            </GrayBtn>
            <OrangeBtn
              className="nav-btn"
              onClick={e =>
                navigate(
                  `/mypage?year=${currentYear}&ikid=${
                    ikidList[0] ? ikidList[0].ikid : 0
                  }`,
                )
              }
            >
              마이페이지
            </OrangeBtn>
            <GreenBtn
              onClick={() => {
                handleLogout();
              }}
            >
              로그아웃
            </GreenBtn>
          </>
        ) : (
          <>
            <OrangeBtn onClick={e => navigate("user/accounts")}>
              회원가입
            </OrangeBtn>
            <GreenBtn onClick={e => navigate("login")}>로그인</GreenBtn>
          </>
        )}
      </HeaderBtn>
    </NavWrap>
  );
};

export default NavBar;
