import Search from "antd/es/input/Search";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getListAll, getSearchListAll } from "../../api/album/album_api";
import { IMG_URL } from "../../api/config";
import Loading from "../../components/loading/Loading";
import useCustomLogin from "../../hooks/useCustomLogin";
import { UserTopRight } from "../../styles/adminstyle/guardianlist";
import {
  AlbumList,
  AlbumTopBar,
  AlbumWrap,
  SearchBar,
} from "../../styles/album/album";
import { PageTitle } from "../../styles/basic";
import { GreenBtn } from "../../styles/ui/buttons";
const path = `${IMG_URL}/pic/album`;
const ReadAllAlbum = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalAlbumCount, setTotalAlbumCount] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); // 검색어 상태 추가
  const loaderRef = useRef(null);
  const navigate = useNavigate();
  const { isLogin } = useCustomLogin();

  const loadImages = useCallback(async () => {
    if (
      loading ||
      (totalAlbumCount !== null && items.length >= totalAlbumCount)
    ) {
      return;
    }

    setLoading(true);

    const dataFetchFunction = search ? getSearchListAll : getListAll; // 검색어 유무에 따라 함수 결정

    dataFetchFunction({
      page,
      search,
      successFn: data => {
        setTotalAlbumCount(data.albumCnt);
        setItems(prevItems => [...prevItems, ...data.list]);
        setPage(prevPage => prevPage + 1);
        setHasMore(data.list.length > 0);
        setLoading(false);
      },
      failFn: message => {
        console.error(message);
        setLoading(false);
        setHasMore(false);
      },
      errorFn: data => {
        console.error(data);
        setLoading(false);
        setHasMore(false);
      },
    });
  }, [loading, totalAlbumCount, items, page, search]); // search 추가

  // 검색 기능 구현
  const handleSearch = value => {
    setSearch(value); // 검색어 설정
    setItems([]); // 기존 아이템 초기화
    setPage(1); // 페이지 초기화
    setHasMore(true); // 더 불러올 데이터가 있다고 가정
  };

  // Observer 설정
  const handleObserver = useCallback(
    entities => {
      const target = entities[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadImages();
      }
    },
    [loadImages, hasMore, loading],
  );

  // Observer 인스턴스 생성
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px", // 하단 감지 영역을 위로 올립니다.
      threshold: 0.5, // 필요에 따라 threshold 조정
    };
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <AlbumWrap>
      {/* 메인 콘텐츠 상단 바 컴포넌트 */}
      <AlbumTopBar>
        <PageTitle>활동앨범</PageTitle>
        <SearchBar>
          <UserTopRight>
            <Search
              placeholder="제목을 입력하세요."
              onSearch={handleSearch}
              size="large"
              allowClear
            />
            {isLogin && (
              <GreenBtn onClick={() => navigate("write")}>글쓰기</GreenBtn>
            )}
          </UserTopRight>
        </SearchBar>
      </AlbumTopBar>
      <AlbumList>
        {items.map(item => (
          <Link key={item.ialbum} to={`/album/details/${item.ialbum}`}>
            <ul className="image-grid">
              <li className="image-item">
                <img
                  // height={400}
                  src={`${path}/${item.ialbum}/${item.albumPic}`}
                  alt={item.albumTitle}
                />
              </li>
              <p>{item.albumTitle}</p>
            </ul>
          </Link>
        ))}
        {loading && <Loading className="loading" />}
        <div ref={loaderRef} style={{ height: "100px", margin: "20px" }}></div>
        {/* 무한 스크롤 로더 위치 변경 */}
      </AlbumList>
    </AlbumWrap>
  );
};

export default ReadAllAlbum;
