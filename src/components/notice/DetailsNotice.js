import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { deleteNotice, getDetail } from "../../api/notice/notice_api";
import { PageTitle } from "../../styles/basic";
import "../../styles/notice/gallery.css";
import { BlueBtn, BtnWrap, GreenBtn, PinkBtn } from "../../styles/ui/buttons";
import { IMG_URL } from "../../api/config";
import { NoticeGallery, NoticeWrap } from "../../styles/notice/notice";
import {
  ContentWrap,
  DetailsText,
  Footer,
  MainContent,
  TitleWrap,
} from "../../styles/album/album";
import ModalTwoBtn from "../ui/ModalTwoBtn";
import ModalOneBtn from "../ui/ModalOneBtn";
const path = `${IMG_URL}/pic/fullnotice`;
export const obj = {
  fullTitle: "",
  fullContents: "",
  writer: "",
  createdAt: "",
  pics: [
    {
      pic: "",
      ifullPic: 0,
    },
  ],
};

const DetailsNotice = ({ isLogin }) => {
  const params = useSearchParams();
  const slideInterval = 1700;

  const [postNumber, setPostNumber] = useState(0);
  const [detailData, setDetailData] = useState(obj);
  const [detailImage, setDetailImage] = useState([]);
  const { tno } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteSuccessModalOpen, setIsDeleteSuccessModalOpen] =
    useState(false);

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDelOk = () => {
    // setIsDeleteModalOpen(false); // 삭제 확인 모달 닫기
    deleteNotice({
      tno: tno,
      successFn: res => {
        // 삭제 성공 시 처리
        // console.log("Album deleted:", res);
        setIsDeleteSuccessModalOpen(true); // 삭제 성공 모달 열기

        // 2초 후에 성공 모달을 닫고 유치원소식 목록 페이지로 이동
        setTimeout(() => {
          setIsDeleteSuccessModalOpen(false);
          navigate("/notice");
        });
      },
      failFn: error => {
        // 삭제 실패 시 처리
        Modal.error({
          title: "게시글 삭제 실패",
          content: "게시글 삭제에 실패했습니다. 다시 시도해 주세요.",
        });
      },
      errorFn: error => {
        console.error("Error deleting notice:", error);
        Modal.error({
          title: "오류 발생",
          content:
            "서버 오류로 인해 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.",
        });
      },
    });
  };

  const successFn = result => {
    setDetailData(result);
    const pics = result.pics;
    // console.log("사진 경로", pics);
    const newImages = pics.map((pic, index) => ({
      original: `${path}/${tno}/` + pic.pic,
      thumbnail: `${path}/${tno}/` + pic.pic,
    }));

    setDetailImage(prevDetailImage => [...prevDetailImage, ...newImages]);
    setPostNumber(pics.length); // 이미지 번호를 1부터 시작하도록 수정
  };

  // console.log("!!!!", detailImage);
  const failFn = result => {};
  const errorFn = result => {};
  useEffect(() => {
    getDetail({ tno, successFn, failFn, errorFn });
  }, [tno]);
  // console.log(detailData);

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <NoticeWrap>
      <PageTitle>유치원 소식</PageTitle>
      <ContentWrap>
        <TitleWrap>
          <h3>{detailData.fullTitle}</h3>
          <p>{detailData.createdAt}</p>
        </TitleWrap>
        <MainContent>
          <NoticeGallery key={postNumber}>
            {detailData.pics.length >= 1 ? (
              <ImageGallery
                items={detailImage}
                thumbnailPosition="left"
                slideInterval={slideInterval}
              />
            ) : null}
          </NoticeGallery>

          <DetailsText>
            <pre>{detailData.fullContents}</pre>
          </DetailsText>
        </MainContent>
      </ContentWrap>
      {/* 삭제 모달 */}
      <ModalTwoBtn
        isOpen={isDeleteModalOpen}
        handleOk={handleDelOk}
        handleCancel={() => setIsDeleteModalOpen(false)}
        title={"게시글 삭제"}
        subTitle={
          "삭제된 게시글은 복구할 수 없습니다. \n정말 삭제하시겠습니까?"
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
      <Footer>
        <BtnWrap style={{ justifyContent: "flex-end" }}>
          <GreenBtn
            onClick={() => {
              navigate("/notice");
            }}
          >
            목록보기
          </GreenBtn>
          {isLogin ? (
            <>
              <BlueBtn
                onClick={() => {
                  navigate({
                    pathname: `/notice/modify/${tno}`,
                    state: {
                      detailData: detailData,
                    },
                  });
                }}
              >
                수정
              </BlueBtn>

              <div>
                {isLogin ? (
                  <PinkBtn onClick={showDeleteModal}>삭제</PinkBtn>
                ) : null}
              </div>
            </>
          ) : null}
        </BtnWrap>
      </Footer>
    </NoticeWrap>
  );
};

export default DetailsNotice;
