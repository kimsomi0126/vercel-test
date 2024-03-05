import styled from "@emotion/styled";
import React from "react";
import { colors, fonts } from "../../styles/basic";

const MyTag = ({ state }) => {
  const list = state.map(item => item.kidNm);
  // data.kids
  const ClassTitle = styled.div`
    h3 {
      padding-left: 3.2rem;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 2.8rem;
      background-image: url(${process.env.PUBLIC_URL +
      "/images/user/userTag.svg"});
      font-family: ${fonts.pretendard};
      font-size: 1.7rem;
    }
    h4 {
      color: black;
      opacity: 0.5;
      font-size: 1.7rem;
    }
  `;

  return (
    // 반pk = 1 : 무궁화반,  2 : 해바라기반, 3 : 장미반
    // 재원 상태 구분 = 0 : 재원중, -1 : 졸업, -2 : 퇴소
    <>
      <ClassTitle>
        <h3
          className={
            state === 1
              ? "hibiscus"
              : state === 2
              ? "sunflower"
              : state === 3
              ? "rose"
              : state === -1
              ? "discharge"
              : state === -2
              ? "graduation"
              : "none"
          }
        ></h3>
        <h4>{list.length >= 2 ? `${list} 외 ${list.length - 1}명` : list}</h4>
      </ClassTitle>
    </>
  );
};

export default MyTag;
