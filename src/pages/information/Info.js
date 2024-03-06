import React, { useEffect, useState } from "react";

import {
  GreetingText,
  GreetingWrap,
  InfoWrap,
  TeacherDesc,
  TeacherList,
  TeacherWrap,
} from "../../styles/information/info";
import { PageTitle } from "../../styles/basic";
import { ImgBox } from "../../styles/main";
import { IMG_URL } from "../../api/config";
import { getTeacher } from "../../api/information/informationApi";

const initData = [
  {
    iclass: 0,
    teacherNm: "",
    teacherProfile: "",
    teacherIntroduce: "",
  },
];

const Info = () => {
  const [teacherData, SetTeacherData] = useState(initData);

  useEffect(() => {
    getTeacher({ successFn, errorFn });
  }, [initData]);

  const successFn = res => {
    SetTeacherData([...res]);
  };

  const errorFn = res => {
    // console.log(res);
  };
  return (
    <InfoWrap>
      <GreetingWrap>
        <PageTitle>유치원 소개</PageTitle>
        <ImgBox>
          <img
            src={process.env.PUBLIC_URL + "/images/information/info01.jpg"}
            alt=""
          />
        </ImgBox>
        <GreetingText>
          <h3>떡잎유치원 홈페이지에 오신것을 환영합니다.</h3>
          <p>
            소중한 떡잎유치원 가족 여러분께, <br />
            저희 유치원은 어린이들에게 안전하고 풍부한 경험을 제공하여 미래를
            준비하는 데 도움이 되고자 합니다. 아이들의 인격과 창의성을 존중하며,
            교육의 가치를 중시하는 데 큰 자부심을 가지고 있습니다. <br />
            우리는 아이들이 적극적이고 독립적으로 배움의 즐거움을 느낄 수 있도록
            돕고, <br />
            그들의 성장을 돕는데 최선을 다하고 있습니다. <br />
            함께 아이들의 미래를 함께 준비하는 것에 영광을 느끼며, 항상 그들과
            함께 하겠습니다.
          </p>
          <span>떡잎유치원 원장 권지옹</span>
        </GreetingText>
      </GreetingWrap>
      <TeacherWrap>
        <PageTitle>선생님 소개</PageTitle>
        <TeacherList>
          {Array.isArray(teacherData) &&
            teacherData.map((item, index) => (
              <li key={index}>
                <ImgBox className="teacher_img">
                  <img
                    src={`${IMG_URL}/pic/user/${item.iteacher}/${item.teacherProfile}`}
                    alt={item.teacherNm}
                  />
                </ImgBox>
                <TeacherDesc className={`class${item.iclass}`}>
                  <h4>{item.teacherNm}</h4>
                  <p>{item.teacherIntroduce}</p>
                </TeacherDesc>
              </li>
            ))}
        </TeacherList>
      </TeacherWrap>
    </InfoWrap>
  );
};

export default Info;
