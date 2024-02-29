import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ErrorBot, ErrorTop, ErrorWrap } from "../styles/error";

const Error = () => {
  const [search, setSearch] = useSearchParams();
  const name = search.get("name");
  const message = search.get("message");
  // console.log(name);
  // console.log(message);
  return (
    <ErrorWrap>
      <ErrorTop>
        <img src={process.env.PUBLIC_URL + "/images/error_logo.svg"}></img>
        <h4>Server Error</h4>
      </ErrorTop>
      <ErrorBot>
        <p>
          서버 에러가 발생하여 페이지를 표시할 수 없습니다. <br />
          잠시 후 다시 시도해주세요.
        </p>
        <Link to="/" className="submit-btn">
          홈으로 돌아가기
        </Link>
      </ErrorBot>
    </ErrorWrap>
  );
};

export default Error;
