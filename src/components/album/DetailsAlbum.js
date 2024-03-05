import { Form, Modal } from "antd";
import React, { useEffect, useState, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCoverflow, Keyboard, Pagination } from "swiper/modules";
import LightBox from "./LightBox";
import { Link, useNavigate } from "react-router-dom";

import {
  AlbumTitle,
  AlbumTopBar,
  AlbumWrap,
  ContentWrap,
  DetailsText,
  Footer,
  MainContent,
  TitleWrap,
  SwiperWrap,
} from "../../styles/album/album";
import {
  BlueBtn,
  GreenBtn,
  PinkBtn,
  BtnWrap,
  OrangeBtn,
} from "../../styles/ui/buttons";
import Comment from "../common/Comment";
import {
  deleteAlbum,
  deleteAlbumComment,
  getAlbum,
  postAlbumComment,
} from "../../api/album/album_api";
import Loading from "../loading/Loading";
import { IMG_URL, SERVER_URL } from "../../api/config";
import useCustomLogin from "../../hooks/useCustomLogin";
import ModalOneBtn from "../ui/ModalOneBtn";
import ModalTwoBtn from "../ui/ModalTwoBtn";
import { PageTitle } from "../../styles/basic";
import {
  CommentBox,
  CommentView,
  CommentWrap,
  CommentWrite,
} from "../../styles/ui/comment";
import TextArea from "antd/es/input/TextArea";
const path = `${IMG_URL}/pic/album`;

const host = `${SERVER_URL}/album`;
// import required modules
const initAlbumCommnet = [
  {
    albumTitle: "",
    albumContents: "",
    albumPic: [],
    albumComments: [],
    createdAt: "",
  },
];

const DetailsAlbum = ({ pno, isLogin, loginState }) => {
  const navigate = useNavigate();

  const [albumData, setAlbumData] = useState(initAlbumCommnet); // 앨범 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);

  // 댓글관련
  const [commentState, setCommentState] = useState(false);
  const [commentNum, setCommentNum] = useState(null);
  const iwriter = loginState.iteacher || loginState.iparent;
  const ilevel = loginState.role === "PARENT" ? 1 : loginState.ilevel;
  const [isDelComment, setIsDelComment] = useState(false); // 댓글삭제 모달

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();
  // 글 삭제
  const [delOpen, setDelOpen] = useState(false);

  // 삭제 성공 상태 추가
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // lightbox
  const [lightbox, setLightbox] = useState({ open: false, imgSrc: "" });
  const openLightbox = imgSrc => setLightbox({ open: true, imgSrc: imgSrc });
  const closeLightbox = () => setLightbox({ open: false, imgSrc: "" });
  const [confirmAction, setConfirmAction] = useState(null);
  // 컴포넌트 마운트 시 데이터 불러오기
  // Lightbox 상태에 따라 Swiper 높이 조절
  // console.log("pno", pno);
  useEffect(() => {
    getAlbum({
      pno: pno,
      successFn: data => {
        setAlbumData(data); // 앨범 데이터 상태 업데이트
        setIsLoading(false); // 로딩 상태 업데이트
      },
      failFn: message => {
        console.error(message);
        setIsLoading(false);
      },
      errorFn: data => {
        console.error(data);
        setIsLoading(false);
      },
    });
    const swiperElement = document.querySelector(".swiper");
    if (lightbox.open) {
      swiperElement.style.height = "55vh";
    } else {
      swiperElement.style.height = "100%";
    }
  }, [pno, lightbox.open, commentState]); // pno 값이 변경될 때마다 getAlbum 함수를 호출

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDelOk = () => {
    deleteAlbum({
      ialbum: pno,
      successFn: res => {
        setIsDeleteModalOpen(false); // 첫 번째 모달 닫기
        setIsDeleteSuccessModalOpen(true); // 삭제 성공 모달 열기

        // 사용자가 '확인' 버튼을 누르지 않았을 경우, 1.5초 후에 페이지 이동
        const timeoutId = setTimeout(() => {
          navigate("/album");
        }, 1500);

        // '확인' 버튼 클릭 시 처리를 위한 함수 저장
        setConfirmAction(() => () => {
          clearTimeout(timeoutId); // setTimeout 취소
          navigate("/album"); // 즉시 페이지 이동
        });
      },
      failFn: error => {
        // 삭제 실패 시 처리
        Modal.error({
          title: "앨범 삭제 실패",
          content: "앨범 삭제에 실패했습니다. 다시 시도해 주세요.",
        });
      },
      errorFn: error => {
        console.error("Error deleting album:", error);
        Modal.error({
          title: "오류 발생",
          content:
            "서버 오류로 인해 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        });
      },
    });
  };

  // 모달창 확인버튼
  const handleOk = () => {
    setConfirmAction(() => () => {
      clearTimeout(); // setTimeout 취소
      navigate("/album"); // 즉시 페이지 이동
    });
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };

  // 비사용 모달 관련 함수 제거
  // const handleDeleteSuccessOk = () => {
  //   setIsDeleteSuccessModalOpen(false); // 두 번째 모달 닫기
  //   if (confirmAction) {
  //     confirmAction(); // 사용자 정의 '확인' 액션 실행
  //   } else {
  //     navigate("/album"); // 즉시 페이지 이동, confirmAction이 없으면 바로 이동
  //   }
  // };
  // // 모달창 취소
  // const handleCancel = () => {
  //   setDelOpen(false);
  // };

  // const handleDeleteCancel = () => {
  //   setIsDeleteModalOpen(false);
  // };

  // const handleDeleteSucccessOk = () => {
  //   setIsDeleteSuccessModalOpen(false);
  // };

  // 댓글등록
  const [form] = Form.useForm();
  const handleWriteComment = value => {
    const obj = {
      ialbum: pno,
      albumComment: value.albumComment,
    };
    console.log(obj, "댓글등록");
    postAlbumComment({
      obj,
      successFn,
      errorFn,
    });
    form.resetFields();
  };
  // 댓글삭제
  const handleDeleteComment = () => {
    if (loginState.iteacher) {
      deleteAlbumComment({
        ialbumComment: commentNum,
        ialbum: pno,
        iteacher: loginState.iteacher,
        successFn,
        errorFn,
      });
    } else {
      deleteAlbumComment({
        ialbumComment: commentNum,
        ialbum: pno,
        iparent: loginState.iparent,
        successFn,
        errorFn,
      });
    }
    setIsDelComment(false);
  };

  const successFn = res => {
    setCommentState(!commentState);
    setCommentNum(null);
    console.log(res);
  };

  const errorFn = res => {
    console.log(res);
  };

  return (
    <AlbumWrap>
      <AlbumTopBar>
        <PageTitle>활동앨범</PageTitle>
      </AlbumTopBar>
      <ContentWrap>
        <TitleWrap>
          <h3>{albumData.albumTitle}</h3>
          <p>{albumData.createdAt}</p>
        </TitleWrap>
        <MainContent>
          <SwiperWrap>
            <Swiper
              loading="swiper-lazy-preloader swiper-lazy-preloader-white"
              height={200}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              keyboard={{ enabled: true }} // 키보드 제어 활성화
              modules={[EffectCoverflow, Pagination, Keyboard]} // Keyboard 모듈 추가
              className="mySwiper"
              // style={{ transform: `translate3d(0px, 0px, 0px)` }} //
            >
              {albumData &&
                albumData.albumPic &&
                albumData.albumPic.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${path}/${pno}/${item}`}
                      onClick={() => openLightbox(`${path}/${pno}/${item}`)}
                    />
                  </SwiperSlide>
                ))}
              <LightBox
                imgSrc={lightbox.imgSrc}
                open={lightbox.open}
                closeLightbox={closeLightbox}
              />
            </Swiper>
          </SwiperWrap>
          <DetailsText>
            <pre>{albumData.albumContents}</pre>
          </DetailsText>
          {/* 댓글창 */}
          <CommentWrap>
            <CommentView>
              {Array.isArray(albumData.albumComments) &&
                albumData.albumComments.map((item, index) => (
                  <CommentBox
                    key={item.ialbumComment}
                    className={
                      ilevel === item.ilevel && item.writerIuser == iwriter
                        ? "right"
                        : null
                    }
                  >
                    <pre className="text">{item.albumComment}</pre>
                    <ul>
                      <li className="name">{item.writerName}</li>
                      <li className="date">{item.createdAt}</li>
                    </ul>
                    {ilevel === item.ilevel && item.writerIuser == iwriter ? (
                      <span
                        className="delete"
                        onClick={() => {
                          setCommentNum(item.ialbumComment);
                          setIsDelComment(true);
                        }}
                      >
                        댓글삭제
                      </span>
                    ) : null}
                  </CommentBox>
                ))}
            </CommentView>
            <CommentWrite>
              <Form form={form} onFinish={handleWriteComment}>
                <Form.Item name="albumComment">
                  <TextArea required placeholder="댓글내용을 입력해주세요." />
                </Form.Item>
                <OrangeBtn>등록</OrangeBtn>
              </Form>
            </CommentWrite>
          </CommentWrap>
        </MainContent>
        {/* 안내창 */}
        <ModalOneBtn
          isOpen={isOpen}
          handleOk={handleOk}
          title={title}
          subTitle={subTitle}
        />
        {/* 글삭제 */}
        <ModalTwoBtn
          isOpen={isDeleteModalOpen}
          handleOk={handleDelOk}
          handleCancel={() => setIsDeleteModalOpen(false)}
          title={"앨범 삭제"}
          subTitle={
            "삭제된 앨범은 복구할 수 없습니다. \n정말 삭제하시겠습니까?"
          }
        />
        {/* 댓글삭제 */}
        <ModalTwoBtn
          isOpen={isDelComment}
          handleOk={() => handleDeleteComment()}
          handleCancel={() => setIsDelComment(false)}
          title={"댓글 삭제"}
          subTitle={
            "삭제된 댓글은 복구할 수 없습니다. \n정말 삭제하시겠습니까?"
          }
        />
        {/* 삭제 성공 모달 */}
        {isDeleteSuccessModalOpen && (
          <ModalOneBtn
            isOpen={isDeleteSuccessModalOpen}
            handleOk={() => setIsDeleteSuccessModalOpen(false)}
            title="삭제 완료"
            subTitle="앨범이 성공적으로 삭제되었습니다."
          />
        )}
      </ContentWrap>
      <Footer>
        <BtnWrap style={{ justifyContent: "flex-end" }}>
          <GreenBtn
            onClick={() => {
              navigate("/album");
            }}
          >
            목록보기
          </GreenBtn>

          {isLogin ? (
            <>
              <BlueBtn
                onClick={() => {
                  navigate(`${host}/modify/${pno}`);
                }}
              >
                수정
              </BlueBtn>
              <PinkBtn onClick={showDeleteModal}>삭제</PinkBtn>
            </>
          ) : null}
        </BtnWrap>
      </Footer>
    </AlbumWrap>
  );
};

export default DetailsAlbum;
