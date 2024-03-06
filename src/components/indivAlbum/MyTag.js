import styled from "@emotion/styled";
import React from "react";
import { colors, fonts } from "../../styles/basic";

const MyTag = ({ state }) => {
  const list = Array.isArray(state) ? state.map(item => item.kidNm) : [];
  const ClassTitle = styled.div`
    display: flex;
    img {
      padding-right: 0.5rem;
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
        <img
          src={`${process.env.PUBLIC_URL}/images/user/userTag.svg`}
          alt="Icon"
        ></img>
        <h4>
          {list.length >= 2
            ? `${list.join(", ")} 외 ${list.length - 1}명`
            : list.join(", ")}
        </h4>
      </ClassTitle>
    </>
  );
};

export default MyTag;
