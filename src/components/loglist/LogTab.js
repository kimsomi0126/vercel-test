import React from "react";
import { LogTabBt } from "../../styles/ui/logtabstyle";

const LogTab = ({ tabClickOn, tabClick }) => {
  return (
    <>
      <LogTabBt>
        <button
          className={tabClick ? "on" : ""}
          onClick={() => {
            tabClickOn(true);
          }}
        >
          볼 거예요
        </button>
        <button
          className={!tabClick ? "on" : ""}
          onClick={() => {
            tabClickOn(false);
          }}
        >
          봤어요
        </button>
      </LogTabBt>
    </>
  );
};

export default LogTab;
