import styled from "@emotion/styled";
import { colors, fonts, mq, shadow } from "../basic";

export const StudentTop = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  ${mq.mobileBig} {
    flex-wrap: wrap;
  }
`;

export const StudentTopRight = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  .ant-input-group-wrapper {
    width: 20rem;
    height: 4rem;
  }
  .ant-input-affix-wrapper {
    height: 4rem;
  }
  ${mq.mobileBig} {
    width: 100%;
    margin: 1rem 0 0;
    justify-content: flex-start;
  }

  ${mq.mobileSmall} {
    margin: 1rem 0 -2rem;
    justify-content: flex-end;
    .ant-input-group-wrapper {
      width: 65%;
    }
  }
`;

export const StudentMain = styled.div`
  position: relative;
  margin-top: 1rem;
  min-height: 50vh;
  input {
    margin-right: 0.5rem;
  }
`;

export const StudentListWrap = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 2%;
`;
export const StudentListItem = styled.li`
  position: relative;
  border-radius: 1rem;
  border-color: #ebebeb;
  width: 32%;
  background: ${colors.white};
  padding: 2rem;
  margin-bottom: 2rem;
  ${shadow}
  cursor: pointer;
  input {
    z-index: 999;
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
  ${mq.mobileBig} {
    width: 49%;
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;
export const StudentListBox = styled.div`
  display: flex;
  ${mq.mobileBig} {
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
  }
`;
export const StudentImg = styled.div`
  width: 8rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: 115%;
    margin-right: 1rem;
  }
  ${mq.mobileSmall} {
    margin: 0 auto 1rem;
  }
`;
export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  p {
    padding-left: 3rem;
  }
  .sunflower {
    background: url(${process.env.PUBLIC_URL +
      "/images/information/sunflower.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: ${colors.orangeDeep};
  }
  .rose {
    background: url(${process.env.PUBLIC_URL + "/images/information/rose.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: #f5062c;
  }
  .hibiscus {
    background: url(${process.env.PUBLIC_URL +
      "/images/information/hibiscus.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: #ff73a1;
  }
  .discharge {
    background-image: url(${process.env.PUBLIC_URL +
    "/images/user/class_icon_bag.svg"});
    color: ${colors.grayDeep};
  }
  .graduation {
    background-image: url(${process.env.PUBLIC_URL +
    "/images/user/class_icon_graduation.svg"});
    color: ${colors.black};
  }
  .leaf {
    background: url(${process.env.PUBLIC_URL + "/images/information/logo1.svg"})
      no-repeat left 0.25rem/2.3rem;
    font-family: ${fonts.kotraHope};
    font-size: 2rem;
    color: ${colors.black};
  }

  ${mq.mobileBig} {
    padding: 0;
    margin: 0 auto;
  }
`;
