import styled from "@emotion/styled";
import { colors, mq, shadow } from "../basic";

export const UserTop = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  ${mq.mobileBig} {
    flex-wrap: wrap;
  }
`;

export const UserTopRight = styled.div`
  display: flex;
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
    margin: 1rem 0;
    justify-content: flex-start;
    .ant-input-group-wrapper {
      width: 15rem;
      height: 4rem;
    }
  }
`;

export const UserMain = styled.div`
  position: relative;
  min-height: 50vh;
  input {
    margin-right: 0.5rem;
  }
`;

export const UserListWrap = styled.ul`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 2%;
`;
export const UserListItem = styled.li`
  position: relative;
  border-radius: 1rem;
  border-color: #ebebeb;
  width: 32%;
  background: ${colors.white};
  padding: 2rem;
  margin-bottom: 2rem;
  ${shadow}
  ${mq.mobileBig} {
    width: 49%;
    padding: 1rem;
  }
  ${mq.mobileSmall} {
    width: 100%;
    margin-bottom: 1rem;
  }
`;
export const UserListBox = styled.div`
  margin: auto;
  input {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;
  }
  em {
    font-size: 1.5rem;
    font-style: normal;
  }
  ${mq.mobileBig} {
    input {
      top: 1rem;
      right: 1rem;
    }

    button {
      right: 1rem;
      bottom: 1rem;
    }
  }
`;
export const UserInfo = styled.div`
  display: flex;
  gap: 1rem;

  span {
    color: ${colors.greenDeep};
    font-size: 1.5rem;
  }
  p {
    color: ${colors.black};
    font-size: 1.5rem;
  }
`;
export const ChildInfo = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  p {
    color: ${colors.grayDeep};
    font-size: 1.5rem;
  }
  ${mq.mobileBig} {
    flex-wrap: wrap;
    p {
      width: 100%;
    }
  }
`;

export const PageNum = styled.div`
  position: relative;
  /* bottom: 10rem;
  left: 50%;
  transform: translateX(-50%); */
  margin-top: 3rem;
  text-align: center;

  .ant-pagination-prev {
    font-size: 1.5rem;
    color: ${colors.grayDeep};
    background-color: ${colors.grayLight};
    border-radius: 50%;
  }
  .ant-pagination-next {
    font-size: 1.5rem;
    color: ${colors.grayDeep};
    background-color: ${colors.grayLight};
    border-radius: 50%;
  }
  .ant-pagination-item-active {
    font-weight: 400;
    border-radius: 50%;
    background-color: ${colors.greenDeep};
    border-color: ${colors.greenDeep};
    a {
      color: #fff;
    }
    &:hover {
      border-color: ${colors.greenDeep};
      a {
        color: #fff;
      }
    }
  }
  .ant-pagination-item:hover {
    border-radius: 50%;
  }
  .ant-pagination-options {
    display: none;
  }
`;
