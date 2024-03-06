import React from "react";
import { BlueBtn, BtnWrap } from "../../styles/ui/buttons";
import { WarningBox } from "../../styles/ui/warning";

const WarningAlert = ({ children, handleClickClose }) => {
  return (
    <WarningBox>
      <i>
        <img src={process.env.PUBLIC_URL + "/images/icon_info.svg"} />
      </i>
      {children}
      <BtnWrap className="square wd100">
        <BlueBtn
          onClick={() => {
            handleClickClose();
          }}
        >
          확인
        </BlueBtn>
      </BtnWrap>
    </WarningBox>
  );
};

export default WarningAlert;
