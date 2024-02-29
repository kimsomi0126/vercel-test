import { css } from "@emotion/react";
import { colors, shadow } from "../basic";
import styled from "@emotion/styled";

export const SubmitBtn = css`
  margin-top: 2rem;
  width: 100%;
  height: 46px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e5e5;
    width: 100%;
    height: 100%;
    border-radius: 2.5rem;
    text-align: center;
    cursor: pointer;
    background-color: ${colors.point};
    color: ${colors.main};
  }
`;

export const BtnWrap = styled.div`
  position: relative;
  min-width: 300px;
  &.half {
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
    }
  }
  &.square {
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      width: 48%;
      border-radius: 5px;
    }
    &.wd100 button {
      width: 100%;
      border-radius: 5px;
    }
  }
`;

export const BlueBtn = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.point};
  color: ${colors.main};
  padding: 1rem 2.4rem;
  border-radius: 10rem;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  transition: 0.2s;

  ${shadow.light}
  &:hover {
    ${shadow.bold}
  }
`;
export const GrayBtn = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.secondary};
  color: ${colors.black};
  padding: 1rem 2.4rem;
  border-radius: 10rem;
  font-size: 1.4rem;
  font-weight: 200;
  text-align: center;
  transition: 0.2s;

  &:hover {
    ${shadow.bold}
  }
`;
export const RedBtn = styled.button`
  margin-top: 2rem;
  display: inline-block;
  background: ${colors.error};
  color: ${colors.main};
  padding: 1rem 2.4rem;
  border-radius: 10rem;
  font-size: 1.4rem;
  font-weight: 200;
  text-align: center;
  ${shadow.light}
  transition: 0.2s;

  &:hover {
    ${shadow.bold}
  }
`;
