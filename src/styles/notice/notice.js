import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { colors, mq } from "../basic";
import { List } from "antd";

export const NoticeWrap = styled.div`
  position: relative;
  .ant-list-lg .ant-list-item {
    padding: 0;
  }
`;
export const ListWrap = styled(List)`
  border: 2px solid ${colors.greenDeep};
  border-width: 2px 0;
  background: ${colors.white};
`;

export const NoticeItem = styled(Link)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  &.notice {
    background: ${colors.greenLight2};
    border-top: 1px solid rgba(5, 5, 5, 0.06);
    p {
      color: ${colors.greenDeep};
      font-weight: 600;
    }
  }
  img {
    height: 2.5rem;
  }
`;

export const NoticeIcon = styled.div`
  position: relative;
  width: 3rem;
  ${mq.mobileBig} {
    display: none;
  }
`;

export const NoticeTitle = styled.p`
  position: relative;
  width: calc(100% - 25rem);
  ${mq.mobileBig} {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

export const NoticeDate = styled.div`
  position: relative;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.grayDeep};
  img {
    height: 2rem;
  }
`;

export const NoticeGallery = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  margin-top: 2rem;
`;
