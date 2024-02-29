import styled from "@emotion/styled";
import { colors, shadow } from "./basic";

// 상세페이지 전체 레이아웃
export const ViewLogWrap = styled.div`
  padding: 3rem 0 8rem;
`;

// 슬라이드
export const ViewSlider = styled.div`
  position: relative;
  max-width: 15.5rem;
  margin: 0 auto;

  .slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }
  .slide-btn.prev {
    left: -4rem;
  }
  .slide-btn.next {
    right: -4rem;
  }
  .swiper-pagination {
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    z-index: 9;
    transform: translateX(-50%);
    font-size: 1.2rem;
    color: ${colors.gray};
  }
`;

// 슬라이드 이미지
export const ImgBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  max-height: 22.2rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    max-height: 22.2rem;
  }
`;

// 상세보기
export const ViewInfo = styled.div`
  position: relative;
  margin-top: 2rem;
  h4 {
    font-size: 1.8rem;
    font-weight: 400;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ebebeb;
    border-width: 1px 0;
  }
  li {
    border-bottom: 1px solid #ebebeb;
    padding: 1rem;
    font-size: 1.4rem;
    &.wd100 dt {
      border-right: 0;
    }
    &.wd100 dd {
      width: 100%;
      margin-top: 1rem;
      min-height: 6rem;
    }
  }

  dl {
    display: flex;
    flex-wrap: wrap;
    dt {
      color: #555;
      width: 5rem;
      border-right: 1px solid #ebebeb;
      margin-right: 2rem;
      font-weight: 400;
    }
    dd {
      font-weight: 400;
      width: calc(100% - 7rem);
    }
  }
`;
