import styled from "@emotion/styled";
import React from "react";
import { colors } from "../../styles/basic";

const MyClass = ({ state }) => {
  const ClassTitle = styled.div`
    h3 {
      padding-left: 3.2rem;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 2.8rem;

      &.hibiscus {
        background-image: url(${process.env.PUBLIC_URL +
        "/images/user/class_icon_hibiscus.svg"});
        color: #ff73a1;
      }
      &.sunflower {
        background-image: url(${process.env.PUBLIC_URL +
        "/images/user/class_icon_sunflower.svg"});
        color: ${colors.orangeDeep};
      }
      &.rose {
        background-image: url(${process.env.PUBLIC_URL +
        "/images/user/class_icon_rose.svg"});
        color: #f5062c;
      }
      &.discharge {
        background-image: url(${process.env.PUBLIC_URL +
        "/images/user/class_icon_bag.svg"});
        color: ${colors.grayDeep};
      }
      &.graduation {
        background-image: url(${process.env.PUBLIC_URL +
        "/images/user/class_icon_graduation.svg"});
        color: ${colors.black};
      }
      &.none {
        padding-left: 0;
      }
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
        >
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
        </h3>
      </ClassTitle>
    </>
  );
};

export default MyClass;
