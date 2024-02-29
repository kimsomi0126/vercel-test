import styled from "@emotion/styled";
import { colors } from "../basic";

// 경고창
export const WarningWrap = styled.div`
  position: fixed;
  left: -300%;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999999;
`;

export const WarningBox = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 3rem;
  text-align: center;
  border-radius: 1rem;
  h5 {
    font-weight: 400;
    font-size: 1.4rem;
    margin: 1rem 0;
  }
  p {
    font-weight: 200;
    font-size: 1.2rem;
    color: #555;
  }
`;

// 모달창
export const ModalTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  h3 {
    color: ${colors.greenDeep};
    margin-bottom: 1rem;
  }
  white-space: pre-line;
`;
export const ModalBody = styled.div`
  position: relative;
`;
