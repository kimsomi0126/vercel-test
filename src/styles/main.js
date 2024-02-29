import styled from "@emotion/styled";
import { ConfigProvider } from "antd";
import { colors } from "./basic";

const configCalender = {
  token: {
    colorSplit: "none",
  },
  components: {
    Calendar: {
      controlItemBgActive: "none",
    },
    Button: {
      textHoverBg: "none",
    },
    Drawer: {
      textHoverBg: "rgba(0, 0, 0, 0.06)",
    },
  },
};

export const ConfigCalender = ({ children }) => (
  <ConfigProvider theme={configCalender}>{children}</ConfigProvider>
);

// 메인

export const MainWrap = styled.main`
  position: relative;
  * {
    font-family: "Hahmlet", "Noto Sans KR", "Segoe UI", Tahoma, Geneva, Verdana,
      sans-serif;
  }
  .ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date {
    height: 80px !important;
  }
  .ant-picker-calendar.ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-body {
    font-size: 1.2rem;
  }
  .ant-picker-calendar.ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-body
    th {
    padding: 15px 0;
    text-align: center !important;
  }
  .ant-picker-calendar.ant-picker-calendar-full
    .ant-picker-panel
    .ant-picker-body
    td {
    padding: 0;
    text-align: center !important;
  }

  .list-item {
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .list-item:hover {
    background-color: #f0f0f0; /* 원하는 hover 시 배경색 */
  }

  .list-item:active {
    background-color: #d9d9d9; /* 원하는 click 시 배경색 */
  }

  .list-item:hover .list-button,
  .list-item:active .list-button {
    background-color: #1890ff; /* 원하는 hover 및 click 시 배경색 */
    color: #fff; /* 원하는 hover 및 click 시 텍스트 색상 */
  }

  :where(.css-dev-only-do-not-override-x4zgyu).ant-drawer .ant-drawer-body {
    padding: 0 24px;
  }

  .ant-picker-cell-today {
    border: 1px solid #273f7c;
  }

  .ant-picker-calendar-date-content {
    height: 60px;
  }
  .ant-picker-calendar.ant-picker-calendar-full
    .ant-picker-calendar-date-content {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    left: 0;
    top: 0;
  }
`;

// 이미지 우측 하단 일정 갯수
export const CircleBadge = ({ count }) => (
  <div
    style={{
      position: "absolute",
      bottom: "5px",
      right: 0,
      width: "2rem",
      height: "2rem",
      background: "rgba(39, 63, 124, 0.6)",
      color: "#fff",
      fontSize: "1.2rem",
      borderRadius: "50%",
      lineHeight: "2rem",
      textAlign: "center",
    }}
  >
    {count}
  </div>
);

// 일정 이미지 배경 설정
export const CellStyle = ({ dateString, result }) => (
  <style>
    {`
      .ant-picker-cell[title="${dateString}"] {
        background-image: url(${result ? `"${result.pic}"` : ""});
        background-size: cover;
        background-repeat: no-repeat;
      }
    `}
  </style>
);

//

export const DrawerWrap = styled.div`
  .ant-drawer-wrapper-body,
  .ant-list-item-meta-title,
  .ant-list-item-meta-description,
  .liste-item-button {
    font-family: "Hahmlet", "Noto Sans KR", "Segoe UI", Tahoma, Geneva, Verdana,
      sans-serif;
  }
  .list-item {
    transition: background-color 0.3s;
    cursor: pointer;
  }

  .list-item:hover {
    background-color: #fff; /* 원하는 hover 시 배경색 */
  }

  .list-item:active {
    background-color: #d9d9d9; /* 원하는 click 시 배경색 */
  }
  .ant-pagination {
    padding-bottom: 24px;
  }
  .ant-drawer-body {
    padding: 0 24px;
  }
  /* 메인 날짜리스트 */
  .ant-list .ant-list-pagination {
    margin-top: 10px !important;
  }
  .ant-list-split .ant-list-item {
    border: 1px solid ${colors.secondary} !important;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 0 !important;
    overflow: hidden;
    transition: 0.2s;
  }
  .ant-list-split .ant-list-item:hover {
    border-color: ${colors.point} !important;
  }
  .ant-list-split .ant-list-item:hover .liste-item-button {
    background: ${colors.point} !important;
    color: #fff;
  }
  .liste-item-button {
    width: 50px;
    height: 50px;
    margin-right: 15px;
    font-size: 10px;
    font-weight: 300;
    border-radius: 50%;
    color: #555555;
    background-color: #f7f7f7;
    padding: 0 !important;
  }
  .ant-drawer-title {
    font-weight: 400 !important;
  }
  .ant-list-item-meta-title {
    font-weight: 500;
  }

  .ant-avatar-lg {
    width: 63px;
    height: 88px;
    border-radius: 0;
    margin: -1px 0 0 -1px;
  }
  .ant-list-item-meta {
    align-items: center !important;
  }
  .ant-pagination .ant-pagination-item {
    border-radius: 50% !important;
  }

  .ant-pagination .ant-pagination-item-active {
    border-color: ${colors.point} !important;
    a {
      color: ${colors.point} !important;
    }
  }
  .ant-list .ant-list-item .ant-list-item-meta .ant-list-item-meta-description {
    color: ${colors.gray} !important;
    font-size: 1.2rem !important;
  }
`;
