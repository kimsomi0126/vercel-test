import React, { useEffect, useState } from "react";
import {
  MainContainer,
  MainFlexWrap,
  MainInner,
  MainLocation,
} from "../styles/main";
import MainAlbumComponent from "../components/main/MainAlbumComponent";
import { MainVisualComponent } from "../components/main/MainVisualComponent";
import { MainNoticeComponent } from "../components/main/MainNoticeComponent";
import MainBannerComponent from "../components/main/MainBannerComponent";
import MainPopComponent from "../components/main/MainPopComponent";
import { Outlet } from "react-router";
import { getMain } from "../api/mainApi";

const initdata = {
  albumMainVoList: [
    {
      ialbum: 0,
      albumTitle: "",
      albumContents: "",
      createdAt: "",
      albumPic: "",
    },
  ],
  fullNoticeVoList: [
    {
      fullTitle: "",
      writer: "",
      fullNoticeFix: 0,
      createdAt: "",
    },
  ],
};

const Main = () => {
  const [mainData, setMainData] = useState(initdata);
  useEffect(() => {
    getMain({ successFn, failFn, errorFn });
  }, [initdata]);

  const successFn = result => {
    setMainData(result);
  };
  const failFn = result => {
    // console.log(result);
  };
  const errorFn = result => {
    // console.log(result);
  };
  return (
    <MainInner>
      <MainContainer>
        {/* 비주얼 */}
        <MainVisualComponent />
        {/* 유치원소식 */}
        <MainNoticeComponent noticeDate={mainData.fullNoticeVoList} />
        {/* 활동앨범 */}
        <MainAlbumComponent albumDate={mainData.albumMainVoList} />
        {/* 배너 */}
        <MainBannerComponent />
        <MainFlexWrap>
          {/* 팝업존 */}
          <MainPopComponent />
          {/* 오시는길 */}
          <MainLocation to="/info/location">
            <Outlet />
          </MainLocation>
        </MainFlexWrap>
      </MainContainer>
    </MainInner>
  );
};

export default Main;
