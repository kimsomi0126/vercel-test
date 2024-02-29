import React from "react";
import {
  FooterAddBtn,
  FooterBtn,
  FooterBtnWrap,
  FooterCopyRight,
  FooterWrap,
  Inner,
} from "../styles/basic";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <FooterWrap maxw="393">
        <Inner>
          <FooterBtnWrap>
            <FooterBtn>
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/images/icon_home.svg"}
                ></img>
              </Link>
            </FooterBtn>
            <FooterAddBtn>
              <Link to="/culturelog/write">
                <img
                  src={process.env.PUBLIC_URL + "/images/icon_plus.svg"}
                ></img>
              </Link>
            </FooterAddBtn>
            <FooterBtn>
              <Link to="/mylog">
                <img
                  src={process.env.PUBLIC_URL + "/images/icon_user.svg"}
                ></img>
              </Link>
            </FooterBtn>
          </FooterBtnWrap>
        </Inner>
      </FooterWrap>
      <FooterCopyRight>
        <Link to="/about">copyright 행복한 떡잎</Link>
      </FooterCopyRight>
    </>
  );
};

export default Footer;
