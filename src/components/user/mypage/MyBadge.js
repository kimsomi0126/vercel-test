import React from "react";
import { BadgeItem, DetailBadge } from "../../../styles/user/mypage";

const MyBadge = ({ keywordValue, text }) => {
  let badgeImage = "";
  let badgeTitle = "";
  if (keywordValue === 1) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/active.png";
    badgeTitle = "활발한 어린이";
  } else if (keywordValue === 2) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/polite.png";
    badgeTitle = "예의바른 어린이";
  } else if (keywordValue === 3) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/delicate.png";
    badgeTitle = "창의적인 어린이";
  } else if (keywordValue === 4) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/curious.png";
    badgeTitle = "호기심많은 어린이";
  } else if (keywordValue === 5) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/good.png";
    badgeTitle = "착한 어린이";
  } else if (keywordValue === 6) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/brave.png";
    badgeTitle = "씩씩한 어린이";
  } else if (keywordValue === 7) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/faithful.png";
    badgeTitle = "성실한 어린이";
  } else if (keywordValue === 8) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/eat.png";
    badgeTitle = "편식없는 어린이";
  } else if (keywordValue === 9) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/clean.png";
    badgeTitle = "깔끔한 어린이";
  } else if (keywordValue === 10) {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/strong.png";
    badgeTitle = "튼튼한 어린이";
  } else {
    badgeImage = process.env.PUBLIC_URL + "/images/user/badge/blank.png";
    badgeTitle = "";
  }
  return (
    <BadgeItem
      style={!keywordValue ? { display: "flex", alignItems: "center" } : null}
    >
      <img src={badgeImage} alt={badgeTitle} />
      <h3>{badgeTitle}</h3>
      <p>{text}</p>
    </BadgeItem>
  );
};

export default MyBadge;
