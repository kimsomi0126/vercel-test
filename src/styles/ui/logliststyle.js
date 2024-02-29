import styled from "@emotion/styled";
import { colors } from "../basic";

export const LogTotal = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 12px;
  font-weight: 400;
  border-bottom: 1px solid ${colors.secondary};
  em {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const LogListWrap = styled.ul`
  margin-top: 10px;
  width: 100%;
  max-height: 58vh;
  overflow-y: auto;
`;
export const LogItem = styled.li`
  height: 90px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.secondary};
  background: ${colors.main};
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    border-radius: 5px;
    border: 1px solid ${colors.point};
    background: ${colors.main};
    button {
      background-color: ${colors.point};
      color: ${colors.main};
    }
  }
`;
export const LogItemImg = styled.div`
  position: relative;
  width: 63px;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px 0px 0px 5px;
  background: #000;
  img {
    width: auto;
    height: 100%;
    border-radius: 5px 0px 0px 5px;
  }
  img.on {
    opacity: 0.5;
  }
  span {
    position: absolute;
    white-space: nowrap;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    font-weight: 400;
    color: ${colors.main};
  }
`;
export const LogText = styled.div`
  width: 186px;
  margin-right: auto;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  span {
    color: ${colors.gray};
    font-size: 12px;
    font-weight: 300;
  }
`;
export const LogMore = styled.div`
  button {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    font-size: 10px;
    font-weight: 300;
    border-radius: 50%;

    color: ${colors.gray};
    background-color: ${colors.tab};
  }
`;
