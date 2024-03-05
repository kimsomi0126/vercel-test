import styled from "@emotion/styled";
import { boxStyle, colors, fonts, mq, shadow } from "../basic";

export const MypageWrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30rem;
  ${mq.mobileBig} {
    margin-bottom: 10rem;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${mq.mobileBig} {
    width: 100%;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
`;

// table 스타일
export const TableWrap = styled.div`
  position: relative;
  table {
    border-radius: 1rem;
    overflow: hidden;
    border-spacing: 0px;
    ${shadow}
    background: ${colors.white};
  }
  tbody th {
    border: 1px solid ${colors.grayLight};
    border-width: 0 0 1px 1px;
  }
  th {
    padding: 1.5rem;
    background: ${colors.greenLight2};
    color: ${colors.greenDeep};
    border-left: 1px solid ${colors.grayLight};
    font-family: ${fonts.kotraHope};
    font-size: 1.8rem;
    &:first-of-type {
      border-left: 0;
    }
    img {
      width: 3.5rem;
      margin-right: 1rem;
    }
  }
  &.th_left th {
    text-align: left;
  }
  td {
    text-align: center;
    font-size: 1.5rem;
    padding: 1rem 0;
    border: 1px solid ${colors.grayLight};
    border-width: 0 0 1px 1px;
    &:first-of-type {
      border-left: 0;
    }
    > span {
      color: ${colors.grayDeep};
    }
  }
  tbody tr:last-of-type th,
  tbody tr:last-of-type td {
    border-bottom: 0;
  }

  ${mq.mobileBig} {
    img {
      display: none;
    }
    &.vertical table {
      display: block;
      text-align: left;
      thead,
      tbody,
      th,
      td,
      tr {
        display: block;
        text-align: left;
        width: 100%;
      }
      thead {
        display: none;
      }
      tr {
        border-bottom: 1px solid ${colors.grayBar};
        :last-of-type {
          border-bottom: 0;
          td {
            border-bottom: 1px solid ${colors.grayLight};
            :last-child {
              border: 0;
            }
          }
        }
      }
      td {
        border: 0;
        padding: 0;
        border-bottom: 1px solid ${colors.grayLight};
        :before {
          content: attr(data-name);
          display: inline-block;
          min-width: 5rem;
          margin-right: 2rem;
          padding: 1rem 5%;
          height: 100%;
          background: ${colors.greenLight2};
          font-family: ${fonts.kotraHope};
          color: ${colors.greenDeep};
          font-size: 1.8rem;
        }
        :last-child {
          border: 0;
        }
        :last-child::before {
          padding: 2rem 5%;
        }
      }
    }

    &.th_left {
      table,
      tr,
      th,
      tbody,
      td {
        display: block;
      }
      tbody {
        width: 100%;
        display: flex;
      }
      th {
        text-align: center;
      }
      tr {
        width: ${props => (props.col3 ? "33.33%" : "100%")};
      }
      th,
      td,
      tbody tr:last-of-type th,
      tbody tr:last-of-type td {
        border-left: 1px solid ${colors.grayLight};
        border-bottom: 1px solid ${colors.grayLight};
      }
      tbody tr td:last-child {
        border-bottom: 0;
      }
    }
    .ant-form-item {
      margin-bottom: 0 !important;
    }
  }
`;

// 페이지 타이틀 영역
export const TitleWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  ${mq.mobileBig} {
    flex-wrap: wrap;
    &.ind-btn-wrap {
      flex-direction: column-reverse;
      align-items: start;
      .ant-input-group-wrapper {
        width: calc(100% - 24rem);
      }
      .btn {
        margin-left: auto;
      }
    }
  }
`;

// 마이페이지 내용
export const MyContentWrap = styled.div`
  position: relative;
`;

// 원생 프로필
export const ProfileWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 6rem;
  margin-bottom: 3rem;
  background: ${colors.white};
  ${shadow}
  border-radius: 1rem;
  overflow: hidden;

  ${mq.mobileBig} {
    flex-wrap: wrap;
    padding: 2.5rem 3%;
    margin-bottom: 1rem;
  }
`;

export const ProfileImg = styled.div`
  width: 25%;
  margin-right: 5%;
  overflow: hidden;
  text-align: center;
  img {
    width: 100%;
    max-width: 20rem;
    border-radius: 50%;
  }

  ${mq.mobileBig} {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
export const ProfileInfo = styled.div`
  position: relative;
  width: 70%;
  dl {
    display: flex;
    font-size: 1.6rem;
    dt {
      color: ${colors.grayDeep};
      margin-right: 3rem;
    }
  }

  ${mq.mobileBig} {
    width: 100%;
    dl {
      flex-wrap: wrap;
    }
    dt {
      width: 100%;
    }
  }
`;
export const MyClassWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
  border-color: ${props =>
    props.state === 1
      ? "#ff73a1"
      : props.state === 2
      ? colors.orangeDeep
      : props.state === 3
      ? "#f5062c"
      : props.state === -1
      ? colors.grayDeep
      : props.state === -2
      ? colors.black
      : colors.grayLight};
`;
export const IdentCodeWrap = styled.div`
  display: flex;
  align-items: center;
  dl {
    margin-right: 2rem;
  }
  ${mq.mobileBig} {
    dl {
      margin-right: 0;
      max-width: 11rem;
    }
  }
`;
export const MyInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  dl {
    margin-right: 10rem;
    margin-top: 2rem;
  }
  ${mq.mobileBig} {
    dl {
      min-width: 30%;
      margin-right: 0;
    }
  }
`;
export const AdminMemo = styled.dl`
  padding: 2rem 3rem;
  font-size: 1.5rem;
  margin-bottom: 3rem;
  ${boxStyle}
  dt {
    color: ${colors.grayDeep};
    margin-bottom: 1rem;
  }

  ${mq.mobileBig} {
    margin-bottom: 2rem;
  }
`;

// 연결계정
export const AccountInfo = styled.div`
  position: relative;
  margin-top: 3rem;
  ${mq.mobileBig} {
    margin-top: 1rem;
  }
`;

// 상세정보
export const DetailInfo = styled.div``;

// 상세정보 - 신체정보
export const DetailPhysical = styled.div``;

// 상세정보 - 칭찬뱃지
export const DetailBadge = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3rem;
  ${mq.mobileBig} {
    margin-top: 2rem;
  }
`;
export const BadgeItem = styled.div`
  width: 24%;
  text-align: center;
  padding: 3rem;
  font-size: 1.5rem;
  ${boxStyle}
  img {
    max-width: 100%;
  }
  h3 {
    margin: 1rem 0;
  }
  ${mq.mobileBig} {
    width: 49%;
    margin-bottom: 2rem;
  }
`;
