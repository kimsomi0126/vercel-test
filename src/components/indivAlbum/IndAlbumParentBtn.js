import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const IndAlbumParentBtn = ({ indList, ikidList, year, ikid }) => {
  // 년도 선택
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const yearArr = [];
  for (let yearNum = startYear; yearNum <= currentYear; yearNum++) {
    yearArr.push({
      key: yearNum.toString(),
      label: (
        <Link to={`/ind/album/?year=${yearNum}&page=1&ikid=${ikid}`}>
          {yearNum}
        </Link>
      ),
    });
  }
  // 아이 선택
  const items =
    Array.isArray(ikidList) &&
    ikidList.map(item => {
      return {
        key: item.ikid.toString(),
        label: (
          <Link to={`/ind/album/?year=${year}&page=1&ikid=${item.ikid}`}>
            {item.kidNm}
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
      <Dropdown menu={{ items }}>
        <Button>
          {ikidList[0].kidNm}
          <DownOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default IndAlbumParentBtn;
