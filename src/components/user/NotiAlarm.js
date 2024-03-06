import React, { useEffect, useRef, useState } from "react";
import {
  EmptyList,
  NotiBox,
  NotiIcon,
  NotiItem,
  NotiItemWrap,
  NotiList,
  NotiWrap,
} from "../../styles/user/notialarm";
import { useRecoilState } from "recoil";
import pushState from "../../atoms/pushState";
import useCustomLogin from "../../hooks/useCustomLogin";
import { Link } from "react-router-dom";

const NotiAlarm = () => {
  const [notiPush, setNotiPush] = useRecoilState(pushState);
  const [isListOpen, setIsListOpen] = useState(false);
  // 로그인체크
  const { isLogin, loginState } = useCustomLogin();
  const iuser = isLogin ? "iteacher" : "iparent";
  const userNm = isLogin ? loginState.iteacher : loginState.iparent;
  // 유저와 일치하는 data
  const data = notiPush.pushList.filter(
    obj =>
      Object.prototype.hasOwnProperty.call(obj, iuser) && obj[iuser] === userNm,
  );
  // data
  let notiList = [];
  let totalCnt = false;
  if (data.length > 0) {
    notiList = data[0].data;
    totalCnt = !data[0].totalCnt || data[0].totalCnt === 0 ? false : true;
  }

  const listRef = useRef(null);
  console.log(notiList);
  // 화면 나오면 data 값 넣기
  useEffect(() => {
    // const handleOutsideClose = e => {
    //   if (isListOpen && !listRef.current.contains(e.target))
    //     setIsListOpen(false);
    // };
    // document.addEventListener("click", handleOutsideClose);
    // return () => document.removeEventListener("click", handleOutsideClose);
  }, [totalCnt]);

  // 알림 리스트
  const handleClickOpen = () => {
    setIsListOpen(!isListOpen);
    if (!isListOpen && totalCnt) {
      setNotiPush(prev => {
        const updatedPushList = prev.pushList.map(item => {
          if (item[iuser] === userNm) {
            item.totalCnt = 0;
          }
          return item;
        });
        return { ...prev, pushList: updatedPushList };
      });
    }
  };

  // 알림삭제
  const handleClickDelete = index => {
    // 클릭한 객체 제외하고 새로 배열 저장
    const updatedNotiList = [
      ...notiList.slice(0, index),
      ...notiList.slice(index + 1),
    ];
    notiList = updatedNotiList;

    // notiPush 업데이트
    setNotiPush(prev => {
      const updatedPushList = prev.pushList.map(item => {
        if (item[iuser] === userNm) {
          item.data = item.data.filter((notiItem, idx) => idx !== index);
          // item.totalCnt--;
        }
        return item;
      });
      return { ...prev, pushList: updatedPushList };
    });
  };

  return (
    <NotiWrap ref={listRef}>
      <NotiIcon state={totalCnt} onClick={handleClickOpen}>
        <img src={process.env.PUBLIC_URL + "/images/common/bell_icon.svg"} />
      </NotiIcon>
      <NotiList className={isListOpen ? "active" : ""}>
        <NotiItemWrap className={isListOpen ? "active" : ""}>
          {notiList.length === 0 ? (
            <EmptyList>알림이 없습니다.</EmptyList>
          ) : (
            Array.isArray(notiList) &&
            notiList.map((item, index) => (
              <NotiItem key={index}>
                <Link
                  to={`/ind${item.imemory ? "/album" : ""}/details/${
                    item.inotice || item.imemory
                  }?ikid=${item.ikid}&year=2024&page=1`}
                >
                  <ul>
                    <li className="noti-kid">
                      <span className="noti-date">
                        {item.createdAt || item.cmtCreatedAt}
                      </span>{" "}
                      <br />
                      {item.kidNm} {item.inotice ? "알림장" : "추억앨범"}{" "}
                      {item.noticeComment || item.noticeComment
                        ? "새 댓글"
                        : null}
                    </li>
                    <li className="noti-title">
                      {item.noticeTitle || item.memoryTitle}
                      {item.noticeComment || item.noticeComment}
                    </li>
                    {/* <li className="noti-writer">{item.writerNm}</li> */}
                  </ul>
                </Link>
                <button onClick={() => handleClickDelete(index)}>
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/common/close_icon.svg"
                    }
                    alt="알림삭제"
                  />
                  알림삭제
                </button>
              </NotiItem>
            ))
          )}
        </NotiItemWrap>
      </NotiList>
    </NotiWrap>
  );
};

export default NotiAlarm;
