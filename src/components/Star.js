import styled from "@emotion/styled";
import React from "react";

const Star = ({ num, width }) => {
  const starView = num * 10 + "px";
  const StarWrap = styled.div`
    overflow: hidden;
    width: ${starView};
    zoom: ${width ? "0.8" : "1"};
    .point-star {
      z-index: 10;
      width: 100px;
    }
  `;
  return (
    <StarWrap>
      <img
        src={process.env.PUBLIC_URL + "/images/icon_star_yellow.svg"}
        className="point-star"
      />
    </StarWrap>
  );
};

export default Star;
