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
  }
  .list-4 {
    .sigunNm {
      width: 20%;
    }
    .facltNm {
      width: 25%;
      word-break: break-all;
    }
    .address {
      width: 35%;
    }
    .telNo {
      width: 20%;
      word-break: break-all;
      :hover a {
        color: ${colors.blueDeep};
      }
    }
  }
  .list-5 {
    flex-wrap: nowrap;
    li {
      width: 50%;
    }
    .sigunNm {
      width: 10%;
    }
    .indutypeNm {
      width: 10%;
    }
    .facltNm {
      width: 20%;
    }
    .telNo {
      width: 20%;
    }
  }

  ${mq.mobileBig} {
    .mo {
      display: none;
    }
    .list-4 {
      .facltNm {
        width: 30%;
      }
      .address {
        width: 40%;
      }
      .telNo {
        width: 30%;
      }
    }
    .list-5 {
      li {
        width: 50%;
      }
      .facltNm {
        width: 33.33%;
        word-break: break-all;
      }
      .telNo {
        width: 33.33%;
        word-break: break-all;
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

export const NightHospitalMap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #ebebeb;
  .kakao-map {
    max-width: 50%;
    width: 100%;
    overflow: hidden;
  }

  ${mq.mobileBig} {
    .kakao-map {
      max-width: 100%;
      height: 15rem;
    }
  }
`;
export const HospitalDetail = styled.div`
  width: 100%;
  max-width: 50%;
  background: #fafafa;
  padding: 2rem 3%;
  font-size: 1.5rem;

  dl {
    display: flex;
    min-width: 35%;
    margin-bottom: 1rem;
    dt {
      color: #888;
      font-weight: 400;
      margin-right: 1rem;
      min-width: 6rem;
    }
    :last-of-type {
      margin-bottom: 0%;
    }
  }

  ${mq.mobileBig} {
    max-width: 100%;
    font-size: 1.3rem;
  }
`;

export const EmptyTxt = styled.div`
  font-size: 1.6rem;
  margin-top: 2rem;
  text-align: center;
`;
