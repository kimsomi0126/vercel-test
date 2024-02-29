import styled from "@emotion/styled";
import { boxStyle, colors, mq } from "../basic";

export const CommentWrap = styled.div`
  position: relative;
  background: #fafafa;
  border-top: 1px solid ${colors.grayBar};
  padding: 2rem 5rem;
  ${mq.mobileBig} {
    padding: 1rem;
  }
`;

export const CommentView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow-y: auto;
`;
export const CommentBox = styled.div`
  position: relative;
  display: inline-block;
  max-width: 50rem;
  padding: 1rem;
  ${boxStyle}
  background: ${colors.greenLight2};
  margin-bottom: 2rem;
  &.right {
    background: ${colors.orangeLight};
    margin-left: auto;
    text-align: right;
    margin-bottom: 5rem;
  }
  &:not(.right) {
    margin-right: auto;
  }
  ul {
    margin-top: 1rem;
    li {
      display: inline-block;
      font-size: 1.4rem;
      color: ${colors.grayDeep};

      &.date {
        font-size: 1.3rem;
        color: #ccc;
        margin-left: 0.5rem;
        :before {
          content: "|";
          vertical-align: 7%;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .delete {
    cursor: pointer;
    font-size: 1.2rem;
    color: ${colors.grayDeep};
    position: absolute;
    right: 0;
    top: calc(100% + 1rem);
    transition: 0.2s;
    padding-left: 1rem;
    :hover {
      font-weight: 600;
      color: ${colors.orangeDeep};
    }
  }
`;
export const CommentWrite = styled.div`
  position: relative;
  button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  textarea {
    padding-right: 12rem;
    font-size: 1.4rem !important;
    min-height: 6rem;
    max-height: 6rem;
  }
`;
