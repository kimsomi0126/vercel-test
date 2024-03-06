import React, { useEffect, useState } from "react";
import { GrayBtn } from "../../../styles/ui/buttons";
import { AccountInfo, TableWrap, TitleWrap } from "../../../styles/user/mypage";
import { PageTitle } from "../../../styles/basic";
import { deleteAccount } from "../../../api/adminPage/admin_api";
import ModalTwoBtn from "../../ui/ModalTwoBtn";
import { useNavigate } from "react-router-dom";
import ModalOneBtn from "../../ui/ModalOneBtn";

const MyAccountComponent = ({ myData, ikid, onChildClick }) => {
  const navigate = useNavigate();
  const my = myData;

  // 연결된 학부모 계정 pk값
  const [iparent, setIparent] = useState(0);

  useEffect(() => {
    // console.log(iparent);
  }, [iparent]);

  // 모달창 내용
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigate, setIsNavigate] = useState();

  // 모달창 확인버튼
  const handleOk = () => {
    setIsOpen(false);
    // 링크이동
    if (isNavigate) {
      navigate(isNavigate);
    }
  };
  // 모달창 취소
  const handleCancel = () => {
    setDelOpen(false);
  };

  // 연결삭제
  const [delOpen, setDelOpen] = useState(false);
  const handleClickDelete = () => {
    // console.log("탈퇴");

    setDelOpen(true);
    setTitle("정말 삭제할까요?");
    setSubTitle("학부모 계정과 연결이 끊어집니다. 정말 삭제할까요?");
  };
  const handleDelOk = () => {
    deleteAccount({
      successDeleteFn,
      errorDeleteFn,
      iparent,
      ikid,
    });
  };

  const successDeleteFn = res => {
    // console.log(res);
    setIsOpen(true);
    setTitle("삭제 완료");
    setSubTitle("삭제가 완료되었습니다.");
    setDelOpen(false);
    onChildClick();
    // setIsNavigate("/");
    // doLogout();
  };
  const errorDeleteFn = res => {
    // console.log(res);
    setIsOpen(true);
    setTitle("삭제 실패");
    setSubTitle(res);
  };

  return (
    <AccountInfo>
      <TitleWrap>
        <PageTitle>연결계정</PageTitle>
      </TitleWrap>
      <TableWrap className="vertical">
        <table>
          <colgroup>
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>연락처</th>
              <th>관계</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {my.parents.map((parent, index) => (
              <tr key={parent.iparent}>
                <td data-name="아이디">{parent ? parent.uid : ""}</td>
                <td data-name="이름">{parent ? parent.parentNm : ""}</td>
                <td data-name="연락처">{parent ? parent.phoneNb : ""}</td>
                <td data-name="관계">
                  {parent
                    ? (() => {
                        const irelation = parent.irelation;
                        switch (irelation) {
                          case 1:
                            return "부";
                          case 2:
                            return "모";
                          case 3:
                            return "조부";
                          case 4:
                            return "조모";
                          case 5:
                            return "형제/자매";
                          default:
                            return "그 외";
                        }
                      })()
                    : ""}
                </td>
                <td data-name="관리">
                  <GrayBtn
                    onClick={() => {
                      setIparent(parent.iparent);
                      handleClickDelete();
                    }}
                  >
                    연결삭제
                  </GrayBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>

      {/* 안내창 */}
      <ModalOneBtn
        isOpen={isOpen}
        handleOk={handleOk}
        title={title}
        subTitle={subTitle}
      />
      {/* 학부모 연결 삭제창 */}
      <ModalTwoBtn
        isOpen={delOpen}
        handleOk={handleDelOk}
        handleCancel={handleCancel}
        title={title}
        subTitle={subTitle}
      />
    </AccountInfo>
  );
};

export default MyAccountComponent;
