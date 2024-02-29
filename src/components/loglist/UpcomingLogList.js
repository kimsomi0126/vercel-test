import React, { useEffect, useState } from "react";
import { LogListWrap } from "../../styles/ui/logliststyle";
import LogListItem from "./LogListItem";
import { getMedia } from "../../api/culutrelog_api";
import { useNavigate } from "react-router";

const initUpcomingLog = [
  {
    imedia: 0,
    title: "",
    date: "",
    pic: "",
    star: 0,
  },
];
const UpcomingLogList = ({ iuser }) => {
  const navigate = useNavigate();
  const [loglist, setLogList] = useState(initUpcomingLog);
  useEffect(() => {
    const resultAction = result => {
      if (result === 0 || result === 5555) {
        navigate("/error");
        return;
      }
    };
    getMedia(setLogList, iuser, 0, resultAction);
  }, []);
  const sortedLogList = loglist
    .slice()
    .sort((first, last) => new Date(first.date) - new Date(last.date));
  return (
    <>
      <LogListWrap>
        {sortedLogList.map(item => (
          <LogListItem
            on="upcoming"
            key={item.imedia}
            pic={item.pic}
            title={item.title}
            date={item.date}
            star={item.star}
            imedia={item.imedia}
            iuser={iuser}
          ></LogListItem>
        ))}
      </LogListWrap>
    </>
  );
};

export default UpcomingLogList;
