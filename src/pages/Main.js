import React, { useEffect, useState } from "react";
import { Avatar, Button, Calendar, Drawer, List } from "antd";
import "dayjs/locale/ko";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ko_KR";
import { Link, useNavigate } from "react-router-dom";
import { getDayMedia, getMediaAll } from "../api/culutrelog_api";
import {
  CellStyle,
  CircleBadge,
  ConfigCalender,
  DrawerWrap,
  MainWrap,
} from "../styles/main";

const Main = ({ loginCheck, iuser }) => {
  const navigate = useNavigate();
  // 패널 변경시 오늘의 연/월일
  const [ym, setYm] = useState(dayjs().format("YYYY-MM"));

  // getMediaAll을 통해 메인페이지 json 정보를 담기 위한 변수
  const [mainInfo, getMainInfo] = useState([]);

  // 패널 변경시 변경된 날짜 데이터를 담을 변수.
  // 서버에서 데이터를 가져온 후
  const [panelDate, setPanelDate] = useState(dayjs().format("YYYY-MM"));

  //Drawer open 처리를 위한 변수
  const [open, setOpen] = useState(false);

  // List에 담아줄 데이터 변수 - 현재 listMedia는 빈 배열
  const [listMedia, setListMedia] = useState([]);

  // 선택한 날짜. ex 2023-12-22
  const [findFullDate, setFindFullDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  // 캘린더 json과 연동해 첫 이미지 표시하는 기능.
  const dateCellRender = value => {
    const dateString = value.format("YYYY-MM-DD");
    const result = mainInfo.find(item => item.date === dateString);
    return (
      <div
        style={{ width: "100%", height: "100%", background: "none" }}
        onClick={() => {
          handleClickShowDrawWin(dateString);
        }}
      >
        {result && result.mediaCnt > 1 ? (
          <CircleBadge count={result.mediaCnt} />
        ) : null}
        <CellStyle dateString={dateString} result={result} />
      </div>
    );
  };

  // 하단 Drawer 영역
  const handleSelect = async value => {
    const dateString = value.format("YYYY-MM-DD");
    setFindFullDate(dateString);
  };

  const handleClickShowDrawWin = dateString => {
    getDayMedia(iuser, dateString, successGetDayMedia);
  };

  const successGetDayMedia = resData => {
    setListMedia(resData);
    if (resData.length !== 0) {
      setOpen(true);
    } else {
      setOpen(false);
      navigate(`/culturelog/write`);
    }
  };

  // findFullDate와 listMedia를 의존성으로 추가
  useEffect(() => {}, [listMedia]);

  // Drawer 닫기 핸들러
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const DrawerContent = ({ onCloseDrawer }) => (
    <Drawer
      title={<>기록을 선택해주세요!</>}
      placement="bottom"
      closable={true}
      onClose={onCloseDrawer}
      open={open}
      getContainer={false}
      height="60vh"
    >
      {listMedia ? (
        <List
          key={listMedia.imedia}
          itemLayout="horizontal"
          dataSource={listMedia}
          pagination={{ position: "top", align: "center", pageSize: 3 }}
          renderItem={(item, index) => (
            <Link to={`culturelog/view/${item.imedia}?iuser=${iuser}`}>
              <List.Item
                extra={
                  <Button className="liste-item-button" type="text">
                    More
                  </Button>
                }
                className="list-item"
                key={index}
              >
                <List.Item.Meta
                  avatar={<Avatar shape="square" size="large" src={item.pic} />}
                  title={item.title}
                  description={item.date}
                />
              </List.Item>
            </Link>
          )}
        />
      ) : (
        <></>
      )}
    </Drawer>
  );

  const decrementMonth = value => {
    return value.subtract(1, "month");
  };
  const incrementMonth = value => {
    return value.add(1, "month");
  };

  const handleCalendarChange = (direction, value) => {
    if (direction === "prev") {
      return decrementMonth(value);
    } else if (direction === "next") {
      return incrementMonth(value);
    }
  };

  const renderCalendarHeader = ({ value, onChange }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "30px 0px 15px",
      }}
    >
      <Button
        onClick={() => onChange(handleCalendarChange("prev", value))}
        icon={
          <img
            src={process.env.PUBLIC_URL + "/images/slide_btn_prev.svg"}
            alt="이전"
          />
        }
        shape="circle"
        size="small"
        style={{ border: 0 }}
      />
      <div style={{ fontSize: "16px", margin: "0 16px" }}>
        {panelDate ? panelDate : dayjs(value).format("YYYY년 MM월")}
      </div>
      <Button
        onClick={() => onChange(handleCalendarChange("next", value))}
        icon={
          <img
            src={process.env.PUBLIC_URL + "/images/slide_btn_next.svg"}
            alt="다음"
          />
        }
        shape="circle"
        size="small"
        style={{ border: 0 }}
      />
    </div>
  );
  // 캘린더 영역
  useEffect(() => {
    setPanelDate(dayjs().format("YYYY년 MM월"));
  }, []);

  const onPanelChange = (value, mode) => {
    // 패널 변경 시 date 상태 업데이트
    setPanelDate(value.format("YYYY년 MM월"));
    setYm(value.format("YYYY-MM"));
    setOpen(false);
  };

  useEffect(() => {
    loginCheck();
    // 오늘의 년/월일 과 차이가 있으면 panelDate를 다시 전달.
    getMediaAll(ym, iuser, getMainInfo);
  }, [panelDate]);

  return (
    <>
      <ConfigCalender>
        <Header sub={false}>Culture Log</Header>
        <MainWrap>
          <Calendar
            defaultValue={dayjs()}
            onPanelChange={onPanelChange}
            locale={locale}
            cellRender={dateCellRender}
            headerRender={renderCalendarHeader}
            onSelect={handleSelect}
          />
        </MainWrap>
        <Footer></Footer>
        <DrawerWrap>
          <DrawerContent onCloseDrawer={handleCloseDrawer} />
        </DrawerWrap>
      </ConfigCalender>
    </>
  );
};

export default Main;
