import React, { useState } from "react";
import MyClass from "../user/MyClass";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import { IMG_URL } from "../../api/config";
const path = `${IMG_URL}/pic/memory`;
import {
  IndBot,
  IndCon,
  IndIcon,
  IndList,
  IndListBox,
  IndListWrap,
  IndName,
  IndTitle,
  IndTop,
} from "../../styles/individualNotice/ind";

import {
  IndAlbum,
  IndAlbumOver,
  ImageWrapper,
} from "../../styles/individualAlbum/indalbum";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const ReadAllIndAlbum = ({ listData, year, ikid, iclass, page }) => {
  console.log("listData", listData);
  // const src =
  //   Array.isArray(listData) && listData.map((item, index) => item.memoryPic);

  const { loginState, isLogin, isParentLogin } = useCustomLogin();

  return (
    <IndListWrap>
      <IndList>
        {Array.isArray(listData) && listData[0].inotice === 0 ? (
          <div
            style={{ textAlign: "center", width: "100%", marginTop: "5rem" }}
          >
            알림장 내용이 없습니다.
          </div>
        ) : (
          Array.isArray(listData) &&
          listData.map((item, index) => (
            <IndListBox key={item.inotice}>
              <Link
                to={
                  isLogin
                    ? `/ind/album/details/${item.imemory}?year=${year}&page=${page}&iclass=${iclass}`
                    : `/ind/album/details/${item.imemory}?year=${year}&page=${page}&ikid=${ikid}`
                }
              >
                <IndTop>
                  <IndName>{item.kidNm}</IndName>
                  <IndTitle>
                    {item.noticeCheck === 1 ? (
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/common/warning_icon.svg"
                        }
                        alt="file"
                      />
                    ) : null}
                    <span>{item.createdAt.substring(0, 10)}</span>
                    <b>{item.memoryTitle}</b>
                  </IndTitle>
                  <IndIcon>
                    {item.memoryComments.length >= 1 ? (
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/common/chat_icon.svg"
                        }
                        alt="file"
                      />
                    ) : null}
                  </IndIcon>
                </IndTop>
                <IndCon>
                  <span>{item.memoryContents}</span>
                </IndCon>
                <IndAlbum>
                  <ImageWrapper>
                    {item.memoryPic.slice(0, 5).map((pic, idx) => (
                      <Image
                        key={idx}
                        width={50}
                        src={`${IMG_URL}/pic/memory/${item.imemory}/${pic}`}
                        preview={false}
                      />
                    ))}
                    {item.memoryPic.length > 5 ? (
                      <IndAlbumOver>+{item.memoryPic.length - 5}</IndAlbumOver>
                    ) : null}
                  </ImageWrapper>
                </IndAlbum>
              </Link>
            </IndListBox>
          ))
        )}
      </IndList>
    </IndListWrap>
  );
};

export default ReadAllIndAlbum;
