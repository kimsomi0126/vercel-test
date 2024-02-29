import styled from "@emotion/styled";
import { colors, mq } from "../basic";

export const StudFormTop = styled.div`
  margin-top: 1rem;
`;

export const StudFormWrap = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  border-top: 2px solid ${colors.greenDeep};
  border-bottom: 2px solid ${colors.greenDeep};
  background-color: #fafafa;
  .ant-form-item {
    margin-bottom: 1.5rem;
  }
`;

export const BasicInfo = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const BasicInfoForm = styled.div`
  margin-top: 1rem;
  gap: 1rem;
`;

export const BasicInfoItem = styled.div`
  width: 100%;
  display: flex;
  gap: 2%;
  .ant-form-item {
    width: 32%;
  }
  ${mq.mobileBig} {
    flex-wrap: wrap;

    .ant-form-item {
      width: 100%;
    }
  }
`;
export const BasicInfoCode = styled.div`
  display: flex;
  gap: 2%;
  button {
    padding: 1rem 1rem;
    height: 3.2rem;
    font-size: 1.5rem;
    font-family: KOTRAHOPE, Pretendard, sans-serif;
    background: ${colors.orangeLight};
    color: ${colors.orangeDeep};
    border-radius: 1rem;
  }
`;
export const BasicInfoAdress = styled.div`
  display: flex;
  gap: 2%;

  .ant-form-item {
    width: 49%;
  }
  ${mq.mobileBig} {
    flex-wrap: wrap;
    .ant-form-item {
      width: 100%;
    }
  }
`;
export const ClassInfo = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const ClassInfoForm = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 2%;

  .ant-form-item {
    width: 32%;
  }

  ${mq.mobileBig} {
    .ant-form-item {
      width: 100%;
    }
  }
`;

export const ImgInfo = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const ImgInfoForm = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  max-width: 500px;
  align-items: center;
  .ant-upload-list .ant-upload-list-item {
    height: auto;
  }
  .ant-upload-list-item-name {
    word-break: break-all;
    white-space: inherit !important;
    font-size: 1.4rem;
  }
`;

export const PhoneInfo = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const PhoneInfoForm = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 2%;
  .ant-form-item {
    width: 49%;
  }

  ${mq.mobileBig} {
    flex-wrap: wrap;
    .ant-form-item {
      width: 100%;
    }
  }
`;

export const AdminMemo = styled.div`
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const AdminMemoForm = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const BottomBt = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;
