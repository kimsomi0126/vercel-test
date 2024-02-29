import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import LogTab from "../../components/loglist/LogTab";
import Footer from "../../components/Footer";
import UpcomingLogList from "../../components/loglist/UpcomingLogList";
import PastLogList from "../../components/loglist/PastLogList";
import { getMedia } from "../../api/culutrelog_api";
import styled from "@emotion/styled";
import { WarningWrap } from "../../styles/ui/warning";
import WarningAlert from "../../components/ui/WarningAlert";
import { useNavigate } from "react-router";

const initLog = [
  {
    imedia: 0,
    title: "",
    date: "",
    pic: "",
    star: 0,
  },
];

const MyLog = ({ loginCheck, iuser }) => {
  const navigate = useNavigate();
  const [loglist, setLogList] = useState(initLog);
  useEffect(() => {
    loginCheck();
    const resultAction = result => {
      if (result === 0 || result === 5555) {
        navigate("/error");
        return;
      }
    };
    getMedia(setLogList, iuser, 1, resultAction);
  }, []);

  // 탭 기능
  const [tabClick, setTabClick] = useState(true);

  const tabClickOn = _clicked => {
    setTabClick(_clicked);
  };

  const totalLogList = loglist.length;
  // console.log(tabClick);

  const MyLogWrap = styled.div`
    position: relative;
  `;

  return (
    <>
      <Header sub={true}>My Log</Header>
      <MyLogWrap>
        <LogTab tabClick={tabClick} tabClickOn={tabClickOn}></LogTab>
        {tabClick ? (
          <UpcomingLogList loglist={loglist} iuser={iuser} />
        ) : (
          <PastLogList
            totalLogList={totalLogList}
            loglist={loglist}
            iuser={iuser}
          />
        )}
      </MyLogWrap>
      <Footer />
    </>
  );
};

export default MyLog;
