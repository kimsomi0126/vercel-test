import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const IndAlbumTeacherBtn = ({ iclass, year, ikid, page }) => {
  const { isAdminLogin } = useCustomLogin();
  // 년도 선택
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const yearArr = [];
  for (let yearNum = startYear; yearNum <= currentYear; yearNum++) {
    yearArr.push({
      key: yearNum.toString(),
      label: (
        <Link to={`/ind/album/?year=${yearNum}&page=1&iclass=${iclass}`}>
          {yearNum}
        </Link>
      ),
    });
  }

  // 반 선택
  const classArr = [
    { iclass: 0, classNm: "반 전체" },
    { iclass: 1, classNm: "무궁화반" },
    { iclass: 2, classNm: "해바라기반" },
    { iclass: 3, classNm: "장미반" },
  ];

  const items =
    Array.isArray(classArr) &&
    classArr.map(item => {
      return {
        key: item.iclass.toString(),
        label: (
          <Link to={`/ind/album/?year=${year}&page=1&iclass=${item.iclass}`}>
            {item.classNm}
          </Link>
        ),
      };
    });

  return (
    <>
      <Dropdown menu={{ items: yearArr }}>
        <Button>
          {year}
          <DownOutlined />
        </Button>
      </Dropdown>
      {isAdminLogin ? (
        <Dropdown menu={{ items }}>
          <Button>
            {iclass === "0"
              ? "반 전체"
              : iclass === "1"
              ? "무궁화반"
              : iclass === "2"
              ? "해바라기반"
              : iclass === "3"
              ? "장미반"
              : null}
            <DownOutlined />
          </Button>
        </Dropdown>
      ) : null}
    </>
  );
};

export default IndAlbumTeacherBtn;
