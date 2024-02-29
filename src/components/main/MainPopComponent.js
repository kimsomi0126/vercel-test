import React from "react";
import { ImgBox, MainPopSlide } from "../../styles/main";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { VisualPopImage } from "../common/TemporaryData";

const MainPopComponent = () => {
  return (
    <MainPopSlide>
      <Swiper
        slidesPerView={1}
        loop="true"
        speed={800}
        pagination={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {Array.isArray(VisualPopImage) &&
          VisualPopImage.map((item, index) => {
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
    </MainPopSlide>
  );
};

export default MainPopComponent;
