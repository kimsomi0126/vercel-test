import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import {
  ClassWrap,
  InfoClassWrap,
  KidsInfo,
} from "../../styles/information/info";
import { MyClassWrap } from "../../styles/user/mypage";
import MyClass from "../../components/user/MyClass";
import { ImgBox } from "../../styles/main";
import { getKid } from "../../api/information/informationApi";
import { IMG_URL } from "../../api/config";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router";

const initData = [
  {
    iclass: 0,
    kidNm: "",
    profile: "",
  },
];

const InfoClass = () => {
  const navigate = useNavigate();
  // 원생전체정보
  const [kidsData, setKidData] = useState(initData);
  // iclass에 따라 배열 재분배
  const classHibiscus = kidsData.filter(kidsData => kidsData.iclass === 1);
  const classSunflower = kidsData.filter(kidsData => kidsData.iclass === 2);
  const classRose = kidsData.filter(kidsData => kidsData.iclass === 3);
  // 안내창 state
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 로그인 체크
  const { isLogin, isParentLogin } = useCustomLogin();

  useEffect(() => {
    if (!isLogin && !isParentLogin) {
      setTitle("회원 전용 페이지");
      setSubTitle("로그인 회원만 접근 가능합니다.");
      setIsOpen(true);
      return;
    } else {
      getKid({ successFn, failFn, errorFn });
    }
  }, []);
  const successFn = res => {
    setKidData([...res]);
  };
  const failFn = res => {
    // console.log(res);
  };
  const errorFn = res => {
    // console.log(res);
  };
  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 로그인페이지로 이동
    navigate("/login");
  };
  return (
    <InfoClassWrap>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      {/* 무궁화반 */}
      <ClassWrap className="class1">
        <MyClassWrap state={1}>
          <MyClass state={1} />
          <div className="pagination page1"></div>
        </MyClassWrap>

        {classHibiscus.length !== 0 ? (
          <Swiper
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween="0"
            speed={800}
            pagination={{
              el: ".page1",
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
          >
            {Array.isArray(classHibiscus) &&
              classHibiscus.map((item, index) => (
                <SwiperSlide key={`class1_${index}`}>
                  <KidsInfo>
                    <ImgBox className="kid_img">
                      <img
                        src={`${IMG_URL}/pic/kid/${item.ikid}/${item.profile}`}
                        alt={item.kidNm}
                      ></img>
                    </ImgBox>
                    <h4>{item.kidNm}</h4>
                  </KidsInfo>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            등록된 원생이 없습니다.
          </div>
        )}
      </ClassWrap>
      {/* 해바라기반 */}
      <ClassWrap className="class2">
        <MyClassWrap state={2}>
          <MyClass state={2} />
          <div className="pagination page2"></div>
        </MyClassWrap>
        {classSunflower.length !== 0 ? (
          <Swiper
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween="0"
            speed={800}
            pagination={{
              el: ".page2",
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
          >
            {Array.isArray(classSunflower) &&
              classSunflower.map((item, index) => (
                <SwiperSlide key={`class2_${index}`}>
                  <KidsInfo>
                    <ImgBox className="kid_img">
                      <img
                        src={`${IMG_URL}/pic/kid/${item.ikid}/${item.profile}`}
                        alt={item.kidNm}
                      ></img>
                    </ImgBox>
                    <h4>{item.kidNm}</h4>
                  </KidsInfo>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            등록된 원생이 없습니다.
          </div>
        )}
      </ClassWrap>
      {/* 장미반 */}
      <ClassWrap className="class3">
        <MyClassWrap state={3}>
          <MyClass state={3} />
          <div className="pagination page3"></div>
        </MyClassWrap>
        {classRose.length !== 0 ? (
          <Swiper
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween="0"
            speed={800}
            pagination={{
              el: ".page3",
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
          >
            {Array.isArray(classRose) &&
              classRose.map((item, index) => (
                <SwiperSlide key={`class3_${index}`}>
                  <KidsInfo>
                    <ImgBox className="kid_img">
                      <img
                        src={`${IMG_URL}/pic/kid/${item.ikid}/${item.profile}`}
                        alt={item.kidNm}
                      ></img>
                    </ImgBox>
                    <h4>{item.kidNm}</h4>
                  </KidsInfo>
                </SwiperSlide>
              ))}
          </Swiper>
        ) : (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            등록된 원생이 없습니다.
          </div>
        )}
      </ClassWrap>
    </InfoClassWrap>
  );
};

export default InfoClass;
