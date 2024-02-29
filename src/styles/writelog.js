import styled from "@emotion/styled";
import { colors } from "./basic";

export const ImgWrite = styled.div`
  padding-top: 2rem;
  font-size: 1.2rem;
  width: 100%;
`;
export const FileWrap = styled.div`
  padding-top: 2rem;
  width: 100%;
  display: flex;
  .icon-file {
    border-radius: 5px;
    margin: 0 auto;
    height: 10.2rem;
    background-color: #fafafa;
    border: 1px solid ${colors.secondary};
    width: 7.5rem;
    color: ${colors.secondary};
    font-size: 1.5rem;
  }
`;
export const ImgUrl = styled.div`
  padding-top: 2rem;
  .imgurl {
    margin-top: 20px;
    padding-left: 1rem;
    width: 100%;
    height: 38px;
  }
`;
export const DateDiary = styled.div`
  .date-wrap {
    padding-top: 2rem;
    width: 100%;
    margin: 0 auto;
    input {
      padding-left: 1rem;
      margin: 0 auto;
      width: 100%;
      height: 38px;
      position: relative;

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        right: 2px;
        top: 0;
        cursor: pointer;
        transform: translateY(10px);
        padding-left: 3000px;
        height: 100%;
      }
    }
  }
`;

export const Dropdown = styled.div`
  margin-top: 2rem;
  position: relative;

  ::after {
    content: "";
    background-image: url(${process.env.PUBLIC_URL + "/images/dropdown.svg"});
    width: 13px;
    height: 6px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .evaluate {
    color: gold;
    font-size: 1.5rem;
  }
  select {
    padding-left: 1rem;
    width: 100%;
    height: 38px;
    font-size: 1.3rem;
    border: 1px solid ${colors.secondary};
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 30px;
    cursor: pointer;
  }
`;
export const StarRate = styled.div`
  margin-top: 2rem;
`;

export const TextArea = styled.div`
  margin-top: 2rem;
`;
export const Loadicon = styled.div`
  margin-top: 2rem;
  width: 100%;
  height: 46px;
  font-size: 1.4rem;
  .londing {
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
export const BtDown = styled.div`
  .custom-dropdown {
    width: 100%;
    height: 36px;
    border: 1px solid ${colors.secondary};
    text-align: justify;
    border-radius: 0px;
    ::after {
      content: "";
      background-image: url(${process.env.PUBLIC_URL + "/images/dropdown.svg"});
      width: 13px;
      height: 6px;
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
    div {
      display: inline-block;
      margin-left: auto;
    }
  }
`;
