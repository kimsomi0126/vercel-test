import styled from "@emotion/styled";
import { boxStyle, colors, ellipsis, mq, shadow } from "./basic";
import { Link } from "react-router-dom";

export const MainInner = styled.div`
  height: 100%;
  padding-right: 40rem;
  ${mq.tablet} {
    padding-right: 0;
  }
`;

// 활동앨범
export const MainAlbum = styled.div`
  position: fixed;
  right: 0;
  top: 7.5rem;
  padding: 2rem;
  width: 40rem;
  height: 100vh;
  background: url(${process.env.PUBLIC_URL +
    "/images/main/album/main_album_bg.jpg"})
    repeat top;
  h3 {
    border-bottom: 1px solid ${colors.greenDeep};
    padding-bottom: 1rem;
  }
  ${mq.tablet} {
    position: relative;
    top: inherit;
    right: inherit;
    height: auto;
    width: 100%;
    overflow: hidden;
    margin-top: 1rem;
    ${boxStyle}
    background: url(${process.env.PUBLIC_URL +
    "/images/main/album/main_album_bg.jpg"})
      repeat top;
  }
  ${mq.mobileBig} {
    padding: 1rem;
  }
`;

export const MainAlbumList = styled.ul`
  position: relative;
  width: 100%;
  max-height: 78vh;
  overflow-y: auto;

  li {
    background: #fff;
    border-radius: 1rem;
    margin-top: 2rem;
    ${shadow}
  }
  a {
    display: block;
    padding: 2rem;
    :hover img {
      transform: scale(1.03);
    }
  }
  ${mq.tablet} {
    display: flex;
    gap: 2%;
    a {
      padding: 1rem;
    }
    li {
      width: 32%;
      margin-top: 1rem;
      span {
        font-size: 1.2rem;
      }
    }
  }
  ${mq.mobileBig} {
    li {
      width: 49%;
    }
    li:last-child {
      display: none;
    }
  }
`;
export const MainAlbumImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  aspect-ratio: 16/9;
  border-radius: 1rem;
  img {
    width: 100%;
    transition: 0.2s;
  }
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px);
    &:after {
      content: "로그인 후 확인하세요";
      color: #555;
      position: absolute;
      left: 50%;
      top: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      font-size: 1.4rem;
    }
  }
`;

export const MainAlbumText = styled.div`
  margin-top: 1.5rem;
  b {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1rem;
    ${ellipsis.line1}
  }
  p {
    font-size: 1.4rem;
    color: ${colors.grayDeep};
    font-weight: 300;
    margin-bottom: 1rem;
    ${ellipsis.line3}
  }
  span {
    color: ${colors.grayDeep};
    font-weight: 300;
  }

  ${mq.tablet} {
    p {
      ${ellipsis.line2}
      margin-bottom:0.5rem;
    }
  }
`;

export const MainContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 110rem;
  padding-bottom: 15rem;
  margin: 0 auto;
`;

// 비주얼슬라이드
export const MainVisual = styled.div`
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  ${shadow}
  margin-bottom: 1rem;
  ${mq.tablet} {
    border-radius: 1rem;
  }
`;
export const ImgBox = styled.div`
  img {
    width: 100%;
  }
`;

// 메인 유치원소식
export const MainNoticeWrap = styled.div`
  position: relative;
  width: 100%;
  background: ${colors.greenLight2};
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;

  ${shadow}

  ${mq.tablet} {
    flex-wrap: wrap;
    border-radius: 1rem;
  }
`;
export const MainNoticeTitle = styled.h3`
  padding-left: 3.5rem;
  background: url(${process.env.PUBLIC_URL + "/images/common/sidebar/news.svg"})
    no-repeat left 0.25rem/2.8rem;
  color: ${colors.greenDeep};
  margin-right: 2rem;
  a {
    color: ${colors.greenDeep};
  }
  ${mq.mobileBig} {
    width: 100%;
    margin-bottom: 1rem;
    margin: 0 0 0.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${colors.greenDeep};
  }
`;

export const MainNoticeList = styled.div`
  width: 100%;

  height: 2.8rem;
  font-size: 1.6rem;
  overflow: hidden;
  a {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-size: 1.4rem;
    color: ${colors.grayDeep};
  }
  .swiper,
  .swiper-slide {
    height: 100%;
  }
`;

export const MainNoticeItem = styled.div`
  line-height: 2.8rem;
  height: 100%;
`;

// 메인배너
export const MainBannerWrap = styled.div`
  position: relative;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`;
export const MainBanner = styled.div`
  background: #f2f2f2;
  width: 32%;
  border-radius: 2rem;
  ${shadow}
  h3 {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
  a {
    padding: 3rem 4rem;
    display: block;
  }
  &.bnr1 {
    background: ${colors.orangeLight}
      url(${process.env.PUBLIC_URL + "/images/main/grid_bg.png"});
    h3 {
      color: #fb417c;
    }
    a {
      background: url(${process.env.PUBLIC_URL + "/images/main/main_bnr01.svg"})
        no-repeat 90% 80% / auto 50%;
    }
  }
  &.bnr2 {
    background: #ffd6e3
      url(${process.env.PUBLIC_URL + "/images/main/grid_bg.png"});
    h3 {
      color: #01a78b;
    }
    a {
      background: url(${process.env.PUBLIC_URL + "/images/main/main_bnr02.svg"})
        no-repeat 90% 80% / auto 50%;
    }
  }
  &.bnr3 {
    background: #d8ebf9
      url(${process.env.PUBLIC_URL + "/images/main/grid_bg.png"});
    h3 {
      color: #a36bff;
    }
    a {
      background: url(${process.env.PUBLIC_URL + "/images/main/main_bnr03.svg"})
        no-repeat 90% 80% / auto 50%;
    }
  }

  ${mq.tablet} {
    border-radius: 1rem;
    a {
      padding: 2rem;
    }
    h3 {
      font-size: 2.8rem;
      margin-bottom: 1rem;
    }
  }

  ${mq.mobileBig} {
    a {
      padding: 1rem;
    }
    h3 {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }
  }
`;

export const MainFlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// 팝업슬라이드
export const MainPopSlide = styled.div`
  position: relative;
  width: 32%;
  border-radius: 2rem;
  overflow: hidden;
  ${shadow}

  ${mq.tablet} {
    border-radius: 1rem;
  }
`;

// 메인 오시는길
export const MainLocation = styled(Link)`
  width: calc(100% - 34%);
  border-radius: 2rem;
  overflow: hidden;
  ${shadow}
  background: url(${process.env.PUBLIC_URL + "/images/main/main_location.jpg"})
        no-repeat center/cover;
  img {
    width: 100%;
  }

  ${mq.tablet} {
    border-radius: 1rem;
  }
`;

export const SlideBtn = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9;
  cursor: pointer;
  img {
    width: 3rem;
  }
  &.prev {
    left: 2%;
  }
  &.next {
    right: 2%;
  }
`;
