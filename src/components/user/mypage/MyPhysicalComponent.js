import React from "react";
import { DetailPhysical, TableWrap } from "../../../styles/user/mypage";

const MyPhysicalComponent = ({ myData }) => {
  const my = myData;
  // console.log(myData);
  return (
    <DetailPhysical>
      <TableWrap className="th_left" col3>
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <tbody>
            <tr>
              <th>
                <img
                  src={
                    process.env.PUBLIC_URL + `/images/user/physical_icon01.svg`
                  }
                  alt="측정날짜아이콘"
                />
                측정날짜
              </th>
              <td>
                {my.growths[0] ? my.growths[0].bodyDate : <span>날짜</span>}
              </td>
              <td>
                {my.growths[1] ? my.growths[1].bodyDate : <span>날짜</span>}
              </td>
              <td>
                {my.growths[2] ? my.growths[2].bodyDate : <span>날짜</span>}
              </td>
              <td>
                {my.growths[3] ? my.growths[3].bodyDate : <span>날짜</span>}
              </td>
            </tr>
            <tr>
              <th>
                <img
                  src={
                    process.env.PUBLIC_URL + `/images/user/physical_icon02.svg`
                  }
                  alt="신장 아이콘"
                />
                신장
              </th>
              <td>
                {my.growths[0] ? (
                  my.growths[0].height + "cm"
                ) : (
                  <span>신장</span>
                )}
              </td>
              <td>
                {my.growths[1] ? (
                  my.growths[1].height + "cm"
                ) : (
                  <span>신장</span>
                )}
              </td>
              <td>
                {my.growths[2] ? (
                  my.growths[2].height + "cm"
                ) : (
                  <span>신장</span>
                )}
              </td>
              <td>
                {my.growths[3] ? (
                  my.growths[3].height + "cm"
                ) : (
                  <span>신장</span>
                )}
              </td>
            </tr>
            <tr>
              <th>
                <img
                  src={
                    process.env.PUBLIC_URL + `/images/user/physical_icon03.svg`
                  }
                  alt="몸무게 아이콘"
                />
                몸무게
              </th>
              <td>
                {my.growths[0] ? (
                  my.growths[0].weight + "kg"
                ) : (
                  <span>몸무게</span>
                )}
              </td>
              <td>
                {my.growths[1] ? (
                  my.growths[1].weight + "kg"
                ) : (
                  <span>몸무게</span>
                )}
              </td>
              <td>
                {my.growths[2] ? (
                  my.growths[2].weight + "kg"
                ) : (
                  <span>몸무게</span>
                )}
              </td>
              <td>
                {my.growths[3] ? (
                  my.growths[3].weight + "kg"
                ) : (
                  <span>몸무게</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrap>
    </DetailPhysical>
  );
};

export default MyPhysicalComponent;
