import styled from "@emotion/styled";
import { boxStyle, colors, ellipsis } from "../basic";
import { animationSwing } from "../ui/animations";
import { css } from "@emotion/react";

export const NotiWrap = styled.div`
  position: relative;
`;

export const NotiIcon = styled.div`
  position: relative;
  width: 3rem;
  /* margin-right: -0.5rem; */
  cursor: pointer;
  img {
    width: 100%;
    animation: ${props =>
      props.state
        ? css`
            ${animationSwing} 0.1s alternate infinite
          `
        : "none"};
  }

  :after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 0.7rem;
    height: 0.7rem;
    background: ${colors.orangeDeep};
    border-radius: 50%;
    display: ${props => (props.state ? "block" : "none")};
  }
`;

export const NotiList = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: 25rem;
  ${boxStyle}
  box-shadow: 0 -2px 10px 1px rgba(0,0,0,0.1);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s;
  &.active {
    overflow: inherit;
    max-height: 30rem;
  }
  &.active:before {
    display: block;
  }
  &:before {
    content: "";
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -12px;
    width: 0;
    height: 0;
    border-bottom: 6px solid #fff;
    border-top: 6px solid transparent;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;
export const NotiItemWrap = styled.div`
  padding: 2rem 1.5rem;
  max-height: 0;
  transition: max-height 0.2s;
  &.active {
    overflow-y: auto;
    max-height: 25rem;
  }
`;
export const NotiItem = styled.div`
  position: relative;
  border-bottom: 1px dashed ${colors.grayBar};
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  :last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    font-size: 0;
    width: 1.7rem;
    opacity: 0.5;
    img {
      width: 100%;
    }

    :hover {
      opacity: 1;
    }
  }
  .noti-kid {
    color: #999999;
    margin-bottom: 0.25rem;
    font-size: 1.2rem;
  }
  .noti-title {
    font-size: 1.3rem;
    font-weight: 500;
    ${ellipsis.line2}
    span {
      padding-right: 0.5rem;
    }
  }
`;
export const EmptyList = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;
