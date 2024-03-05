import React from "react";
import { ImgBox, MainVisual, SlideBtn } from "../../styles/main";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { VisualImage } from "../common/TemporaryData";

export const MainVisualComponent = () => {
  return (
    <MainVisual>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop="true"
        speed={800}
        autoplay={{
          delay: 3000,

          disableOnInteraction: false,
        }}
        effect="fade"
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        modules={[Autoplay, Navigation, EffectFade]}
      >
        {Array.isArray(VisualImage) &&
          VisualImage.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ImgBox>
                  <img
                    src={process.env.PUBLIC_URL + item}
                    alt={`image${index + 1}`}
                  ></img>
                </ImgBox>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <SlideBtn className="prev">
        <img
          src={process.env.PUBLIC_URL + "/images/main/slide_btn_prev.svg"}
          alt="이전"
        />
      </SlideBtn>
      <SlideBtn className="next">
        <img
          src={process.env.PUBLIC_URL + "/images/main/slide_btn_next.svg"}
          alt="다음"
        />
      </SlideBtn>
    </MainVisual>
  );
};
