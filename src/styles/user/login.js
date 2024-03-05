import styled from "@emotion/styled";
import { boxStyle, colors, mq } from "../basic";

export const FormWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  padding: 3rem 5rem;
  width: 90%;
  max-width: 45rem;
  ${boxStyle}
  background:#fafafa;
  border: 1px solid #f1f1f1;
  h3 {
    text-align: center;
    color: ${colors.greenDeep};
  }
  p {
    margin-top: 2rem;
    font-size: 1.4rem;
  }
  a {
    float: right;
    color: ${colors.grayDeep};
    &:hover {
      color: ${colors.black};
    }
  }
  .ant-form-item .ant-form-item-explain-error {
    font-size: 1.2rem;
  }
  .ant-radio-button-wrapper {
    font-size: 1.6rem;
    height: 4rem;
    line-height: 4rem;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
  .ant-radio-button-wrapper-checked:not(
      .ant-radio-button-wrapper-disabled
    ):hover {
    background: ${colors.greenDeep};
    border-color: ${colors.greenDeep};
  }
  .ant-radio-button-wrapper:hover {
    color: ${colors.greenDeep};
  }
  .ipt_box {
    position: relative;
    button {
      position: absolute;
      right: 0;
      top: 0;
      height: 3.2rem;
      line-height: 3.2rem;
      padding: 0;
      z-index: 9;
      border-radius: 0.5rem;
    }
  }

  ${mq.mobileBig} {
    padding: 2rem 5%;
    .ipt_box button {
      top: 0.2rem;
      height: 3.6rem;
      line-height: 3.6rem;
    }
    p {
      margin-top: 1rem;
    }
  }
`;

export const PrivacyWrap = styled.div`
  max-height: 30rem;
  overflow-y: auto;
  background: #fafafa;
  padding: 2rem;
  margin: 3rem 0;
  font-size: 1.3rem;
  div {
    margin-bottom: 1rem;
  }
`;
