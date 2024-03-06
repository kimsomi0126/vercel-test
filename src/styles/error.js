import styled from "@emotion/styled";
import { colors, shadow } from "./basic";
import { animationFadeIn, animationFadeUp } from "./animation";

export const ErrorWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: url(${process.env.PUBLIC_URL + "/images/intro_bg.jpg"})
    center/cover;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const ErrorTop = styled.div`
  margin-bottom: 2rem;
  animation: ${animationFadeIn} 0.8s ease-in-out;

  h4 {
    font-size: 1.8rem;
    font-weight: 500;
    color: ${colors.point};
    margin-top: 2rem;
  }
`;

export const ErrorBot = styled.div`
  font-size: 1.4rem;
  font-weight: 200;
  line-height: 1.5;
  margin-bottom: 10vh;
  animation: ${animationFadeIn} 0.8s ease-in-out;

  a {
    margin-top: 2rem;
    display: inline-block;
    background: ${colors.point};
    color: ${colors.main};
    padding: 1rem 2.4rem;
    border-radius: 10rem;

    ${shadow.light}
    &:hover {
      ${shadow.bold}
    }
  }
`;
