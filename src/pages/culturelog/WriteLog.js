import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  DateDiary,
  Dropdown,
  ImgUrl,
  ImgWrite,
  Loadicon,
  StarRate,
  TextArea,
} from "../../styles/writelog";
import Stardrop from "../../components/Stardrop";
import { useNavigate } from "react-router-dom";
import { LogTabBt } from "../../styles/ui/logtabstyle";
import { storage, ref, uploadBytes, getDownloadURL } from "../../fb/fbconfig";
import Upload from "antd/es/upload/Upload";
import ImgCrop from "antd-img-crop";
import { postMedia } from "../../api/culutrelog_api";
import { deleteObject } from "firebase/storage";
import { message } from "antd";
import { WarningWrap } from "../../styles/ui/warning";
import WarningAlert from "../../components/ui/WarningAlert";

const WriteLog = ({ loginCheck, iuser }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [text, setText] = useState("");
  const [look, setLook] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [star, setStar] = useState({});

  const handleDropdownChange = e => {
    setSelectedOption(e.target.value);
  };

  const handleLookClick = () => {
    setLook(false);
  };
  const handleNoLookClick = () => {
    setLook(true);
  };
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeDate = e => {
    setDate(e.target.value);
    // console.log(e.target.value);
  };

  const handleTextChange = e => {
    setText(e.target.value);
  };
  const handleChangeStar = value => {
    setStar(value);
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

            // const currentDate = moment().format("YYYYMMDDhhmmss");
            const fileName = `culturelog_${file.name}`;

            const storageRef = ref(storage, `images/${fileName}`);
            await uploadBytes(storageRef, resizedFile);

            const downloadURL = await getDownloadURL(storageRef);
            // console.log("downloadURL : ", downloadURL);
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

  const handleRemove = async file => {
    try {
      const deletedFileName = `images/culturelog_${file.name}`;

      // Firebase Storage에서 파일 삭제
      const storageRef = ref(storage, `${deletedFileName}`);
      await deleteObject(storageRef);

      // 이미지 URL 배열에서 삭제된 파일명 필터링
      const getName = encodeURIComponent(`images/${deletedFileName}`);

      const filteredImageUrls = imageUrls.filter(url => !url.includes(getName));
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
  // 등록버튼 클릭
  const handleSubmitPost = e => {
    e.preventDefault();

    if (fileList.length === 0) {
      message.error("최소 1개의 이미지를 업로드해주세요.");
      return;
    }
    const obj = {
      iuser: iuser,
      genrePk: selectedOption,
      title: title,
      date: date,
      comment: text,
      star: isNaN(star) ? 0 : star,
      isSaw: look ? 1 : 0,
      pics: imageUrls,
    };

    const resultAction = result => {
      if (result === 0 || result === 5555) {
        document.getElementById("warning-wrap").style.left = "0";
        return;
      } else {
        navigate(`/culturelog/view/${result}?iuser=${iuser}`);
        return;
      }
    };
    postMedia(obj, resultAction);
    // console.log(obj);
  };

  const handleClickClose = e => {
    document.getElementById("warning-wrap").style.left = "-300%";
    return;
  };
  // console.log(imageUrls);

  useEffect(() => {
    loginCheck();
  }, []);
  return (
    <>
      <Header sub={true}>Write Log</Header>
      <form
        onSubmit={e => {
          handleSubmitPost(e);
        }}
      >
        <LogTabBt>
          <button
            className={!look ? "on" : ""}
            onClick={handleLookClick}
            disabled={!look}
          >
            볼 거에요
          </button>
          <button
            className={look ? "on" : ""}
            onClick={handleNoLookClick}
            disabled={look}
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
              required
            >
              {fileList.length < 4 && "+ Upload"}
            </Upload>
          </ImgCrop>
          <input
            type="text"
            placeholder="제목을 입력하세요. (50자 이내)"
            className="imgurl"
            required
            maxLength={50}
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
              defaultValue={new Date().toISOString().split("T")[0]}
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
              value={selectedOption}
              onChange={handleDropdownChange}
            >
              <option value="0">장르</option>
              <option value="1">영화</option>
              <option value="2">드라마</option>
              <option value="3">공연</option>
              <option value="4">기타</option>
            </select>
          </label>
        </Dropdown>
        {look && (
          <>
            <StarRate>
              <Stardrop
                onChange={value => {
                  handleChangeStar(value);
                }}
              />
            </StarRate>
            <TextArea>
              <label htmlFor="textArea"></label>
              <textarea
                id="textArea"
                maxLength={500}
                placeholder="감상평을 남겨주세요. (500자 이내 )"
                value={text}
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
        <Loadicon>
          <button className="londing">등록</button>
        </Loadicon>
      </form>
      <Footer />
      <WarningWrap id="warning-wrap">
        <WarningAlert handleClickClose={handleClickClose}>
          <h5>등록 실패</h5>
          <p>기록을 작성하는데 실패했습니다. 다시 시도해주세요.</p>
        </WarningAlert>
      </WarningWrap>
    </>
  );
};

export default WriteLog;
