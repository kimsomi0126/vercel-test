import { Flex, Input, List, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getList } from "../../api/notice/notice_api";
import { PageTitle } from "../../styles/basic";
import { GreenBtn } from "../../styles/ui/buttons";
import useCustomLogin from "../../hooks/useCustomLogin";
import { AlbumTopBar, SearchBar } from "../../styles/album/album";
import { PageNum, UserTopRight } from "../../styles/adminstyle/guardianlist";
import {
  ListWrap,
  NoticeDate,
  NoticeIcon,
  NoticeItem,
  NoticeTitle,
  NoticeWrap,
} from "../../styles/notice/notice";

const { Search } = Input;

const pageSize = 10;

const NoticeList = () => {
  const navigate = useNavigate();
  const [fixedNotices, setFixedNotices] = useState([]);
  const [normalNotices, setNormalNotices] = useState([]);
  const [current, setCurrent] = useState(1);
  const [listData, setListData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { isLogin } = useCustomLogin();

  const onChange = page => {
    setCurrent(page);
    fetchPageData(page);
  };

  const handleSearch = value => {
    // 검색어가 변경될 때 현재 페이지를 1페이지로 초기화하고 fetchPageData를 호출합니다.
    setCurrent(1);
    fetchPageData(1, value);
  };

  const fetchPageData = async (page, search = "") => {
    try {
      const result = await getList({
        page,
        search,
        successFn: result => {
          setListData(result.list);
          setTotalCount(result.noticeCnt);
          const fixed = result.list.filter(item => item.fullNoticeFix === 1);
          const normal = result.list.filter(item => item.fullNoticeFix !== 1);
          setFixedNotices(fixed);
          setNormalNotices(normal);
        },
        failFn: result => {
          console.error("List fetch failed:", result);
        },
        errorFn: result => {
          console.error("Error fetching list:", result);
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPageData(current);
  }, [current]);

  return (
    <NoticeWrap>
      <AlbumTopBar>
        <PageTitle>유치원 소식</PageTitle>
        <SearchBar>
          <UserTopRight>
            <Search
              placeholder="제목을 입력하세요."
              size={"large"}
              allowClear
              onSearch={handleSearch}
            />
            {isLogin ? (
              <GreenBtn onClick={e => navigate("write")}>글쓰기</GreenBtn>
            ) : null}
          </UserTopRight>
        </SearchBar>
      </AlbumTopBar>

      <ListWrap
        size="large"
        itemLayout="vertical"
        dataSource={listData}
        renderItem={(item, index) => (
          <List.Item>
            <NoticeItem
              to={`/notice/details/${item.ifullNotice}`}
              key={item.ifullNotice}
              className={item.fullNoticeFix === 1 ? "notice" : ""}
            >
              <NoticeIcon>
                {item.fullNoticeFix === 1 ? (
                  <img
                    src="/images/common/notice/loudSpeaker.svg"
                    alt="고정글"
                  />
                ) : (
                  <span>{item.ifullNotice}</span>
                )}
              </NoticeIcon>
              <NoticeTitle>{item.fullTitle}</NoticeTitle>
              <NoticeDate>
                <img src="/images/common/notice/clock.svg" alt="시계아이콘" />
                {item.createdAt.substring(0, 10)}
              </NoticeDate>
            </NoticeItem>
          </List.Item>
        )}
      />
      <PageNum>
        <Pagination
          current={current}
          onChange={onChange}
          total={totalCount}
          pageSize={pageSize}
        />
      </PageNum>
    </NoticeWrap>
  );
};

export default NoticeList;
