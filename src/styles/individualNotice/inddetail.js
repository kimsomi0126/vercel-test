import styled from "@emotion/styled";
import { boxStyle, colors, mq } from "../basic";
import { BtnWrap } from "../ui/buttons";

export const IndDetailWrap = styled.div`
  position: relative;
  background: ${colors.white};
  border: 2px solid ${colors.greenDeep};
  border-width: 2px 0;
  margin-top: 3rem;
`;

export const IndDetailTop = styled.div`
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.grayBar};

  ${mq.mobileBig} {
    padding: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    h3 {
      width: 100%;
      text-align: center;
      margin: 1rem 0;
    }
    p {
      flex: 2;
      img {
        display: none;
      }
    }
  }
`;

export const IndClass = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  h3 {
    color: #555;
  }
  p {
    color: #888;
  }
`;
export const IndDetailContent = styled.div`
  padding: 4rem;
  min-height: 30vh;
`;
export const IndAlbumDetailContent = styled.div`
  padding: 4rem;
  min-height: 3vh;
`;
export const IndDetailFile = styled.div`
  padding: 4rem;
  a {
    display: inline-block;
    padding: 1rem;
    padding-left: 4rem;
    ${boxStyle}
    background: url(${process.env.PUBLIC_URL + "/images/common/file_icon.svg"})
      no-repeat 1rem center;
    border: 1px solid ${colors.grayLight};
    color: ${colors.grayDeep};
  }
`;
export const IndBtnWrap = styled.div`
  display: flex;
  justify-content: right;
  gap: 1rem;
  margin-top: 2rem;
`;
