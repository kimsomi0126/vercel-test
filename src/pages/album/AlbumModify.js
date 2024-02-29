import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModifyAlbum from "../../components/album/ModifyAlbum";
import { getAlbum } from "../../api/album/album_api"; // 데이터를 가져오는 API 함수를 import
import useCustomLogin from "../../hooks/useCustomLogin";

const AlbumModify = () => {
  const { pno } = useParams();
  const [albumData, setAlbumData] = useState(null); // 앨범 데이터를 위한 상태
  const { isLogin } = useCustomLogin(); // 로그인 상태를 가져옵니다.
  useEffect(() => {
    // 데이터 가져오기
    getAlbum({
      pno: pno,
      successFn: data => {
        setAlbumData(data); // 앨범 데이터 상태 업데이트
      },
      // 에러 처리는 필요에 따라 추가
    });
  }, [pno]);

  return albumData ? (
    <ModifyAlbum albumData={albumData} isLogin={isLogin} />
  ) : null; // 데이터가 있을 때만 ModifyAlbum 렌더링
};

export default AlbumModify;
