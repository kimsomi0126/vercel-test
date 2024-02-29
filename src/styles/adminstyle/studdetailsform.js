import styled from "@emotion/styled";
import { colors, fonts, shadow } from "../basic";

export const StudDetailWrap = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const DetailFormTable = styled.div`
  position: relative;
`;

export const DetailPhysicalTable = styled.div`
  position: relative;
  .ant-form-item-explain-error {
    font-size: 1.2rem;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  td {
    padding: 0.5rem !important;
  }
`;
export const KeywordTable = styled.div`
  position: relative;
  .ant-form-item-explain-error {
    font-size: 1.2rem;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  td {
    padding: 1rem 0.5rem !important;
  }
`;

export const StudDetailsFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
