import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  DateDiary,
  Dropdown,
  ImgUrl,
  ImgWrite,
  StarRate,
  TextArea,
} from "../../styles/writelog";
import Stardrop from "../../components/Stardrop";
import { useNavigate, useParams } from "react-router-dom";
import { LogTabBt } from "../../styles/ui/logtabstyle";
import { storage, ref, uploadBytes, getDownloadURL } from "../../fb/fbconfig";
import Upload from "antd/es/upload/Upload";
import ImgCrop from "antd-img-crop";
import { deleteObject } from "firebase/storage";
import { message } from "antd";
import { WarningBox, WarningWrap } from "../../styles/ui/warning";
import { BlueBtn, BtnWrap, GrayBtn, RedBtn } from "../../styles/ui/buttons";
import { getDetailMedia, putMedia } from "../../api/culutrelog_api";
import WarningAlert from "../../components/ui/WarningAlert";

const initGetState = {
  imedia: 0,
  title: "",
  comment: "",
  date: "",
  pics: [""],
  isSaw: 0,
  star: 0,
};

const EditLog = ({ iuser, loginCheck }) => {
  const navigate = useNavigate();
  // imedia 가져오기
  const params = useParams();
  // 상세정보 state
  const [viewData, setViewData] = useState(initGetState);
  // useState 체크
  const [selectedOption, setSelectedOption] = useState("");
  const [text, setText] = useState("");
  const [look, setLook] = useState(viewData.isSaw === 0 ? false : true);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [star, setStar] = useState(0);

  //상태 체크
  const handleDropdownChange = e => {
    setViewData({ ...viewData, genrePk: e.target.value });
  };
  const handleLookClick = e => {
    setViewData({ ...viewData, isSaw: 0 });
    setLook(false);
  };
  const handleNoLookClick = e => {
    setViewData({ ...viewData, isSaw: 1 });
    setLook(true);
  };
  const handleChangeTitle = e => {
    setViewData({ ...viewData, title: e.target.value });
  };
  const handleChangeDate = e => {
    setViewData({ ...viewData, date: e.target.value });
  };
  const handleTextChange = e => {
    setViewData({ ...viewData, comment: e.target.value });
  };
  const handleChangeStar = value => {
    setViewData({ ...viewData, star: value });
  };

  // firebase 이미지업로드
  const getFileName = pic => {
    const url = pic;
    // URL에서 "?" 이후의 문자열을 제거하여 파일 경로를 추출
    const filePath = url.split("?")[0];

    // 파일 경로에서 "/"로 구분된 마지막 부분이 파일 이름입니다.
    const fileName = filePath.split("/").pop();
    return fileName;
  };

  const [fileList, setFileList] = useState([]);

  const [imageUrls, setImageUrls] = useState([]);
  const beforeUpload = async file => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("이미지파일만 업로드 가능합니다.");
    }
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 200; // 원하는 최대 가로 크기
          const MAX_HEIGHT = 200; // 원하는 최대 세로 크기

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(async blob => {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
            });

            const fileName = `culturelog_${file.name}`;

            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, resizedFile);

            const downloadURL = await getDownloadURL(storageRef);
            setImageUrls(prevUrls => [...prevUrls, downloadURL]);

            const newFile = {
              uid: file.uid,
              name: fileName,
              status: "done",
              url: downloadURL,
            };

            setFileList(prevList => [...prevList, newFile]);
            resolve(false);
          }, file.type);
        };
      };
    });
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  // 이미지 삭제
  const handleRemove = async file => {
    // console.log("삭제", file);
    try {
      // DB 저장된 파일명
      const deletedFileName = `${file.name}`;

      // FB 저장된 파일명
      const deletedFileNameFB = deletedFileName.replace("%2F", "/");
      // console.log("수정 진행중 deletedFileName ", deletedFileNameFB);
      // Firebase Storage에서 파일 삭제
      const storageRef = ref(storage, `${deletedFileNameFB}`);
      // await deleteObject(storageRef);

      // 이미지 URL 배열에서 삭제된 파일명 필터링
      // const getName = encodeURIComponent(`${deletedFileName}`);
      // 현재 어느 이미지를 지울지 순서 체크
      // 현재 선택된 파일멸을 가지고서 인덱스 번호를 찾고 그번호를 전달ㅎ
      // 배열을 돌면서
      const filteredImageUrls = imageUrls.filter(
        url => !url.includes(deletedFileName),
      );

      // console.log(filteredImageUrls);
      setImageUrls(filteredImageUrls);

      // 파일 목록에서 삭제된 파일 필터링
      const filteredFileList = fileList.filter(f => f.uid !== file.uid);
      setFileList(filteredFileList);
      // console.log(`${file.name} 파일이 삭제되었습니다.`);
    } catch (error) {
      // console.log("파일 삭제 중 오류가 발생했습니다.");
    }
  };

  // 수정완료 버튼 클릭
  const handleSubmitPut = e => {
    e.preventDefault();
    const obj = {
      imedia: viewData.imedia,
      iuser: iuser,
      genrePk: viewData.genrePk,
      title: viewData.title,
      date: viewData.date,
      comment: viewData.comment,
      star: viewData.star,
      isSaw: viewData.isSaw,
      pics: imageUrls,
    };

    const resultAction = result => {
      if (result === 0 || result === 5555) {
        document.getElementById("warning-wrap2").style.left = "0";
        return;
      } else {
        document.getElementById("warning-wrap3").style.left = "0";
        return;
      }
    };
    putMedia(obj, resultAction);
    // console.log("수정내용 : ", obj);
  };
  // 수정실패 경고창
  const handleClickClose = e => {
    document.getElementById("warning-wrap1").style.left = "-300%";
    return;
  };
  // 취소버튼 클릭 시 경고창
  const handleClickWarning = () => {
    document.getElementById("warning-wrap1").style.left = "0";
  };
  // 다시작성 시 경고창 제거
  const handleClickCancel = () => {
    document.getElementById("warning-wrap1").style.left = "-300%";
  };
  // 취소확인 시 뷰페이지로 이동
  const handleClickBack = () => {
    navigate(`/culturelog/view/${params.imedia}?iuser=${iuser}`);
    return;
  };
  useEffect(() => {
    loginCheck();
    getDetailMedia(params.imedia, iuser, data => {
      setViewData(data);
      const defaultFileList = data.pics.map((pic, index) => ({
        uid: `${index + 1}`,
        name: getFileName(pic),
        status: "done",
        url: pic,
      }));
      setFileList(defaultFileList);
      setImageUrls(data.pics);
    });
  }, []);

  return (
    <>
      <Header sub={true}>Edit Log</Header>
      <form
        onSubmit={e => {
          handleSubmitPut(e);
        }}
      >
        <LogTabBt>
          <button
            className={viewData.isSaw === 0 ? "on" : ""}
            onClick={handleLookClick}
            type="button"
            disabled={viewData.isSaw === 0}
          >
            볼 거에요
          </button>
          <button
            className={viewData.isSaw === 1 ? "on" : ""}
            type="button"
            onClick={handleNoLookClick}
            disabled={viewData.isSaw === 1}
          >
            봤어요
          </button>
        </LogTabBt>
        <ImgWrite>이미지 등록</ImgWrite>
        <ImgUrl>
          <ImgCrop rotationSlider aspect={71 / 102}>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              beforeUpload={beforeUpload}
              onChange={onChange}
              onRemove={handleRemove} // 파일 삭제 이벤트 핸들러
            >
              {fileList.length < 4 && "+ Upload"}
            </Upload>
          </ImgCrop>
          <input
            type="text"
            maxLength={50}
            placeholder="제목을 입력하세요. (50자 내외)"
            className="imgurl"
            required
            value={viewData.title}
            onChange={e => {
              handleChangeTitle(e);
            }}
          ></input>
        </ImgUrl>
        <DateDiary>
          <div className="date-wrap">
            <input
              type="date"
              className="date"
              required
              value={viewData.date}
              onChange={e => {
                handleChangeDate(e);
              }}
            />
          </div>
        </DateDiary>
        <Dropdown>
          <label htmlFor="dropdown">
            <select
              required
              id="dropdown"
              value={viewData.genrePk}
              onChange={e => {
                handleDropdownChange(e);
              }}
            >
              <option value="0" disabled>
                장르
              </option>
              <option value="1">영화</option>
              <option value="2">드라마</option>
              <option value="3">공연</option>
              <option value="4">기타</option>
            </select>
          </label>
        </Dropdown>
        {viewData.isSaw === 1 && (
          <>
            <StarRate>
              <Stardrop
                onChange={value => {
                  handleChangeStar(value);
                }}
                valueStar={viewData.star}
              />
            </StarRate>
            <TextArea>
              <label htmlFor="textArea"></label>
              <textarea
                id="textArea"
                maxLength={500}
                placeholder="감상평을 남겨주세요. (500자 내외)"
                defaultValue={viewData.comment}
                onChange={e => {
                  handleTextChange(e);
                }}
                rows="9" // 원하는 높이를 설정할 수 있습니다.
                cols="100%" // 원하는 너비를 설정할 수 있습니다.
                style={{ width: "100%", padding: "1rem 1rem" }}
              />
            </TextArea>
          </>
        )}
        <BtnWrap className="half">
          <GrayBtn
            type="button"
            onClick={() => {
              handleClickWarning();
            }}
          >
            취소
          </GrayBtn>
          <BlueBtn>수정완료</BlueBtn>
        </BtnWrap>

        <WarningWrap id="warning-wrap1">
          <WarningBox>
            <i>
              <img src={process.env.PUBLIC_URL + "/images/icon_info.svg"} />
            </i>
            <h5>정말 취소할까요?</h5>
            <p>작성된 내용은 저장되지 않습니다.</p>

            <BtnWrap className="square">
              <BlueBtn
                className="writebt"
                type="button"
                onClick={() => {
                  handleClickCancel();
                }}
              >
                돌아가기
              </BlueBtn>
              <RedBtn
                type="button"
                onClick={() => {
                  handleClickBack();
                }}
              >
                작성취소
              </RedBtn>
            </BtnWrap>
          </WarningBox>
        </WarningWrap>
      </form>
      <Footer />

      <WarningWrap id="warning-wrap2">
        <WarningAlert handleClickClose={handleClickClose}>
          <h5>수정 실패</h5>
          <p>기록을 수정하는데 실패했습니다. 다시 시도해주세요.</p>
        </WarningAlert>
      </WarningWrap>

      <WarningWrap id="warning-wrap3">
        <WarningAlert handleClickClose={handleClickBack}>
          <h5>수정 완료</h5>
          <p>수정이 완료되었습니다.</p>
        </WarningAlert>
      </WarningWrap>
    </>
  );
};

export default EditLog;
