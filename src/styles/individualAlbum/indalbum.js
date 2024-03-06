import styled from "@emotion/styled";
import { boxStyle, colors, ellipsis, fonts, mq } from "../basic";

export const IndAlbum = styled.div`
  display: flex;
  justify-content: space-between;
  .ind-date {
    color: ${colors.grayDeep};
    padding-left: 2.5rem;
    background: url(${process.env.PUBLIC_URL +
      "/images/common/notice/clock.svg"})
      no-repeat top left/ 1.8rem;
  }
`;

export const IndAlbumOver = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageWrapper = styled.div`
  padding-top: 1rem;
  display: flex; // flexbox 레이아웃 적용
  position: relative;
  justify-content: start; // 이미지를 왼쪽 정렬
  gap: 5px; // 이미지 사이의 간격 설정
`;
