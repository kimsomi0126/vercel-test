import React from "react";
import { MainBanner, MainBannerWrap } from "../../styles/main";
import { Link } from "react-router-dom";
import { BlueBtn, MainBrownBtn, MainPinkBtn } from "../../styles/ui/buttons";
import useCustomLogin from "../../hooks/useCustomLogin";

const MainBannerComponent = () => {
  const { loginState, isLogin, isParentLogin } = useCustomLogin();
  const currentYear = new Date().getFullYear();
  const ikidList = loginState.kidList;
  return (
    <MainBannerWrap>
      <MainBanner className="bnr1">
        <Link to="/info">
          <h3>유치원소개</h3>
          <MainBrownBtn>바로가기</MainBrownBtn>
        </Link>
      </MainBanner>
      <MainBanner className="bnr2">
        <Link to="/edu">
          <h3>육아정보</h3>
          <MainPinkBtn>바로가기</MainPinkBtn>
        </Link>
      </MainBanner>
      <MainBanner className="bnr3">
        {isParentLogin ? (
          <Link
            to={`/ind?year=${currentYear}&page=1&ikid=${
              ikidList[0] ? ikidList[0].ikid : 0
            }`}
          >
            <h3>알림장</h3>
            <BlueBtn>바로가기</BlueBtn>
          </Link>
        ) : (
          <Link to={`/ind?year=${currentYear}&page=1&iclass=0`}>
            <h3>알림장</h3>
            <BlueBtn>바로가기</BlueBtn>
          </Link>
        )}
      </MainBanner>
    </MainBannerWrap>
  );
};

export default MainBannerComponent;
