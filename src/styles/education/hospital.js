import styled from "@emotion/styled";
import { boxStyle, colors, fonts, mq } from "../basic";

export const HospitalWrap = styled.div`
  position: relative;
`;
export const HospitalList = styled.div`
  position: relative;
  min-height: 50vh;
  ${boxStyle}
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-between;
    /* align-items: center; */
    background: ${colors.white};
  }
  li {
    padding: 1.5rem 0.5rem;
    border: 1px solid ${colors.grayLight};
    border-width: 0 1px 1px 0;
    &.sigunNm {
      width: 20%;
    }
    &.facltNm {
      width: 25%;
      word-break: break-all;
    }
    &.address {
      width: 35%;
    }
    &.telNo {
      width: 20%;
      word-break: break-all;
      :hover a {
        color: ${colors.blueDeep};
      }
    }
  }

  ${mq.mobileBig} {
    .mo {
      display: none;
    }
    li {
      &.facltNm {
        width: 30%;
      }
      &.address {
        width: 40%;
      }
      &.telNo {
        width: 30%;
      }
    }
  }
`;
export const HospitalTitle = styled.div`
  li {
    background: ${colors.greenLight2};
    font-family: ${fonts.kotraHope};
    color: ${colors.greenDeep};
    font-size: 1.7rem;
  }
`;
export const HospitalItem = styled.div`
  li {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const HospitalInfo = styled.div`
  .active {
    background: #f7f7f7;
  }
`;
export const HospitalMap = styled.div`
  .kakao-map {
    height: 20rem;
    overflow: hidden;
  }
`;

export const EmptyTxt = styled.div`
  font-size: 1.6rem;
  margin-top: 2rem;
  text-align: center;
`;
