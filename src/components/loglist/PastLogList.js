import { LogListWrap, LogTotal } from "../../styles/ui/logliststyle";
import LogListItem from "./LogListItem";

const PastLogList = ({ totalLogList, loglist, iuser }) => {
  const sortedLogList = loglist
    .slice()
    .sort((first, last) => new Date(last.date) - new Date(first.date));
  return (
    <>
      <LogTotal>
        총 기록 <em>{totalLogList}</em> 건
      </LogTotal>
      <LogListWrap>
        {sortedLogList.map(item => (
          <LogListItem
            on="past"
            key={item.imedia}
            pic={item.pic}
            title={item.title}
            date={item.date}
            star={item.star}
            imedia={item.imedia}
            iuser={iuser}
          />
        ))}
      </LogListWrap>
    </>
  );
};

export default PastLogList;
