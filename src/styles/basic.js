/* eslint-disable no-undef */
import styled from "@emotion/styled";

// 기본색상
export const colors = {
  main: "#ffffff",
  secondary: "#ebebeb",
  point: "#273F7C",
  tab: "#f7f7f7",
  error: "#ff6345",
  placeholder: "#cccccc",
  gray: "#555555",
  black: "#000",
};

// 그림자효과
export const shadow = {
  light: { boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)" },
  bold: {
    boxShadow:
      "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)",
  },
};

// 전체 레이아웃
export const Wrap = styled.div`
  position: relative;
  max-width: ${props => props.maxw + "px"};
  /* height: 100vh; */
  min-height: 100vh;
  overflow-x: auto;
  margin: 0 auto;
  padding: 6rem 1.5% 16rem;
  background: #fff;

  input,
  textarea {
    border: 1px solid ${colors.secondary};
    border-radius: 0;
    font-size: 1.2rem;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${colors.placeholder};
  }
`;

export const Inner = styled.div`
  padding: 0 5%;
`;

// header 레이아웃
export const HeaderWrap = styled.header`
  position: fixed;
  max-width: ${props => props.maxw + "px"};
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 6rem;
  background: url(${process.env.PUBLIC_URL + "/images/nav_bg.jpg"}) center/cover;
  z-index: 999;
  h3 {
    font-size: 1.8rem;
    text-align: center;
    font-weight: 300;
    line-height: 6rem;
    color: ${colors.point};
  }
  h3 a {
    color: ${colors.point};
  }

  button {
    display: none;
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    &.on {
      display: block;
    }
    &.signout {
      display: block;
      left: initial;
      right: 5%;
      width: 2.8rem;
      height: 2.8rem;
      background: url(${process.env.PUBLIC_URL + "/images/icon_signout.svg"})
        no-repeat center/100%;
      font-size: 0;
      transition: 0.2s;
      &:hover {
        background: url(${process.env.PUBLIC_URL + "/images/icon_signout.svg"});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
      }
    }
  }
`;

// footer 레이아웃
export const FooterWrap = styled.footer`
  position: fixed;
  max-width: ${props => props.maxw + "px"};
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
  height: 6rem;
  font-size: 1.8rem;
  text-align: center;
  font-weight: 300;
  line-height: 6rem;
  color: ${colors.point};
  background: url(${process.env.PUBLIC_URL + "/images/nav_bg.jpg"}) center/cover;
  z-index: 99999;
`;

export const FooterBtnWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FooterBtn = styled.div`
  img {
    margin-bottom: 0.5rem;
  }
`;

export const FooterAddBtn = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  background: ${colors.main};
  border: 1px solid ${colors.secondary};
  border-radius: 50%;
  margin-top: -5.5rem;
  ${shadow.light}
  a {
    display: block;
    width: 7.2rem;
    height: 7.2rem;
  }
`;

export const FooterCopyRight = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10rem;
  text-align: center;
  small {
    display: block;
    font-size: 1.2rem;
    color: ${colors.placeholder};
  }
  a {
    display: inline-block;
    min-width: 18rem;
    padding: 0.7rem 2rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: ${colors.placeholder};
    transition: 0.3s;
    border-radius: 4rem;
    &:hover {
      border-color: ${colors.gray};
      color: ${colors.gray};
    }
  }
`;
