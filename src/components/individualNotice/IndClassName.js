import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../styles/basic";

const IndClassName = ({ state }) => {
  const ClassTitle = styled.div`
    p {
      display: flex;
      align-items: center;
    }
    img {
      margin-right: 0.5rem;
    }
  `;
  return (
    // 반pk = 1 : 무궁화반,  2 : 해바라기반, 3 : 장미반
    // 재원 상태 구분 = 0 : 재원중, -1 : 졸업, -2 : 퇴소
    <ClassTitle>
      <p>
        <img
          src={process.env.PUBLIC_URL + "/images/common/user_icon.svg"}
          alt=""
        />
        {state === 1
          ? "무궁화반"
          : state === 2
          ? "해바라기반"
          : state === 3
          ? "장미반"
          : state === -1
          ? "퇴소"
          : state === -2
          ? "졸업"
          : "지정된 반이 없습니다."}
      </p>
    </ClassTitle>
  );
};

export default IndClassName;
