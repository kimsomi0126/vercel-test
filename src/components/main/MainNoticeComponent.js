import React, { useEffect, useState } from "react";
import {
  MainNoticeItem,
  MainNoticeList,
  MainNoticeTitle,
  MainNoticeWrap,
} from "../../styles/main";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalOneBtn from "../ui/ModalOneBtn";

export const MainNoticeComponent = ({ noticeDate }) => {
  const navigate = useNavigate();
  // 로그인 체크
  const { isLogin, isParentLogin } = useCustomLogin();
  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  const modalPopup = () => {
    setIsOpen(true);
    setTitle("회원 전용페이지");
    setSubTitle("로그인 후 이용해주세요.");
    setIsNavigate("/login");
  };
  return (
    <MainNoticeWrap>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <MainNoticeTitle>
        <Link to="/notice">유치원소식</Link>
      </MainNoticeTitle>
      <MainNoticeList>
        <Swiper
          direction={"vertical"}
          speed={600}
          autoplay={{
            delay: 3000,
            reverseDirection: true,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {Array.isArray(noticeDate) &&
            noticeDate.map((item, index) => {
              return (
                <SwiperSlide key={`key_${item.ifullNotice}`}>
                  <MainNoticeItem>
                    {!isLogin && !isParentLogin ? (
                      <Link onClick={modalPopup}>
                        <p>{item.fullTitle}</p>
                        <span>{item.createdAt}</span>
                      </Link>
                    ) : (
                      <Link to={`/notice/details/${item.ifullNotice}`}>
                        <p>{item.fullTitle}</p>
                        <span>{item.createdAt}</span>
                      </Link>
                    )}
                  </MainNoticeItem>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </MainNoticeList>
    </MainNoticeWrap>
  );
};
