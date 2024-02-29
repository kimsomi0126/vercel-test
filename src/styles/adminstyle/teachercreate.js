import styled from "@emotion/styled";
import { colors } from "../basic";

export const TeacherFormTop = styled.div`
  margin-top: 1rem;
`;

export const TeacherFormWrap = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  border-top: 2px solid ${colors.greenDeep};
  border-bottom: 2px solid ${colors.greenDeep};
  background-color: #fafafa;
  .ant-form-item {
    margin-bottom: 1.5rem;
  }
`;

export const TeacherIdInfo = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const TeacherIdForm = styled.div`
  margin-top: 1rem;
  gap: 1rem;
`;

export const TeacherIdItem = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  button {
    padding: 1rem 1rem;
    height: 3.5rem;
    font-size: 1.6rem;
    font-family: KOTRAHOPE, Pretendard, sans-serif;
    background: ${colors.orangeLight};
    color: ${colors.orangeDeep};
    border-radius: 1rem;
  }
`;
export const NewPasswordEdit = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const TeacherClassInfo = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const TeacherClassForm = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export const TeacherImg = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const TeacherImgForm = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TeacherMemo = styled.div`
  padding-bottom: 1rem;
  p {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${colors.greenDeep};
  }
`;

export const TeacherMemoForm = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const TBottomBt = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;
