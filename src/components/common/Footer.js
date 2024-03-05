import React from "react";
import { FooterBg, FooterBus, FooterWrap } from "../../styles/basic";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <FooterWrap>
      <FooterBus />
      <FooterBg>
        <Link to="/">copyright 떡잎방범대</Link>
      </FooterBg>
    </FooterWrap>
  );
};

export default Footer;
