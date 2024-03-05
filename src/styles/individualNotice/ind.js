import styled from "@emotion/styled";
import { boxStyle, colors, ellipsis, fonts, mq } from "../basic";

export const IndWrap = styled.div`
  position: relative;
  padding-bottom: 5rem;
`;

export const IndListWrap = styled.div`
  min-height: 60vh;
`;

export const IndList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
`;

export const IndListBox = styled.div`
  width: 32%;
  margin-bottom: 1rem;
  ${boxStyle}
  a {
    display: block;
    padding: 1.5rem 2rem;
  }
  &.notice {
    background: #fff7f7;
  }
  ${mq.mobileBig} {
    width: 49%;
  }
  ${mq.mobileSmall} {
    width: 100%;
  }
`;

export const IndTop = styled.div`
  position: relative;
  border-bottom: 1px solid ${colors.grayBar};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;
export const IndName = styled.div`
  color: ${colors.grayDeep};
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
`;
export const IndTitle = styled.p`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
  img {
    width: 1.6rem;
    margin-right: 0.5rem;
  }
  span {
    padding-right: 0.5rem;
  }
  b {
    display: inline-block;
    font-weight: 500;
  }
`;
export const IndIcon = styled.div`
  position: absolute;
  right: 0;
  top: 0rem;
  display: flex;
  gap: 1rem;
  img {
    width: 1.8rem;
  }
`;
export const IndCon = styled.div`
  min-height: 3rem;
  font-size: 1.4rem;
  span {
    display: block;
    color: ${colors.grayDeep};
    ${ellipsis.line2}
    word-break: break-all;
  }
`;
export const IndBot = styled.div`
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

// 작성자 선택버튼
export const FromToBtnWrap = styled.div`
  display: flex;
  gap: 1rem;
  button {
    padding: 0;
    color: #888;
    font-size: 1.4rem;
    /* border-radius: 0.5rem;
    border: 1px solid #ccc; */

    :before {
      content: "|";
      margin-right: 1rem;
      font-weight: 300;
      vertical-align: 7%;
    }
    :first-of-type:before {
      display: none;
    }
  }
  .teacher {
    color: ${props =>
      props.isLogin && props.fromTo == 1
        ? "#222"
        : !props.isLogin && props.fromTo == 0
        ? "#222"
        : "#888"};
    /* background: ${props =>
      props.isLogin && props.fromTo == 1
        ? "#ccc"
        : !props.isLogin && props.fromTo == 0
        ? "#ccc"
        : "#fff"}; */
  }
  .parent {
    color: ${props =>
      props.isLogin && props.fromTo == 0
        ? "#222"
        : !props.isLogin && props.fromTo == 1
        ? "#222"
        : "#888"};
    /* background: ${props =>
      props.isLogin && props.fromTo == 0
        ? "#ccc"
        : !props.isLogin && props.fromTo == 1
        ? "#ccc"
        : "#fff"}; */
  }

  ${mq.mobileBig} {
    margin-top: -2rem;
  }
`;

// 탭메뉴
export const TabWrap = styled.div`
  position: relative;
  border-bottom: 1px solid ${colors.greenDeep};
  margin-bottom: 2rem;

  a {
    display: inline-block;
    padding: 0.8rem 1rem;
    border-radius: 1rem 1rem 0 0;
    text-align: center;
    min-width: 12rem;
    font-size: 2rem;
    font-family: ${fonts.kotraHope};
    color: ${colors.grayDeep};
    background: #d9d9d9;
    transition: 0.3s;

    &:hover,
    &.active {
      background: ${colors.greenDeep};
      color: #fff;
    }
  }
`;
