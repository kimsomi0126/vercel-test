import { useEffect, useState } from "react";
import WriteAlbum from "../../components/album/WriteAlbum";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useNavigate } from "react-router-dom";
import ModalOneBtn from "../../components/ui/ModalOneBtn";
const initAlbumWrite = [
  {
    pics: ["string"],
    dto: {
      iteacher: 0,
      albumTitle: "string",
      albumContents: "string",
    },
  },
];

const AlbumWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  const { isLogin } = useCustomLogin(); // 로그인 상태를 가져옵니다.

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  // 로그인 상태가 false라면 로그인 페이지로 리다이렉트합니다.
  useEffect(() => {
    if (!isLogin) {
      setIsOpen(true);
      setTitle("교사 전용 페이지");
      setSubTitle("선생님만 접근 가능합니다.");
      setIsNavigate(-1);
    }
  });
  // 로그인 상태가 true라면 글쓰기 컴포넌트를 렌더링합니다.
  return (
    <>
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      <WriteAlbum isLogin={isLogin} submit="등록" />
    </>
  );
};

export default AlbumWrite;
