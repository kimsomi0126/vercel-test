import styled from "@emotion/styled";
import { colors, mq, shadow } from "../basic";
import { Button, Modal, Space } from "antd";
// 버튼 기본 스타일 정의
const defaultBtnStyle = {
  fontSize: "1.8rem",
  fontFamily: `"KOTRAHOPE", "Pretendard", sans-serif`,
  background: "#fff",
  border: 0,
  padding: "1rem 1.5rem",
  borderRadius: "1rem",
  cursor: "pointer",
  minWidth: "8rem",
};

// 버튼 마우스오버 효과
const buttonHover = {
  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
};

export const BtnWrap = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
  /* 오른쪽 정렬 */
  ${props => (props.right ? `justify-content: flex-end` : null)};
  /* 가운데 정렬 */
  ${props => (props.center ? `justify-content: center` : null)};
`;

// 색상 별 버튼 style
export const GreenBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.greenLight};
  color: ${colors.greenDeep};
  transition: 0.2s;
  :hover {
    ${buttonHover}
  }
`;
export const OrangeBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.orangeLight};
  color: ${colors.orangeDeep};
  transition: 0.2s;
  :hover {
    ${buttonHover}
  }
`;
export const PinkBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.pinkLight};
  color: ${colors.pinkDeep};
  :hover {
    ${buttonHover}
  }
`;

export const BlueBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.blueLight};
  color: ${colors.blueDeep};
  transition: 0.2s;
  :hover {
    ${buttonHover}
  }
`;
export const RedBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.redLight};
  color: ${colors.redDeep};
  transition: 0.2s;
  :hover {
    ${buttonHover}
  }
`;
export const PurpleBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.purpleLight};
  color: ${colors.purpleDeep};
  transition: 0.2s;
  :hover {
    ${buttonHover}
  }
`;
export const GrayBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.grayLight};
  color: ${colors.grayDeep};
  transition: 0.2s;
  :hover {
    ${shadow}
  }
`;
export const BlackBtn = styled.button`
  ${defaultBtnStyle}
  background: ${colors.grayDeep};
  color: ${colors.white};
  transition: 0.1s;
  :hover {
    ${buttonHover}
  }
`;

// 메인 배너 버튼
export const MainPinkBtn = styled.button`
  ${defaultBtnStyle}
  background: #ffadc7;
  color: #fe77a2;
  transition: 0.1s;
  :hover {
    ${buttonHover}
  }
`;

export const MainBrownBtn = styled.button`
  ${defaultBtnStyle}
  background: #ffcc58;
  color: #db8400;
  transition: 0.1s;
  :hover {
    ${buttonHover}
  }
`;

// 메뉴 접기 버튼
export const AllBtn = styled.button`
  ${defaultBtnStyle}
  position: absolute;
  right: -2.5rem;
  top: 2.5rem;
  padding: 1rem 0.5rem;
  font-size: 1.6rem;
  border-radius: 0 0.5rem 0.5rem 0;
  min-width: auto;
  width: 2.5rem;
  height: 7rem;
  background: ${colors.greenLight};
  color: ${colors.greenDeep};
  z-index: 11;
  word-break: break-all;
  line-height: 1;
  ${mq.mobileBig} {
    top: 0.5rem;
    padding: 0.5rem;
    height: 6rem;
  }
`;

export const StyledeleteModal = styled(Modal)`
  ant-btn {
    color: red;
  }
`;
