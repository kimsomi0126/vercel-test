import React, { useEffect, useState } from "react";
import {
  MainAlbum,
  MainAlbumImage,
  MainAlbumList,
  MainAlbumText,
} from "../../styles/main";
import { PageTitle } from "../../styles/basic";
import { Link, useNavigate } from "react-router-dom";
import { IMG_URL } from "../../api/config";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalOneBtn from "../ui/ModalOneBtn";

const MainAlbumComponent = ({ albumDate }) => {
  const navigate = useNavigate();
  // 로그인 체크
  const { isLogin, isParentLogin } = useCustomLogin();
  useEffect(() => {
    // 배열 거꾸로 순서변경
    if (Array.isArray(albumDate)) {
      albumDate.reverse();
    }
  }, []);

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  const modalPopup = () => {
    setIsOpen(true);
    setTitle("회원 전용페이지");
    setSubTitle("로그인 후 이용해주세요.");
    setIsNavigate("/login");
  };
  return (
    <MainAlbum>
      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <PageTitle>
        <Link to="/album">활동앨범</Link>
      </PageTitle>
      <MainAlbumList>
        {albumDate[0].ialbum === 0 ? (
          <div style={{ textAlign: "center", marginTop: "5rem" }}>
            게시글이 없습니다.
          </div>
        ) : (
          Array.isArray(albumDate) &&
          albumDate.map(item => {
            return (
              <li key={item.ialbum}>
                {!isLogin && !isParentLogin ? (
                  <Link onClick={modalPopup}>
                    <MainAlbumImage>
                      <img
                        src={`${IMG_URL}/pic/album/${item.ialbum}/${item.albumPic}`}
                      />
                      <div></div>
                    </MainAlbumImage>
                    <MainAlbumText>
                      <b>{item.albumTitle}</b>
                      <p>{item.albumContents}</p>
                      <span>{item.createdAt}</span>
                    </MainAlbumText>
                  </Link>
                ) : (
                  <Link to={`/album/details/${item.ialbum}`}>
                    <MainAlbumImage>
                      <img
                        src={`${IMG_URL}/pic/album/${item.ialbum}/${item.albumPic}`}
                      />
                    </MainAlbumImage>
                    <MainAlbumText>
                      <b>{item.albumTitle}</b>
                      <p>{item.albumContents}</p>
                      <span>{item.createdAt}</span>
                    </MainAlbumText>
                  </Link>
                )}
              </li>
            );
          })
        )}
      </MainAlbumList>
    </MainAlbum>
  );
};

export default MainAlbumComponent;
